<!-- ***form_new_post.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "FormNewPost",
    data: () => {
        return {
            content: "",
            image: ""
        }
    },
    methods: {
        sendPost() {
            const validateForm = this.$refs.createPost.checkValidity();
            console.log(validateForm);
            if(validateForm){
                console.log("got it");
                this.$emit("postPost", this.$data);
                this.$refs.content.value = null;
                this.$refs.image.value = null;
            }else{
                console.log("notif1");
                this.$parent.setNotification('alert', "Quelque chose dans le formulaire n'est pas bon", null);
            }
        },
        sendFile(event) { 
            this.$data.image = event.target.files[0];
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
    <!-- Nouveau post -->
    <div class="newpost">
        <h1 class="newpost_title">Créez un nouveau post en 3 étapes</h1><br>
        <div class="newpost_steps">1 - Ecrivez votre message</div>
        <div class="newpost_steps">2 - Ajoutez un fichier</div>
        <div class="newpost_steps">3 - Publiez votre message</div>
        <form class="newpost_form" method="post" ref="createPost">
            <textarea 
                required
                maxlength="180"
                class="newpost_form_textarea" 
                v-model="content" 
                ref="content" ></textarea>
            <br />
            <div class="newpost_buttons">
                <input 
                    required
                    type="file" 
                    name="image" 
                    ref="image" 
                    v-on:change="sendFile($event)" 
                    class="newpost_buttons_addfile" >
                <button v-on:click.prevent="sendPost()" class="newpost_buttons_publish">Publier</button>
            </div>
        </form>
    </div>
</template>

<!--STYLE-->
<style>
.newpost h1 {
    margin:10px;
}

.newpost {
    border: solid 2px #1f417375;
    margin: 20px auto 10px auto;
    padding: 7px 7px 20px 7px;
    color: #1f4073;
    width: 50%;
}

.newpost_title {
    font-weight: bold;
    font-size: large;
}

.newpost_steps {
    padding-left:10px;
    font-size:small;
}

.newpost_form {
    padding-top:5px;
    text-align: center;
}

.newpost_form_textarea {
    width: 95%;
    border: solid 0.5px #1f4073;
    height: 60px;
    font-family: Arial, Helvetica, sans-serif;
}

.newpost_buttons {
    display: flex;
    justify-content: space-between;
}
.newpost_buttons_addfile {
    background-color: #B2B2B2;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
}

.newpost_buttons_publish {
    background-color: #1f4073;
    color: #fff;
    font-weight: bold;
    cursor:pointer;
}


/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .newpost {
        width: 60%;
    }
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .newpost {
        width: 80%;
    }
}
</style>
