<!-- ***post.vue*** -->

<!--SCRIPT-->
<script>
export default {
    name: "Post",
    props: ['posts'],
    methods: {
        isLiked: function (liked) {
            return liked > 0 ? 'button-heart-active' : ''; // condition ? true : false
        },
        isMine: function (user_id) {
            const role = localStorage.getItem('role');
            if(role == 'standard'){
                const userID = localStorage.getItem('userID');
                return (user_id == userID) ? 'show' : 'hide';
            }else if(role == 'admin'){
                return 'show';
            }
        },
        deletePost(postID) {
            if(confirm("Supprimer définitivement ce post ?")){
                this.$emit("deletePost", postID);
            }
        },
        likePost(postID) {
            
            this.$emit("likePost", postID);
        }
    }
}
</script>

<!--TEMPLATE-->
<template>
    <div class="posts">
        <div v-for="(post, x) in posts" :key="x"> <!-- Boucler dans "posts" pour sortir chaque "post"(ligne) -->
            <div class="post">
                <div class="post_info">
                    <div class="post_info_name">{{post.first_name}} {{post.last_name}}</div>
                    <div class="post_info_separate">-</div>
                    <div class="post_info_hour">Posté {{post.posted}}</div>
                    <img @click="deletePost(post.postID)" :class="isMine(post.user_id)" class="post_info_delete" src="/img/icons/delete.png" alt="Supprimer">
                </div> <!---->
                                              
                <h1 class="post_title">
                    <!---->
                    <router-link :to="{name: 'Post', query: { postID: post.postID } }">{{post.content}}</router-link>
                </h1>
                <div class="post_media">
                    <router-link :to="{name: 'Post', query: { postID: post.postID } }">
                        <img class="post_media_pic" :src="'http://localhost:3000/images/' + post.filename" :alt="post.content"> <!---->
                        <!-- :src concaténé avec le post.filename --> 
                    </router-link>
                </div>
                <div class="post_appreciation">
                    <div class="post_appreciation_likes">
                        <a @click="likePost(post.postID)">
                            <div :class="isLiked(post.me_like)" class="post_appreciation_likes_heart"></div>
                            <!---->
                        </a>
                        <div class="post_appreciation_likes_count">{{post.likes}} j'aime</div>
                    </div>
                    <a class="post_appreciation_comments" name="comments">
                        <router-link :to="{name: 'Post', query: { postID: post.postID, goTo: 'comments' } }">
                            <img class="post_appreciation_comments_bubble" src="/img/icons/comment.png" alt="bubble commentaire">
                            <div class="post_appreciation_comments_count">{{post.comments}} commentaires</div>
                        </router-link>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<!--STYLE-->
<style>
    /* SECTION POST */
.show {
    display:block;
}

.hide {
    display:none;
}

.post {
    border-left: solid 2px #1f417375;
    border-top: solid 2px #1f417375;
    border-right: solid 2px #1f417375;
    border-bottom : solid 2px #1f417375;
    width: 50%;
    margin: 20px auto 0px auto;
    padding: 7px;
    color: #1f4073;
}

.post_info {
    display: flex;
    align-items: baseline;
    font-style: italic;
    font-size: small;
    width: 100%;
}

.post_info_name {
    margin: 0px 5px;
}

.post_info_hour {
    margin-left: 5px;
}

.post_info_delete {
    width:20px;
    margin-left:auto;
    cursor: pointer;
}
.post_title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    margin: 10px 0px;
    padding-left: 5px;
}

.post_media {
    text-align: center;
    }

.post_media_pic {
    margin: 10px 0px;
    align-items: center;
    width: 100%;
}

.post_appreciation {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: center;
    font-style: italic;
    font-size: small;
    /* border-bottom: solid 1px #1f417375; */
}

.post_appreciation_likes {
    display: flex;
    flex-direction: column;
    align-items :center;
    margin: 5px 0px;
    padding-bottom: 5px;
}

.post_appreciation_likes_heart {
    height:35px;
    width:35px;
    background-size: 35px 35px;
    background-image:url("/img/icons/heart_empty.png");
    cursor:pointer;
}

.post_appreciation_likes_heart:hover {
    height:35px;
    width:35px;
    background-size: 35px 35px;
    background-image:url("/img/icons/heart_full.png");
}

.button-heart-active {
    height:35px;
    width:35px;
    background-size: 35px 35px;
    background-image:url("/img/icons/heart_full.png");
}

.post_appreciation_likes_count {
    padding-left: 5px;
}

.post_appreciation_comments {
    align-self: center;
    padding-bottom: 5px;
    cursor:pointer;
}

.post_appreciation_comments_bubble {
    width: 30px;
    filter: invert(24%) sepia(10%) saturate(3702%) hue-rotate(178deg) brightness(93%) contrast(96%);
    cursor:pointer;
}

/* CSS pour tablettes */

@media all and (min-width: 765px) and (max-width: 899px) {
    .post {
        width: 60%;
    }
}


/* CSS pour les mobiles */

@media all and (min-width: 320px) and (max-width: 764px) {
    .post {
        width: 80%;
    }
}
</style>
