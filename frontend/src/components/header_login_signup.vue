<!-- ***header_login_signup.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "HeaderLogin",
}
</script>

<!--TEMPLATE-->
<template>
  <header class="header_logsign">
    <nav class="header_logsign_navbar">
      <router-link to="/Signup">
        <div v-if="$route.name === 'Signup'">
          <span class="header_logsign_navbar_signup header_logsign_navbar_active">S'inscrire</span>
        </div>
        <div v-if="$route.name !== 'Signup'">
          <span class="header_logsign_navbar_signup">S'inscrire</span>
        </div>
      </router-link>
      <router-link to="/">
        <div v-if="$route.name === 'Login'">
          <span class="header_logsign_navbar_login header_logsign_navbar_active">Se connecter</span>
        </div>
        <div v-if="$route.name !== 'Login'">
          <span class="header_logsign_navbar_login">Se connecter</span>
        </div>
      </router-link>
    </nav>
    <img class="header_logsign_logo" src="img/logo/icon-left-font-monochrome-white.svg" alt="logo Groupomania">
  </header>
</template>

<!--STYLE-->
<style>
  .header_logsign {
    text-align: center;
    display:block;
    clear:both;
    background-color:#1f4073;
  }
  .header_logsign_navbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 0px;
    border-top: solid 5px #3e80e6;
  }
  .header_logsign_navbar_login {
    padding: 10px;
    margin:0px 10px;
  }
  .header_logsign_navbar_signup {
    padding: 10px;
    margin:0px 10px;
  }
  .header_logsign_navbar_active {
    padding: 10px;
    background-color: #3e80e6;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

  }
  .header_logsign_logo {
    padding: 60px 0px;
    width: 60%;
  }


/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .header_logsign_logo {
    padding: 40px 0px;
    width:70%;
  }
}

/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .header_logsign_logo {
    padding: 40px 0px;
    width:80%;
  }
}  
</style>