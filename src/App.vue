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
  created() {
    window.addEventListener('resize', () => { this.$store.dispatch('set_window_width'); });
  },
};
</script>
<style lang="scss">
@import './assets/scss/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary;
}

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

@media(max-width: 768px) {
  h1 { font-size: 1.5em }
  h2 { font-size: 1.2em }
  h3 { font-size: 1.0em }
}
</style>
