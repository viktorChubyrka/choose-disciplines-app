<template>
  <div class="login-page">
    <img class="page-bg" src="/images/matetmat_bnr.jpg" alt="" />
    <div class="backdrop"></div>
    <div class="main-container">
      <div class="login-form">
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
            @click="logIn()"
            type="is-primary"
            :disabled="!canRegister"
            rounded
            expanded
            >Увійти</b-button
          >
        </section>
        <h3 class="registration-link">
          Зареєструйся <a href="/register">тут</a>
        </h3>
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
    user() {
      return this.$store.getters.loginState;
    },
    canRegister() {
      if (this.password && this.email_input.is_correct) return true;
      else return false;
    },
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace({ name: "Dashboard" });
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
.login-page {
  width: 100vw;
  height: 100vh;
}
.login-form {
  height: 100vh;
  min-width: 32%;
  background: #f2f2f2d5;
  display: flex;
  padding: 0 2vh;
  justify-content: center;
  flex-direction: column;
}
.registration-link {
  margin-top: 1vh;
}
@media screen and (max-width: 1024px) {
  .login-form {
    min-width: 60%;
  }
}
@media screen and (max-width: 481px) {
  .login-form {
    min-width: 100%;
  }
}
</style>
