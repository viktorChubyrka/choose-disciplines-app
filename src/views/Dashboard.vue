<template>
  <div>
    <img class="page-bg" src="/images/matetmat_bnr.jpg" alt="" />
    <div class="backdrop"></div>
    <div class="main-container">
        <div class="content">
          <h2>Сайт для вибору вибіркових дисциплін</h2>
          <b-select v-model="stage" placeholder="Виберіть курс">
            <option
              v-for="(el,key) in data"
              :value="key"
              :key="key">
              {{ key }}
            </option>
          </b-select>
          <b-select v-if="stage" v-model="selected_cemester" placeholder="Виберіть семестр">
            <option
              v-for="(el,key) in cemesters"
              :value="el"
              :key="key">
              {{ el }}
            </option>
          </b-select>
          <div v-if="selected_cemester && stage" class="choose-container" >
            <h3>Виберіть дисципліни</h3>
              <div v-for="(el,index) in filteredDisciplines" :key="el.id" class="discipline-choose-item">
                <h2 style="margin-top:20px">Дисципліна на вибір {{index+1}}</h2>
                  <b-field v-for="(dis,i) in el.disciplines" :key="i">
                      <b-radio v-model="array[index]"
                          size="is-large"
                          :native-value="dis.title">
                          <div class="radio-content">
                            <div style="font-weight:bold"> 
                             {{dis.title}}
                            </div>
                            <div>
                              Деталі дисципліни <a :href="dis.link_to_file">тут</a>
                            </div>
                          </div>
                      </b-radio>
                  </b-field>
              </div>
          </div>
          <DocumentCreator v-if="data && stage && selected_cemester && array.length == filteredDisciplines.length"  :stage="stage" :selected_disciplines="array"/>
        </div>
    </div>
    <Navbar />
    
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import DocumentCreator from "@/components/DocumentCreator.vue"

import firebase from 'firebase';

export default {
  components: {
    Navbar,
    DocumentCreator
  },
  data(){
    return{
        data:null,
        stage:null,
        cemesters:[],
        selected_cemester:null,
        radio:null,
        array:[]

    }
  },
  watch: {
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
      this.cemesters= cemesters;
    },
  },
  methods:{
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
            var starCountRef = firebase.database().ref('disciplines/');
            starCountRef.on('value', (snapshot) => {
                this.data = snapshot.val();
                this.dataSorted();
            });
            
        },
  },
  computed: {
    user() {
      return this.$store.getters.loginState;
    },
    filteredDisciplines(){
      if(this.data){
        return this.data[this.stage].filter(el=>el.cemester==this.selected_cemester);
      }
      else return [];
      
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
  padding:10vh 2vh 0;
}
.radio-content{
  font-size: 20px;
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
