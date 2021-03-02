<!-- ***button_delete_account.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "ButtonDeleteAccount",
    data: () => {
        return {
        }
    },
    methods: {
        deleteAccount() {
            if(confirm("Supprimer définitivement votre compte ?")){
                this.$parent.deleteAccount();
            }
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
    <div class="delete_account">
        <img class="delete_account_trash" src="/img/icons/trash.png" alt="Poubelle">
        <button @click="deleteAccount" class="delete_account_button">Supprimer mon compte</button>
    </div>
</template>

<!--STYLE-->
<style>
  
.delete_account {
    display: flex;
    justify-content: center;
    padding: 40px 10px 10px 10px;
}

.delete_account_button {
    align-items: center;
    background-color: #d1515a;
    font-weight: bold;
    margin-left: 5px;
    padding: 5px;
    cursor:pointer;
}

.delete_account_trash {
    width: 30px;
    height: 30px;
    align-items: center;
    filter: invert(37%) sepia(44%) saturate(843%) hue-rotate(307deg) brightness(103%) contrast(89%);
}
  
</style>
