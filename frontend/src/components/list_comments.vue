<!-- ***list_comments.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "ListComments",
    props: ['comments'],
    data: () => {
        return {
        }
    },
    methods: {
        deleteComment(commentID) {
            if(confirm("Supprimer définitivement ce commentaire ?")){
                this.$emit("deleteComment", commentID);
            }
        },
        isMine: function (user_id) {
            const role = sessionStorage.getItem('role');
            if(role == 'standard'){
                const userID = sessionStorage.getItem('userID');
                return (user_id == userID) ? 'show' : 'hide';
            }else if(role == 'admin'){
                return 'show';
            }
        },
        writeComment() {
            
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
   <div class="list_comments" id="comments" @click="writeComment(comments)">
        <div v-for="(comment, x) in comments" :key="x">
            <div class="list_comments_comment" style="margin-bottom:10px;">
                <div class="list_comments_identity">
                    <div class="list_comments_identity_name">{{comment.first_name}} {{comment.last_name}}</div>
                    <div class="list_comments_identity_separate"> - </div>
                    <div class="list_comments_identity_date">{{comment.posted}}</div>
                    <img @click="deleteComment(comment.id)" :class="isMine(comment.user_id)" class="list_comments_delete" src="/img/icons/delete.png" alt="Supprimer">
                </div>
                <h2 style="color:black;font-size:16px;">{{comment.content}}</h2>
            </div>
        </div>
    </div>
</template>

<!--STYLE-->
<style>
.list_comments_comment h2 {
    margin:0;
    padding:0;
}

.show {
    display:block;
}

.hide {
    display:none;
}

.list_comments {
    border-left: solid 2px #1f417375;
    border-right: solid 2px #1f417375;
    border-bottom: solid 2px #1f417375;
    width: 50%;
    margin: 0px auto 20px auto;
    padding: 7px;
    color: #1f4073;
}

.list_comments {
    display: flex;
    flex-direction: column;
}

.list_comments_identity {
    display: flex;
    font-style: italic;
    font-size: small;
    color: #5f5f5f;
}

.list_comments_identity_separate {
    padding: 0px 5px;
}

.list_comments_delete{
    width:20px;
    margin-left:auto;
    cursor:pointer;
}

.list_comments_comment {
    font-size: small;
    color: #1f4073;
    padding-bottom: 5px;
}


/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .list_comments {
        width: 60%;
    }
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .list_comments {
        width: 80%;
    }
}
</style>
