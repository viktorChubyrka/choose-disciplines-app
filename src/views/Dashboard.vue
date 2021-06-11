<template>
  <div>
    <img class="page-bg" src="/images/matetmat_bnr.jpg" alt="" />
    <div class="backdrop"></div>
    <div class="main-container">
        <div class="content">
          <h2>Сайт для вибору вибіркових дисциплін</h2>
          <b-select v-model="selected_OP" placeholder="Виберіть освітню програму">
            <option
              v-for="(el,key) in this.all_data"
              :value="key"
              :key="key">
              {{ el.full_OP_name }}
            </option>
          </b-select>
          <b-select v-if="selected_OP" v-model="stage" placeholder="Виберіть курс">
            <option
              v-for="(el,key) in data"
              :value="key"
              :key="key">
              {{ key }}
            </option>
          </b-select>
          <!-- <b-select v-if="stage" v-model="selected_cemester" placeholder="Виберіть семестр">
            <option
              v-for="(el,key) in cemesters"
              :value="el"
              :key="key">
              {{ el }}
            </option>
          </b-select> -->
          <div v-if="stage" class="choose-container" >
            <h2>Виберіть дисципліни</h2>
              <div class="cemester-container" v-for="(cemester_disciplines,j) in filteredDisciplines" :key="j">
                <h2 style="margin-top:20px">{{j}} семестр</h2>
                <div v-for="(el,index) in cemester_disciplines" :key="el.id" class="discipline-choose-item">
                  <h3 style="margin-top:20px">Дисципліна на вибір {{index+1}}</h3>
                    <b-field v-for="(dis,i) in el.disciplines" :key="i">
                        <b-radio v-model="array[+j==1?index:+j+index]"
                            size="is-large"
                            :native-value="dis.title">
                            <div class="radio-content">
                              <div style="font-weight:bold"> 
                              {{dis.title}}
                              </div>
                              <div>
                                Деталі дисципліни <a :href="dis.link_to_file">тут  {{+j==1?index:+j+index}}</a>
                              </div>
                            </div>
                        </b-radio>
                    </b-field>
                </div>
              </div>
               <b-button style="margin:20px 0px 0px;"
                  @click="saveChoise()"
                  type="is-primary"
                  rounded
                  expanded
                  :disabled="!data || !stage || !areAllDisciplinesChoosen"
                  >Підтвердити вибір
                </b-button>
              
          </div>
         
        </div>
    </div>
    <Navbar :name="userData.data.displayName" />
    
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";


import firebase from 'firebase/app';

export default {
  components: {
    Navbar,
    
  },
  data(){
    return{
        all_data:null,
        data:null,
        stage:null,
        cemesters:[],
        array:[],
        selected_OP:null
    }
  },
  watch: {
    selected_OP(){
      this.data = this.all_data[this.selected_OP].disciplines;
      this.dataSorted();
    },
    user() {
      if (!this.user) {
        this.$router.push("/login");
      }
    },
    stage(){
      let cemesters = [];
      this.data[this.stage].forEach(el => {
        if(cemesters.includes(el.cemester)){
          console.log('skip');
        }
        else{
          cemesters.push(el.cemester)
        }
      });
      this.cemesters = cemesters;
    },
  },
  methods:{
    saveChoise(){
      var starCountRef = firebase.database().ref(`choose-app/${this.selected_OP}/declare/${this.userData.data.email.split('.')[0]}/`);
      starCountRef.on('value', (snapshot) => {
        if (snapshot.exists()){
          alert('Ви вже відправили заяву!')
        }
        else{
              let database = firebase.database();
              database.ref(`choose-app/${this.selected_OP}/declare/${this.userData.data.email.split('.')[0]}/`).set(
                {
                  selected_disciplines:this.array,
                  user: this.userData.data.displayName,
                  stage:this.stage
                }
              )
        }
        })
     
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
            var starCountRef = firebase.database().ref('choose-app/');
            starCountRef.on('value', (snapshot) => {
              console.log(snapshot.val());
                this.all_data = snapshot.val();
            });
            
        },
  },
  computed: {
    user() {
      return this.$store.getters.loginState;
    },
    userData(){
      return this.$store.getters.user;
    },
    filteredDisciplines(){
      if(this.data){
        let data_sorted_by_cemesters = {};
        this.cemesters.forEach(cemester=>{
          data_sorted_by_cemesters[cemester+''] = this.data[this.stage].filter(el=>el.cemester==cemester);
        })
        return data_sorted_by_cemesters;
      }
      else return [];
      
    },
    areAllDisciplinesChoosen(){
      let counter = 0;
      this.array.forEach(el =>{
        if(el){
          counter+=1;
        }
      })
      return counter == this.filteredDisciplinesLingth;
    },
    filteredDisciplinesLingth(){
       if(this.data){
        let length = 0;
        this.cemesters.forEach(cemester=>{
         length += this.data[this.stage].filter(el=>el.cemester==cemester).length;
        })
        return length;
      }else return null
    }
  },

  updated() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  created(){
    this.getData();
  }
};
</script>
<style scoped>
.content{
  background: #f2f2f2d5;
  width: 60%;
  height:100vh;
  box-sizing: border-box;
  padding:10vh 2vh 10vh;
  overflow: scroll;
}
.content::-webkit-scrollbar{
  width:0;
  height:0;
}
.radio-content{
  font-size: 20px;
}
.cemester-container{
  border-bottom: 4px solid rgb(179, 173, 173);
  padding-bottom: 20px;
}
.cemester-container:last-child{
  border-bottom: none;
}
@media screen and (max-width: 1024px) {
  .content {
    padding-top: 8vh;
    width: 80%;
  }
}
@media screen and (max-width: 481px) {
  .content {
    padding-top: 6vh;
    width: 100%;
  }
}
</style>
