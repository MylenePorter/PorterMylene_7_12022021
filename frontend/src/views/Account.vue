<!---->

<script>

import HeaderNavbar from "@/components/header_navbar.vue";
import ButtonDeleteAccount from "@/components/button_delete_account.vue";
import FormAccount from "@/components/form_account.vue"
import Notifications from "@/components/notifications.vue";

export default {
  name: "Account",
  components: {
    HeaderNavbar,
    Notifications,
    ButtonDeleteAccount,
    FormAccount
  },
  data: () => {
    return {
      account: [],
      notifications: {}
    }
  },
  methods: {
    deleteAccount(){
      this.$axios
        .delete('user/delete')
        .then(() => {
          
          this.$router.replace('/');
        })
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur", null);
        });
    },
    updateAccount(data) {
      
      this.$axios
        .put('user/modify', data)
        .then(() => {
          
          this.initialize();
          this.setNotification('notification', "Vos informations ont été mises à jour", null);
        })
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur", null);
        });
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
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur", null);
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
  created() {
    //
    this.initialize();
  }
}

</script>


<template>
    <div>
      <HeaderNavbar />
      <Notifications v-bind:notifications="notifications" />
      <ButtonDeleteAccount />
      <FormAccount v-bind:account="account" v-on:updateAccount="updateAccount" />
    </div>
</template>