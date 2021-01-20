<template>
  <div class='blp-view-container'>
    <Cart />
    <div class='blp-catalog-wrap'>
      <div class='blp-header-container'>
        <h1 class='blp-store-title'>Little Brown Book Shop</h1>
        <div class='blp-profile-container'>
          <div class='blp-profile-picture'>
            <img :src='pictureUrl' />
          </div>
          <div v-html='displayName' class='blp-profile-name' />
          <div class='blp-logout-button' @click='doLogout'>
            Logout
          </div>
        </div>
      </div>
      <div class='blp-tool-container'>
        <div class='blp-search-bar'>
        <div class='icon icon-search' />
        <input
          v-model='keyword'
          type='text'
          placeholder='Search..'
        >
      </div>
      </div>
      <div class='blp-products-container'>
        <div class='blp-products-grid'>
          <BookEntryDisplay
            v-for='book in displayBookList'
            :key='book.id'
            :book='book'
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookEntryDisplay from '@/components/BookEntryDisplay.vue';
import Cart from '@/components/Cart.vue';

const PROMOTED_TITLE = 'Harry Potter';

export default {
  name: 'BookListPage',
  components: {
    BookEntryDisplay,
    Cart,
  },
  data() {
    return {
      bookList: [],
      displayBookList: [],
      keyword: '',
      filter: '',
      isTyping: false,
    };
  },
  methods: {
    doLogout() {
      if (this.$liff.isLoggedIn()) {
        this.$liff.logout();
        window.location.reload();
      }
    },
    getBookList() {
      fetch(process.env.VUE_APP_BOOK_LIST_API, {
        method: 'GET',
        contentType: 'application/json',
      })
        .then((res) => res.json())
        .then((data) => {
          const bookList = data.books;
          const newBookList = bookList.map((entry) => {
            const isPromoted = entry.title.toLowerCase().includes(PROMOTED_TITLE.toLowerCase());
            return { ...entry, isPromoted };
          });

          this.bookList = newBookList;
          this.displayBookList = newBookList;
        });
    },
    onBookSearch() {
      this.displayBookList = this.bookList.filter(
        (entry) => entry.title.toLowerCase().includes(this.keyword.toLowerCase()),
      );
    },
  },
  computed: {
    displayName() {
      return this.$store.state.user.displayName;
    },
    pictureUrl() {
      return this.$store.state.user.pictureUrl;
    },
  },
  watch: {
    keyword: {
      handler() {
        if (!this.isTyping) {
          setTimeout(() => {
            this.onBookSearch();
            this.isTyping = false;
          }, 1000);
        }
        this.isTyping = true;
      },
    },
  },
  mounted() {
    this.getBookList();
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/icons.scss';

.blp {
  &-view-container {
    min-width: 320px;
    width: 100%;
    display: flex;
  }

  &-header-container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 24px;
  }

  &-store-title {
    margin: 0;
  }

  &-profile-container {
    display: flex;
    align-items: center;
    height: fit-content;
    border: 1px solid $dark-gray;
    border-radius: 12px;
    padding: 8px;
    margin-left: auto;
  }

  &-profile-picture {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 8px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  &-profile-name {
    font-size: 14px;
    font-weight: bold;
    margin-right: 16px;
  }

  &-logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: $secondary;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: $secondary-hover;
    }
  }

  &-tool-container {
    padding: 24px;
    align-content: space-between;
  }

  &-search-bar {
    height: fit-content;
    width: fit-content;
    padding: 4px 16px;
    background-color: $light-gray;
    border-radius: 8px;

    & > input {
      display: inline-block;
      width: 25vw;
      height: 32px;
      font-size: 16px;
    }

    & > .icon {
      display: inline-block;
      margin-right: 8px;
      margin-bottom: -2px;
    }
  }

  &-catalog-wrap {
    flex: 1;
    height: 100vh;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  &-products-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  &-products-grid {
    width: 100%;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
    padding: 24px;
  }

}
</style>
