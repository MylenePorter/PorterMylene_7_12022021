<script>
import HeaderNavbar from "@/components/header_navbar.vue";
import Post from "@/components/post.vue";
import FormComment from "@/components/form_comment.vue";
import ListComments from "@/components/list_comments.vue";
import Notifications from "@/components/notifications.vue";

export default {
  name: "Posted",
  components: {
    HeaderNavbar,
    Notifications,
    Post,
    FormComment,
    ListComments
  },
  data: () => {
    return {
      posts: [],
      comments: [],
      notifications: {}
    }
  },
  methods: {
    deleteComment(commentID) {
      
      this.$axios
        .delete(`post/${this.postID}/comment/${commentID}`)
        .then(() => {
          
          this.initialize();
          this.setNotification('notification', "Le commentaire vient d'être supprimé", null);
        })
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur lors de la suppression", null);
        });
    },
    deletePost(postID) {
      
      this.$axios
        .delete(`post/${postID}`)
        .then(() => {
          
          this.$router.replace('/Posts');
        })
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur lors de la suppression", null);
        });
    },
    postComment(comment) {
      
      //alert(`post/${this.postID}/comment`);
      this.$axios
        .post(`post/${this.postID}/comment`, { content: comment })
        .then(() => {
          
          this.initialize();
        })
        .catch(() => {
          
          this.setNotification('alert', "Votre commentaire n'a pas pu être enregistré", null);
        });
    },
    likePost(postID) {
      
      this.$axios
        .post(`post/${postID}/like`)
        .then(() => {
          
          this.initialize();
        })
        .catch(() => console.log(e));
    },
    initialize() {
      this.postID = this.$route.query.postID; // Because vue's params don't darn work!
      this.getAllPosts();
      this.getComments();
    },
    getAllPosts() { // should be getOnePost()
      this.$axios
        .get("post/" + this.postID)
        .then((data) => {
          this.posts = data.data;
        })
        .catch(() => {
          
          this.setNotification('alert', "Ahhh!! Nous n'avons pas de posts!!!", null);
        });
    },
    getComments(){
      this.$axios
        .get("post/" + this.postID + "/comment")
        .then((data) => {
          this.comments = data.data; 
        })
        .catch(() => {
          
          this.setNotification('alert', "Personne ne m'aime!", null);
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
    this.initialize();
  }
}

</script>


<template>
    <div>
      <HeaderNavbar />
      <Notifications v-bind:notifications="notifications" />
      <Post v-bind:posts="posts" v-on:deletePost="deletePost" v-on:likePost="likePost" />
      <FormComment />
      <ListComments v-bind:comments="comments" v-on:deleteComment="deleteComment" />
    </div>
</template>



<style scoped>

.post {
    border-bottom :none;
}
.post_appreciation {
    border-bottom: solid 1px #1f417375;
}
</style>