<template>
  <div class='blp-view-container'>
    <Cart />
    <div class='blp-catalog-wrap'>
      <div class='blp-header-container'>
        <h1 class='blp-store-title'>Little Brown Book Shop</h1>
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
    padding: 0 24px;
    align-content: space-between;
  }

  &-tool-container {
    padding: 0 24px 24px 24px;
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
    flex-grow: 1;
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
