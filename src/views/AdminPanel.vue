<template>
  <div>
    <img class="page-bg" src="/images/matetmat_bnr.jpg" alt="" />
    <div class="backdrop"></div>
    <div class="main-container">
        <div v-if="are_admin" class="content">
            <div class="tabs-container">
                    <h4 @click="tab=1,getData()" :class="tab==1?'active':''">Налаштування освітньої програми</h4>
                    <h4 @click="tab=2,getData()" :class="tab==2?'active':''">Списки заповнених заяв</h4>
                    <h4 @click="DeleteOP()">Видалити ОП</h4>
            </div>
            <div v-if="tab==1" >
              <div>
                
                <div class="input-row">
                    <b-field style="width:90%" :label="`Повна назва освітньої програми`">
                        <b-input  expanded v-model="full_OP_name"></b-input>
                    </b-field>
                     <svg @click="saveFullOPName()" style="width:40px;height:40px" viewBox="0 0 24 24">
                        <path fill="green" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                    </svg>
                </div>
                 <div class="input-row">
                    <b-field style="width:90%" :label="`Назва факультету`">
                        <b-input  expanded v-model="faculty_name"></b-input>
                    </b-field>
                     <svg @click="saveFacultyName()" style="width:40px;height:40px" viewBox="0 0 24 24">
                        <path fill="green" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                    </svg>
                </div>
                 <div class="input-row">
                    <b-field style="width:90%" :label="`Прізвище ініціали декана факультуту`">
                        <b-input  expanded v-model="dekan"></b-input>
                    </b-field>
                     <svg @click="saveDekan()" style="width:40px;height:40px" viewBox="0 0 24 24">
                        <path fill="green" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                    </svg>
                </div>
            </div>
                <svg v-if="!show_add_form" @click="show_add_form=true" style="width:24px;height:24px;cursor:pointer" viewBox="0 0 24 24">
                    <path fill="#7957d5" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                </svg>
                <svg v-else @click="show_add_form=false" style="width:24px;height:24px;cursor:pointer" viewBox="0 0 24 24">
                    <path fill="red" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                </svg>
                <div v-if="show_add_form">
                    <b-field label="Курс">
                    <b-select v-model="stage" placeholder="Виберіть курс">
                        <option
                            v-for="i in 3"
                            :value="i+1"
                            :key="i">
                            {{ i+1 }}
                        </option>
                    </b-select>
                    </b-field>
                    <b-field label="Семестр">
                        <b-select v-model="cemester" placeholder="Виберіть семестр">
                            <option
                                v-for="i in 2"
                                :value="i"
                                :key="i">
                                {{ i }}
                            </option>
                        </b-select>
                    </b-field>
                    <b-field label="Кількість дисциплін для вибору">
                        <b-numberinput min="2"  v-model="number"></b-numberinput>
                    </b-field>
                    <div style="margin-bottom:10px" v-for="(el,i) in disciplines_for_add" :key="i">
                        <b-field :label="`Дисципліна ${i+1}`">
                            <b-input v-model="disciplines_for_add[i].title"></b-input>
                        </b-field>
                        <b-field  :label="`Посилання на документ з описом дисципліни ${i+1}`">
                            <b-input v-model="disciplines_for_add[i].link_to_file"></b-input>
                        </b-field>
                    </div>
                    <b-button
                        @click="create()"
                        type="is-primary"
                        :disabled="!canCreate"
                        rounded
                        expanded
                        >Додати
                    </b-button>
                </div>
                <div class="disciplines-container">
                    <div v-for="(el,key) in data" :key="key">
                        <div style="font-weight:bold">Вибіркові навчальні дисципліни для здобувачів {{key}} курсу</div>
                        <div class="discipline" v-for="(cemester,index) in el" :key="index">
                           <div>
                               {{cemester.cemester}} семестр, дисципліна на вибір {{index+1}}
                                <div v-for="(discipline,i) in cemester.disciplines" :key="i">
                                    <div>{{i+1}} {{discipline.title}} <a>{{discipline.link_to_file}}</a></div>
                                </div>
                           </div>
                             <svg  @click="deleteItem(cemester.id)" style="width:24px;height:24px;cursor:pointer" viewBox="0 0 24 24">
                                <path fill="red" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                            </svg>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div v-else>
                <div class="tabs-container">
                    <h6 @click="sub_tab=1" :class="sub_tab==1?'active':''">Заяви студентів</h6>
                    <h6 @click="sub_tab=2" :class="sub_tab==2?'active':''">Списки дисциплін</h6>
                    <h6 @click="deleteAllDeclares()" >Видалити всі заяви</h6>

                </div>
                <div v-if="sub_tab==1">
                    <div v-for="(elem,key) in sortedDeclares" :key="elem.id">
                        <h3>{{key}} Курс</h3>
                            <div  style="width:100%;
                            padding:10px;
                            box-sizing:border-box;
                             display:flex;
                             align-items:center;
                             justify-content:space-between" v-for="(el,key) in elem" :key="key">
                    {{el.user}}
                    <div>
                        <!-- <div v-for="discipline in el.selected_disciplines" :key="discipline">{{discipline}}</div> -->

                    </div>
                    <div style="display:flex">
                        <b-button style="width:min-content;margin-right:10px"
                            @click="deleteDocument(el.id)"
                            type="is-danger"
                            rounded
                            expanded
                            >Видалити
                        </b-button>
                        <DocumentCreator 
                        :stage="el.stage" 
                        :selected_disciplines="el.selected_disciplines" 
                        :name="el.user" 
                        :dekan="dekan"
                        :faculty_name="faculty_name"
                        :full_OP_name="full_OP_name"/>
                    </div>
                    </div>
                    </div>
                   
                </div>
                <div v-else>
                        <div v-for="(el,key) in disciplinesList" :key="key">
                            <h3>{{key}} Курс</h3>
                            <div style="display:flex;align-items:center" v-for="element in el" :key="element.dis"><h4>{{element.dis}}:</h4>  <h5>вибрало - {{element.counter}}</h5></div>
                        </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import DocumentCreator from "@/components/DocumentCreator.vue"

