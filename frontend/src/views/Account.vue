<!---->

<script>

import HeaderNavbar from "@/components/header_navbar.vue";
import ButtonDeleteAccount from "@/components/button_delete_account.vue";
import FormAccount from "@/components/form_account.vue"

export default {
  name: "Account",
  components: {
    HeaderNavbar,
    ButtonDeleteAccount,
    FormAccount    
  },
  data: () => {
    return {
      account: []
    }
  },
  methods: {
    deleteAccount(){
      this.$router.replace('/');
    },
    updateAccount(data) {
      console.log(data);
      this.$axios
        .put('user/modify', data)
        .then((w) => {
          console.log(w);
          this.initialize();
        })
        .catch((e) => console.log(e));
    },
    initialize() {
      this.getAccountData();
    },
    getAccountData() {
      this.$axios
        .get("user")
        .then((data) => {
          this.account = data.data;
        })
        .catch((e) => {
          if (e.response.status === 401) {
            alert("Veuillez vous connecter");
          }
        });
    }
  },
  created() {
    //console.log(this.$store.state.user.username);
    this.initialize();
  }
}

</script>


<template>
    <div>
      <HeaderNavbar />
      <ButtonDeleteAccount />
      <FormAccount v-bind:account="account" v-on:updateAccount="updateAccount" />
      
    </div>
</template>


<style scoped>

</style>