<!-- ***form_signup.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "FormSignup",
    data: () => {
        return {
            last_name: '',
            first_name: '',
            email: '',
            password: '',
            password2: ''
        }
    },
    methods: {
        createAccount() {
            console.log("start");
            let data;
            //const validateForm = this.$refs.createAccountForm.checkValidity();
            const validateForm = true;
            if(validateForm && this.validatePasswords()){
                data = {
                    last_name: this.$refs.last_name.value,
                    first_name: this.$refs.first_name.value,
                    email: this.$refs.email.value,
                    password: this.$refs.password.value,
                }
                console.log(data);
                this.$emit("createAccount", data);
            }else{
                console.log("Something went awefully wrong!");
                this.$parent.setNotification('alert', "Les infomations fournies sont manquantes ou invalides", null);
            }
        },
        validatePasswords() {
            if(this.$refs.password.value){
                if(this.$refs.password.value === this.$refs.password2.value){
                    return true;
                }else{
                    console.log("Passwords don't match!");
                    this.$parent.setNotification('alert', "Les nouveaux mots de passes ne sont pas identiques", null);
                    return false;
                }
            }else{
                console.log("Password is missing!");
                this.$parent.setNotification('alert', "Il manque le mot de passe", null);
                return true;
            }
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
    <div>
    <div class="signup">
        <h1 class="signup_tag"> Inscrivez-vous en moins d'1 minute !</h1>
        <!-- Formulaire inscription -->
        <form class="signup_form" method="post" ref="createAccountForm">
            <div class="signup_form_lastname">
                <label for="lastname">Nom : </label>
                <input class="input_size" type="text" v-model="last_name" ref="last_name" name="lastname" required>
                <span class="mandatory">*</span>
            </div>
              <div class="signup_form_firstname">
                <label for="firstname">Prénom : </label>
                <input class="input_size" type="text" v-model="first_name" ref="first_name" name="firstname" required>
                <span class="mandatory">*</span>
            </div>
              <div class="signup_form_email">
                <label for="email">Email : </label>
                <input class="input_size" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" v-model="email" type="text" ref="email" name="email" required>
                <span class="mandatory">*</span>
            </div>
            <div class="signup_form_password">
                <label for="password">Mot de passe : </label>
                <input class="input_size" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}" v-model="password" ref="password" type="password" name="password" required>
                <span class="mandatory">*</span>
            </div>
            <div class="signup_form_password">
                <label for="password" class="account_label_size">Confirmation : </label>
                <input class="input_size" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}" type="password" ref="password2" v-model="password2">
                <span class="mandatory">*</span>
            </div>
            <div class="signup_form_infopwd">Votre mot de passe doit contenir minimum 8 caractères, dont 1 chiffre, 1 majuscule et 1 miniscule </div>
            <!-- Bouton "Se connecter" -->
            <button v-on:click.prevent="createAccount()" class="signup_button">S'inscrire</button>
        </form>
    </div>
    </div>
</template>

<!--STYLE-->
<style>
.signup {
    background-color: #fff;
    padding: 30px 10px;
    color: #1f4073 ;
    width: 100%;
    text-align: center;

}
.signup_tag {
    font-weight: bolder;
    font-size: x-large;
    text-align: center;
    padding-bottom: 20px;
}
.signup_form {
    text-align: center;
}
.signup_form_lastname,
.signup_form_firstname,
.signup_form_email,
.signup_form_password {
    padding: 5px 0px;
}

.signup_form_infopwd {
    font-size:small;
    padding:0px 5px;
}
.signup_button {
    margin: 40px 10px 0px 10px;
    padding: 5px 5px;
    border-radius: 5px;
    cursor:pointer;
}
.input-size {
    width:50%;
}


/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
.input-size {
    width:50%;
}
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
.input-size {
    width:50%;
}
}
</style>