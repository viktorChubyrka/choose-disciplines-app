<template>
  <div class="registration-page">
    <img class="page-bg" src="/images/matetmat_bnr.jpg" alt="" />
    <div class="backdrop"></div>
    <div class="main-container">
      <div class="registration-form">
        <section>
          <b-field
            label="Email"
            :type="email_input.type"
            :message="email_input.message"
          >
            <b-input required rounded type="email" v-model="email"> </b-input>
          </b-field>
        
          <b-field label="Пароль">
            <b-input
              required
              rounded
              type="password"
              v-model="password"
              password-reveal
            >
            </b-input>
          </b-field>
          <b-button
            @click="register()"
            type="is-primary"
            :disabled="!canRegister"
            rounded
            expanded
            >Зареєструватися</b-button
          >
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: null,
      password: null,
      email_input: {
        type: "",
        message: "",
        is_correct: false,
      },
      error: null,
    };
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push("/dashboard");
      }
    },
    email() {
      let test = new RegExp("\\b" + "@student.uzhnu.edu.ua$");
      if (!test.test(this.email)) {
        this.email_input.type = "is-danger";
        this.email_input.message =
          "Введіть корпоративну пошту! ( @student.uzhnu.edu.ua )";
        this.email_input.is_correct = false;
        this.email_input.icon = "magnify";
      } else {
        this.email_input.type = "is-success";
        this.email_input.message = "";
        this.email_input.is_correct = true;
      }
    },
  },
  computed: {
    canRegister() {
      if (this.password && this.email_input.is_correct  ) return true;
      else return false;
    },
    user() {
      return this.$store.getters.loginState;
    },
  },
  methods: {
    register() {
      let userId = null;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          userId = data.user.uid;
          console.log(userId);
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  created() {
    if (this.user) {
      this.$router.push("/dashboard");
    }
  },
};
</script>
<style scoped>
.registration-page {
  width: 100vw;
  height: 100vh;
}



.registration-form {
  height: 100vh;
  min-width: 32%;
  background: #f2f2f2d5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 2vh;
}
@media screen and (max-width: 1024px) {
  .registration-form {
    min-width: 60%;
  }
}
@media screen and (max-width: 481px) {
  .registration-form {
    min-width: 100%;
  }
}
</style>
