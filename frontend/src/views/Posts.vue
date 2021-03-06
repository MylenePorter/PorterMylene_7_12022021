<script>
import HeaderNavbar from "@/components/header_navbar.vue";
import FormNewPost from "@/components/form_new_post.vue";
import Post from "@/components/post.vue";
import Notifications from "@/components/notifications.vue";

export default {
  name: "PostFeed",
  components: {
    HeaderNavbar,
    Notifications,
    FormNewPost,
    Post
  },
  data: () => {
    return {
      posts: [],
      notifications: {}
    }
  },
  methods: {
    deletePost(postID) {
      
      this.$axios
        .delete(`post/${postID}`)
        .then(() => {
          
          this.initialize();
          this.setNotification('notification', "Le post vient d'être supprimé", null);
        })
        .catch(() => {
          
          this.setNotification('alert', "Il y a eu une erreur lors de la suppression", null);
        });
    },
    likePost(postID) {
      
      this.$axios
        .post(`post/${postID}/like`)
        .then(() => {
          
          this.initialize();
        })
        .catch(() => {
          this.setNotification('alert', "Pas de likage!!!! ;-( ", null);
          
        });
    },
    postPost(data) {
      
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('content', data.content);
      this.$axios
        .post(`post`, formData)
        .then(() => {
          
          this.initialize();
        })
        .catch(() => {
          
          this.setNotification('alert', "Le post n'a pas pu être créé", null);
        });
    },
    initialize() {
      this.getAllPosts();
    },
    getAllPosts() {
      this.$axios
        .get("post") // http://localhost:3000/api/post
        .then((data) => {
          this.posts = data.data;
        })
        .catch(() => {
          
          this.setNotification('alert', "Ahhh!! Nous n'avons pas de posts!!!", null);
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
      <FormNewPost v-on:postPost="postPost" />
      <Post v-bind:posts="posts" v-on:deletePost="deletePost" v-on:likePost="likePost" />
    </div>
</template>