<template>
    <div class="navigation">
      {{name}}
        <b-button 
            @click="logOut()"
            type="is-primary"
            rounded
            >Вийти з аккаунту
        </b-button>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      
    };
  },
  props:{
    name:{
      type:String
    }
  },
  methods: {
    logOut() {
     firebase.auth().signOut().then(() => {
        }).catch((error) => {
        });
    },
  },
 
};
</script>
<style scoped>
.navigation{
    z-index: 5;
    position: fixed;
    top:0;
    left:20%;
    width:60%;
    background: #bebebe73;
    height:10vh;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px;
}
@media screen and (max-width: 1024px) {
  .navigation {
    width: 80%;
    left:10%;
    height:8vh
  }
}
@media screen and (max-width: 481px) {
  .navigation {
    width: 100%;
    left:0;
    height:6vh
  }
}
</style>
