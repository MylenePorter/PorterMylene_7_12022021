<!-- ***form_login.vue*** -->

<!--TEMPLATE-->
<template>
    <div>
    <div class="login">
        <h1 class="login_tag">Connectez-vous et partagez avec vos collègues</h1>
        <!-- Formulaire inscription -->
        <form class="login_form" method="post">
            <div class="login_form_email">
                <label for="email">Email : </label><br>
                <input class="input_size" 
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Un email"
                  type="text" 
                  id="email" 
                  name="email" 
                  v-model="email" 
                  v-on:input="syncData" >
            </div>

            <div class="login_form_password">
                <label for="password">Mot de passe : </label><br>
                <input class="input_size" type="password" id="password" name="password" v-model="password" v-on:input="syncData" required>
            </div>
          <!-- Bouton "Se connecter" -->
          <button class="login_button" v-on:click.prevent="login">Se connecter</button>
        </form>
       
    </div>
    </div>
</template>

<script>
export default {
  name: "FormLogin",
  data: () => {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    syncData() {
      this.$emit("loginData", this.$data);
    },
    login() {
      const validEmail = document.getElementById("email").checkValidity();
      const validPassword = document.getElementById("password").checkValidity();
      if(validEmail && validPassword){
        
        this.$emit("startLogin");
      }else{
        this.$parent.setNotification('alert', "L'email n'est pas valide ! Ou est-ce le mot de passe ?", null);
        
      }
    }
  }
};
</script>

<!--STYLE-->
<style>
.login {
    background-color: #fff;
    padding: 30px 10px;
    color: #112748 ;
    text-align: center;
}
.login_tag {
    font-weight: bolder;
    font-size: x-large;
    text-align: center;
    padding-bottom: 20px;
}
.login_form {
    text-align: center;
}
.login_form_email {
    padding: 5px 0px;
}
.login_form_password {
    padding: 5px 0px;
}
.input_size {
  width: 60%;
};
.login_button {
    margin: 40px 10px 0px 10px;
    padding: 5px 5px;
    border-radius: 5px;
    cursor:pointer;
}

/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
  .input_size {
    width: 70%;
  }
}
/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
  .input_size {
    width: 85%;
  }
}
</style>