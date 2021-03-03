<!-- *** form_account.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "FormAccount",
    props: ['account'],
    data: () => {
        return {
            last_name: '',
            first_name: '',
            email: '',
            password: '',
            newPassword: '',
            newPassword2: ''
        }
    },
    methods: {
        updateAccount() {
            let data;
            const validateForm = this.$refs.modifyAccount.checkValidity();
            //const password = this.$refs.password.checkValidity();
            //console.log(password);
            //const validateForm = true;
            if(validateForm && this.validatePasswords()){
                data = {
                    last_name: this.$refs.last_name.value,
                    first_name: this.$refs.first_name.value,
                    email: this.$refs.email.value,
                    password: this.$refs.password.value
                }
                this.$emit("updateAccount", data);
                this.$parent.setNotification('notification', "Votre compte a été mis à jour", null);
            }else{
                this.$parent.setNotification('alert', "Les informations fournies sont incomplètes", null);
            }
        },
        validatePasswords() {
            if(this.$refs.newPassword.value){
                if(this.$refs.newPassword.value == this.$refs.newPassword2.value){
                    return true;
                }else{
                    this.$parent.setNotification('alert', "Les nouveaux mots de passes ne sont pas identiques", null);
                    return false;
                }
            }else{
                return true;
            }
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
    <div class="account">
        <h1 class="account_tag">Mon compte</h1>
        <!-- Formulaire inscription -->
        <form class="account_form" method="post" ref="modifyAccount">
            <div class="account_form_lastname">
                <label for="lastname" class="account_label_size">Nom <span class="mandatory">*</span></label>
                <input type="text" ref="last_name" v-model="account[0].last_name" class="account_input_size" required>
            </div>
            <div class="account_form_firstname">
                <label for="firstname" class="account_label_size">Prénom</label>
                <span class="mandatory">*</span>
                <input type="text" ref="first_name" v-model="account[0].first_name" class="account_input_size" required>
            </div>
            <div class="account_form_email">
                <label for="email" class="account_label_size">Email</label>
                <span class="mandatory">*</span>
                <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" ref="email" v-model="account[0].email" class="account_input_size" required>
            </div>
            <div class="account_form_actual-password">
                <label for="password" class="account_label_size">Mot de passe actuel</label>
                <span class="mandatory">*</span>
                <input pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}" type="password" ref="password" v-model="password" class="account_input_size" required>
                <span class="pwd_required">Mot de passe obligatoire pour toute modification</span>
            </div>
            <div class="account_form_new-password">
                <br /><br />
                <label for="password" class="account_label_size">Nouveau mot de passe</label>
                <input pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}" type="password" ref="newPassword" v-model="newPassword" class="account_input_size">
            </div>
            <div class="account_form_confirm-new-password">
                <label for="password" class="account_label_size">Confirmation nouveau mot de passe</label>
                <input pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}" type="password" ref="newPassword2" v-model="newPassword2" class="account_input_size">
            </div>
            <button v-on:click.prevent="updateAccount()" class="account_button_update">Mettre à jour mon compte</button>
        </form>
    </div>
</template>

<!--STYLE-->
<style>
    
.account {
    background-color: #e4e4e4;
    padding: 30px 10px;
    color: #1f4073;
    margin: 20px 50px 40px 50px;
    border-radius: 10px;
    text-align: center;
}

.account_tag {
    font-weight: bolder;
    font-size: xx-large;
    text-align: center;
    padding-bottom: 20px;
}

.account_form {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.account_form_lastname,
.account_form_firstname,
.account_form_email,
.account_form_actual-password,
.account_form_new-password,
.account_form_confirm-new-password {
    display: flex;
    flex-direction: column;
    padding: 5px 0px;
}

.account_label_size {
    text-align: center;
    font-weight:bold;
    font-style:italic;
}

.account_input_size {
    width: 50%;
    align-self: center;
}

.account_button_update {
    background-color:#1f4073;
    color:#fff;
    font-weight:bold;
    margin: 40px 10px 0px 10px;
    padding: 5px 5px;
    border-radius: 5px;
    width:30%;
    align-self:center;
    cursor:pointer;
}

.pwd_required {
    font-size:smaller;
    font-style:italic;
}

/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .account {
        margin: 15px 15px;
    }
    .account_input_size {
        width: 90%;
    }
}

</style>
