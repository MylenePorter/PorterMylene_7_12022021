<!-- ***header_navbar.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "HeaderNavbar"
}
</script>

<!--TEMPLATE-->
<template>
     <header class="header_navbar">
        <router-link to="/Posts">
            <img class="header_navbar_logo" src="/img/logo/icon-left-font-monochrome-white.svg" alt="Logo Groupomania">
        </router-link>
        <nav class="header_navbar_nav">
            <router-link to="/Posts">
                <img class="header_navbar_homepage" src="/img/icons/home.png" alt="Accueil">
            </router-link>
            <router-link to="/Account">
                <img class="header_navbar_account" src="/img/icons/my_account.png" alt="Mon compte">
            </router-link>
            <router-link to="/">
                <img class="header_navbar_logout" src="/img/icons/logout.png" alt="Se déconnecter">
            </router-link>
        </nav>
    </header>
</template>

<!--STYLE-->
<style>
    
.header_navbar {
    display: flex;
    justify-content: space-between;
    align-items:center;
    background-color: #1f4073;
    padding: 15px 0px;
    color: #fff;
    font-size: x-large;
}

.header_navbar_logo {
    padding: 10px;
    width: 90%;
}

.header_navbar_nav {
    display: flex;
    padding: 10px;
    align-items: center;
}

.header_navbar_account,
.header_navbar_logout,
.header_navbar_homepage {
    margin: 0px 5px;
    padding: 10px;
    align-items: center;
    width: 40px;
    height: 40px;
    filter:invert(100%)
}


/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .header_navbar_account,
    .header_navbar_logout,
    .header_navbar_homepage {
        width: 30px;
        height: 30px;
        padding: 2px;
    }
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
.header_navbar_logo {
    padding-left: 10px;
    width: 75%;
}
    .header_navbar_account,
    .header_navbar_logout,
    .header_navbar_homepage {
        width: 20px;
        height: 20px;
        padding: 2px;
    }
}

</style>
