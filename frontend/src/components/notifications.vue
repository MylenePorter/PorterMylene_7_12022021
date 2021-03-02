<!-- *** notifications.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "Notifications",
    props: ['notifications'],
    methods: {
        hide() {
            this.notifications.type = "hidden";
        }
    }
}
</script>

<!--TEMPLATE-->
<template>

<div v-if="notifications">
    <div class="alerte popup" v-if="notifications.type == 'alert'" ref="alert">
        <div class="alerte_text popup_text">{{notifications.message}}</div>
        <button @click="hide" class="alerte_valid-button popup_button_valid">OK</button>
    </div>

    <div class="notifications popup" v-if="notifications.type == 'notification'" ref="notification">
        <div class="notifications_text popup_text">{{notifications.message}}</div>
        <button @click="hide" class="notifications_valid-button popup_button_valid">OK</button>
    </div>

    <div class="confirmation popup" v-if="notifications.type == 'confirmation'" ref="confirmation">
        <div class="confirmation_text popup_text">{{notifications.message}}</div>
        <div class="popup_button">
            <button @click="hide" class="confirmation_cancel-button popup_button_cancel">Annuler</button>
            <button @click="hide" class="confirmation_valid-button popup_button_valid">Oui</button>
        </div>
    </div>
</div>
    

</template>

<!--STYLE-->
<style scope >

/* Notifications */

.popup {
    background-color: #dfecff;
    text-align: center;
    margin: 10px auto;
    padding: 5px 5px 10px 5px;
    border: 1px solid #1f4073;
    border-radius: 10px;
    font-size: medium;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    color:#000;
}

.popup_text {
    padding: 10px 5px;
}

.popup_button {
    display: flex;
    justify-content: space-evenly;
}

.popup_button_valid {
    padding: 5px 10px;
    font-weight: bold;
    margin-top: 10px;
    border-radius: 10px;
    cursor:pointer;
}

.popup_button_cancel {
    padding: 5px;
    font-style: italic;
    margin-top: 10px;
    border-radius: 10px;
    cursor:pointer;
}

.alerte {
    border: 2px solid #d1515a;
    background-color: #FAC0C4;
    font-weight: bolder;
}
</style>