import firebase from 'firebase/app';
export default {
    components:{DocumentCreator},
    data() {
        return {
            declares:null,
            settings:true,
            are_admin:false,
            show_add_form:false,
            stage:null,
            dekan:null,
            full_OP_name:null,
            faculty_name:null,
            cemester:null,
            number:2,
            disciplines_for_add:[
                {
                    title:'',
                    link_to_file:''
                },
                {
                    title:'',
                    link_to_file:''
                }
            ],
            data:null,
            OP:'',
            tab:1,
            sub_tab:1
        }
    },
    watch:{
        number(newVal,oldVal){
            if(oldVal<newVal){
                this.disciplines_for_add.push({
                    title:'',
                    link_to_file:''
                })
            }else{
                this.disciplines_for_add.pop();
            }
        }
    },
    computed:{
        sortedDeclares(){
            let array = {'2':[],'3':[],'4':[]};
            for (const key in this.declares) {
                if (Object.hasOwnProperty.call(this.declares, key)) {
                    let el = this.declares[key];
                    el.id = key;
                    array[el.stage].push(el);
                }
            }
            return array
        },
        canCreate(){
            if(this.stage && 
            this.cemester && 
            this.disciplines_for_add[0].title && 
            this.disciplines_for_add[0].link_to_file && 
            this.disciplines_for_add[1].title && 
            this.disciplines_for_add[1].link_to_file){
                return true;
            }
            else{
                return false
            }
        },
        disciplinesList(){
            let disc_obj = {'2':[],'3':[],'4':[]};
            for (const key in this.declares) {
                if (Object.hasOwnProperty.call(this.declares, key)) {
                    disc_obj[this.declares[key].stage]=[...disc_obj[this.declares[key].stage],...this.declares[key].selected_disciplines];
                }
            }
            let sorted_disc_obj = {'2':[],'3':[],'4':[]};
             for (const key in disc_obj) {
                if (Object.hasOwnProperty.call(disc_obj, key)) {
                    sorted_disc_obj[key]=new Set(disc_obj[key]);
                }
            }
            let obj={'2':[],'3':[],'4':[]};
            for (const key in sorted_disc_obj) {
                if (Object.hasOwnProperty.call(sorted_disc_obj, key)) {
                    sorted_disc_obj[key].forEach(el => {
                        obj[key].push({dis:el,counter:0})
                    });
                }
            }
             for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    obj[key].forEach(el => {
                        for (let i = 0; i < disc_obj[key].length; i++) {
                            if(el.dis==disc_obj[key][i])
                            {
                                el.counter+=1;
                            }
                        }
                    });
                }
            }
            return obj;
        }
        
    },
    created(){
        this.OP = prompt('Номер освітньої програми:', );
        if(this.OP){
            var starCountRef = firebase.database().ref(`choose-app/${this.OP}/`);
            starCountRef.once('value', (snapshot) => {
                if (snapshot.exists()){
                    let pass = prompt(`Пароль від адмін панелі освітньої програми ${this.OP}:`, );
                    if(pass===snapshot.val().password){
                        setTimeout(()=>this.are_admin = true,1000);
                        this.getData();
                    }else{
                        window.location.reload();
                    }
                    
                }else{
                    let createNewOP = confirm(`Освітньої програми номер ${this.OP} не існує! \n Бажаєте створити її?`);
                    if(createNewOP){
                        let password = prompt(`Придумайте пароль від адмін панелі освітньої програми ${this.OP}:`, );
                        let database = firebase.database();
                        database.ref(`choose-app/${this.OP}`).set({
                            password
                        })
                        setTimeout(()=>this.are_admin = true,1000);
                        this.getData();
                        this.show_add_form=false;
                    }else{
                        window.location.reload();
                    }
                }
            });
        }
    },
    methods:{
        deleteAllDeclares(){
            let deleteOP = confirm(`Ви впевнені що хочете видалити всі заяви?\nПісля видалення всі дані буде витерто без можливості відновлення!\nВсеодно видалити?`);
            if(deleteOP){
                 firebase.database().ref(`choose-app/${this.OP}`).child('declare').remove();
                 this.getData();
            }
        },
        DeleteOP(){
            let deleteOP = confirm(`Ви впевнені що хочете видалити ОП - ${this.OP}?\nПісля видалення всі дані буде витерто без можливості відновлення!\nВсеодно видалити?`);
            if(deleteOP){
                 firebase.database().ref(`choose-app`).child(this.OP).remove();
                 window.location.reload();
            }
        },
        deleteDocument(name){
            firebase.database().ref(`choose-app/${this.OP}/declare`).child(name).remove();
            this.getData();
        },
        deleteItem(id){
            firebase.database().ref(`choose-app/${this.OP}/disciplines`).child(id).remove();
            this.getData();
        },
        dataSorted(){
            let newData={'2':[],'3':[],'4':[]};
            for (const key in this.data) {
                if (Object.hasOwnProperty.call(this.data, key)) {
                    const el = this.data[key];
                    el.id = key;
                    newData[el.stage].push(el);
                }
            }
            this.data = newData;
            for (const key in this.data) {
                if (Object.hasOwnProperty.call(this.data, key)) {
                    const el = this.data[key];
                    el.sort(function(a,b){
                        if(a.cemester<b.cemester) return -1;
                        if(a.cemester>b.cemester) return 1;
                        return 0;
                    })
                    this.data[key] = el;
                }
            }
        },
        getData(){
            var starCountRef = firebase.database().ref(`choose-app/${this.OP}/`);
            starCountRef.once('value', (snapshot) => {
                this.data = snapshot.val().disciplines;
                this.faculty_name = snapshot.val().faculty_name;
                this.dekan = snapshot.val().dekan;
                this.full_OP_name = snapshot.val().full_OP_name;
                this.declares = snapshot.val().declare;
                this.dataSorted();
            });
            
        },
        create(){
            let database = firebase.database();
            database.ref(`choose-app/${this.OP}/disciplines/`+Date.now()).set({
                stage:this.stage,
                cemester:this.cemester,
                disciplines:this.disciplines_for_add
            })
            this.getData();
            this.show_add_form=false;
        },
        saveFullOPName(){
            let database = firebase.database();
            database.ref(`choose-app/${this.OP}/full_OP_name`).set(
               this.full_OP_name
            )
            this.getData();
        },
        saveFacultyName(){
            let database = firebase.database();
            database.ref(`choose-app/${this.OP}/faculty_name`).set(
               this.faculty_name
            )
            this.getData();
        },
        saveDekan(){
            let database = firebase.database();
            database.ref(`choose-app/${this.OP}/dekan`).set(
                this.dekan
            )
            this.getData();
        }
    }
};
</script>
<style scoped>
.settings{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.content{
  background: #f2f2f2d5;
  width: 60%;
  padding: 10vh 4vh;
  overflow: scroll;
}
.content::-webkit-scrollbar{
    width:0;
    height:0;
}
svg{
    cursor: pointer;
}
.add-icon{
    width:20px;
    height:20px;
}
.discipline{
    display: flex;
    justify-content: center;
}
.discipline svg{
    margin-left: 10px;
}
.input-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tabs-container{
    width:100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tabs-container h4,h6{
    margin:0!important;
    padding:10px;
    color:grey;
    cursor:pointer;
}
.tabs-container h4.active{
    color:#7957d5;
}
.tabs-container h6.active{
    color:#7957d5;
}
.tabs-container h4:hover{
    color:#7957d5;
}
.tabs-container h6:hover{
    color:#7957d5;
}
.tabs-container h4:last-child:hover{
    color:red
}
.tabs-container h6:last-child:hover{
    color:red
}
@media screen and (max-width: 1024px) {
  .content {
    padding: 8vh 3vh;
    width: 80%;
  }
}
@media screen and (max-width: 481px) {
  .content {
    padding: 6vh 2vh;
    width: 100%;
  }
}
</style>
