<script>
import HeaderLogin from "@/components/header_login_signup.vue";
import FormSignup from "@/components/form_signup.vue";

export default {
  name: "Signup",
  components: {
    HeaderLogin,
    FormSignup
  },
  data: () => {
    return {
    }
  },
  methods: {
    createAccount(data) {
      console.log("in");
      console.log(data);
      this.$axios
        .post('user/signup', data)
        .then((w) => {
          console.log(w);
          this.login(data);
        })
        .catch(function (error) {
          if(error.response){
            if(error.response.status === 409){
              console.log("Duplicate email");
            }
          }
        });
    },
    login(data){
      this.$axios
        .post("user/login", data)
        .then((data) => {
          sessionStorage.setItem("token", data.data.token);
          sessionStorage.setItem("userID", data.data.userID);
          this.$axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.token;
          this.$router.push("Posts");
        })
        .catch((e) => {
          if (e.response.status == 401) {
            //this.message = "Email ou mot de passe invalide";
            alert("Email ou mot de passe invalide");
          } else if (e.response.status == 500) {
            //this.message = "Erreur serveur";
            alert("Erreur serveur");
          }
          this.$router.push("/");
        });
    }
  }
}
</script>


<template>
  <div class="container-fluid">
      <HeaderLogin />
      <FormSignup v-on:createAccount="createAccount" />
  </div>
</template>


<style scoped>
    .container-fluid {
      background-color:#1f4073;
    }
</style>
