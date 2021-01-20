<template>
  <div id="app">
    <BookListPage />
  </div>
</template>
<script>
import BookListPage from '@/views/BookListPage.vue';

export default {
  name: 'App',
  components: {
    BookListPage,
  },
  beforeMount() {
    this.$liff.init({ liffId: process.env.VUE_APP_LIFF_ID }, () => {
      if (process.env.VUE_APP_TEST_USER === 'TRUE') {
        const displayName = 'John Doe';
        const pictureUrl = 'https://pbs.twimg.com/profile_images/1269585418107805697/6QKUkoWJ_400x400.jpg';
        this.$store.dispatch('change_user', { displayName, pictureUrl });
      } else if (this.$liff.isLoggedIn()) {
        this.$liff.getProfile().then((profile) => {
          const { displayName, pictureUrl } = profile;
          this.$store.dispatch('change_user', { displayName, pictureUrl });
        }).catch((err) => console.error(err));
      } else {
        this.$liff.login();
      }
    });
  },
};
</script>
<style lang="scss">
@import './assets/scss/variables.scss';

body, html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

input {
  background-color: $light-gray;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }
}

h1, h2, h3 {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary;
}

#nav {
  height: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
