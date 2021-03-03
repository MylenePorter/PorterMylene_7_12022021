<script>
import HeaderLogin from "@/components/header_login_signup.vue";
import FormSignup from "@/components/form_signup.vue";
import Notifications from "@/components/notifications.vue";

export default {
  name: "Signup",
  components: {
    HeaderLogin,
    Notifications,
    FormSignup
  },
  data: () => {
    return {
      notifications: {}
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
        .catch((e) => {
          console.log(e);
          this.setNotification('alert', "Cette adresse email est déjà utilisée", null);
        })
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
          console.log(e);
          this.setNotification('alert', "Email ou mot de passe invalide", null);
          this.$router.push("/");
        });
    },
    setNotification(type, message, action) {
      this.notifications = {
        type: type,
        message: message,
        action: action
      }
    }
  }
}
</script>


<template>
  <div class="container-fluid">
      <HeaderLogin />
      <Notifications v-bind:notifications="notifications" />
      <FormSignup v-on:createAccount="createAccount" />
  </div>
</template>


<style scoped>
    .container-fluid {
      background-color:#1f4073;
    }
</style>
