<script>
import HeaderLogin from "@/components/header_login_signup.vue";
import FormLogin from "@/components/form_login.vue";
import Notifications from "@/components/notifications.vue";

export default {
  name: "Login",
  components: {
    HeaderLogin,
    Notifications,
    FormLogin
  },
  data: () => { // Initial data
    return {
      email: "",
      password: "",
      notifications: {}
    }
  },
  methods: { // Organise main functions
    syncData(data) {
      // Stock les infos de connexion
      this.email = data.email;
      this.password = data.password;
    },
    reset(){
      localStorage.removeItem("userID");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      delete this.$axios.defaults.headers.common["Authorization"];
    },
    login(){
      
      this.$axios
        .post("user/login", this.$data)
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userID", data.data.userID);
          localStorage.setItem("role", data.data.role);
          this.$axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.token;
          this.$router.push("Posts");
        })
        .catch((e) => {
          if (e.response.status == 401) {
            this.setNotification('alert', 'Email ou mot de passe invalide', null);
          } else if (e.response.status == 504) {
            this.setNotification('alert', 'Erreur serveur', null);
          }
          localStorage.removeItem("userID");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
        });
    },
    setNotification(type, message, action) {
      this.notifications = {
        type: type,
        message: message,
        action: action
      }
    }
  },
  created() { // These method events auto-run on 'created' event
    this.reset();
  }
};
</script>

<template>
  <div class="container-fluid">
      <HeaderLogin switchComeFrom="Login"/>
      <Notifications v-bind:notifications="notifications" />
      <FormLogin v-on:loginData="syncData" v-on:startLogin="login" />
  </div>
</template>

<style scoped>
  
</style>
