<!-- *** form_comment.vue *** -->

<!--SCRIPT-->
<script>
export default {
    name: "FormComment",
    methods: {
        postComment(e) {
            e.preventDefault();
            const validateForm = this.$refs.createComment.checkValidity();
            if(validateForm){
                const comment = this.$refs.comment.value;
                this.$parent.postComment(comment);
                this.$refs.comment.value = null;
            }else{
                this.$parent.setNotification('alert', "Il manque le commentaire pour le... commentaire", null);
            }
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
 <div class="comment">
        <div class="comment_title">Mon commentaire</div>
        <form class="comment_form" method="post" @submit.prevent="postComment" ref="createComment">
            <input class="comment_form_input" type="text" name="comment" ref="comment" required>
            <button @click.prevent="postComment" class="comment_button">Publier</button>
        </form>
    </div>
</template>

<!--STYLE-->
<style>
.comment {
    border-left: solid 2px #1f417375;
    border-right: solid 2px #1f417375;
    margin: 0px auto 0px auto;
    padding: 7px 7px 20px 7px;
    color: #1f4073;
    width: 50%;
}

.comment_form {
    margin: 10px 10px 10px 0px;
}

.comment_form_input {
    width: 100%;
    height: 40px;
    border: solid 1px #1f4073;
}

.comment_button {
    background-color: #1f4073;
    color: #fff;
    font-weight: bold;
    cursor:pointer;
}

/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .comment {
        width: 60%;
    }
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .comment {
        width: 80%;
    }
}

</style>