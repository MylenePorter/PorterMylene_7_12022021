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
      console.log(postID);
      this.$axios
        .delete(`post/${postID}`)
        .then((w) => {
          console.log(w);
          this.initialize();
          this.setNotification('notification', "Le post vient d'être supprimé", null);
        })
        .catch((e) => {
          console.log(e);
          this.setNotification('alert', "Il y a eu une erreur lors de la suppression", null);
        });
    },
    likePost(postID) {
      console.log(postID);
      this.$axios
        .post(`post/${postID}/like`)
        .then((w) => {
          console.log(w);
          this.initialize();
        })
        .catch((e) => {
          this.setNotification('alert', "Pas de likage!!!! ;-( ", null);
          console.log(e);
        });
    },
    postPost(data) {
      console.log(data);
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('content', data.content);
      this.$axios
        .post(`post`, formData)
        .then((w) => {
          console.log(w);
          this.initialize();
        })
        .catch((e) => {
          console.log(e);
          this.setNotification('alert', "Le post n'a pas pu être créé", null);
        });
    },
    initialize() {
      this.getAllPosts();
    },
    getAllPosts() {
      this.$axios
        .get("post")
        .then((data) => {
          this.posts = data.data;
        })
        .catch((e) => {
          console.log(e);
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
    //console.log(this.$store.state.user.username);
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