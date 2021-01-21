<template>
  <div class='blp-view-container'>
    <Cart v-if='isLargeDevice' />
    <div v-else-if='isCartOpen'>
      <div class='blp-cart-backdrop'>
        <Cart v-click-outside='onCartClose' />
      </div>
    </div>
    <div v-else>
      <div class='blp-cart-button' @click='isCartOpen = true'>
        <div class='icon-cart-32' />
        <div v-if='cartCount > 0' v-html='cartCountDisplay' class='blp-cart-noti' />
      </div>
    </div>
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
import vClickOutside from 'v-click-outside';
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
      cartCount: 0,
      displayBookList: [],
      keyword: '',
      filter: '',
      isTyping: false,
      isCartOpen: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
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
    getCartCount() {
      const { cart } = this.$store.state;
      const cartItemList = Object.keys(this.$store.state.cart);
      let count = 0;
      cartItemList.forEach((id) => {
        count += cart[id].count;
      });

      this.cartCount = count;
    },
    onBookSearch() {
      this.displayBookList = this.bookList.filter(
        (entry) => entry.title.toLowerCase().includes(this.keyword.toLowerCase()),
      );
    },
    onCartClose() {
      this.isCartOpen = false;
    },
  },
  computed: {
    cartCountDisplay() {
      if (this.cartCount < 100) return this.cartCount;
      return '99+';
    },
    displayName() {
      return this.$store.state.user.displayName;
    },
    isLargeDevice() {
      return this.$store.state.windowWidth > 1024;
    },
    pictureUrl() {
      return this.$store.state.user.pictureUrl;
    },
  },
  watch: {
    '$store.state.cart': {
      deep: true,
      handler() {
        this.getCartCount();
      },
    },
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
    min-width: 375px;
    width: 100%;
    display: flex;
  }

  &-cart-button {
    position: fixed;
    display: flex;
    bottom: 48px;
    right: 48px;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    background: $primary;
    -webkit-box-shadow: 0px 0px 21px -5px rgba(46,46,46,0.44);
    box-shadow: 0px 0px 21px -5px rgba(46,46,46,0.44);
    cursor: pointer;
  }

  &-cart-noti {
    position: fixed;
    bottom: 92px;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: $accent;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }

  &-cart-backdrop {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &-header-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 24px;
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
    margin-top: 0;

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
    display: flex;
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

@media(max-width: 1024px) {
  .blp {
    &-catalog-wrap {
      padding: 24px;
    }

    &-search-bar > input {
      width: 50vw;
    }
  }
}

@media(max-width: 768px) {
  .blp {
    &-products-grid {
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }

    &-tool-container {
      width: 100%;
    }

    &-search-bar {
      width: 100%;
    }

    &-search-bar > input {
      width: 90%;
    }
  }
}

@media(max-width: 600px) {
  .blp {
    &-header-container {
      flex-direction: column;
      padding-bottom: 8px;
    }

    &-profile-container {
      margin-left: 0;
      margin-top: 16px;
      height: 96px;
    }

    &-catalog-wrap {
      padding: 24px 0;
    }

    &-cart-button {
      bottom: 24px;
      right: 24px;
    }

    &-cart-noti {
      bottom: 68px;
      right: 16px;
    }

    &-products-grid {
      grid-template-columns: 1fr;
      grid-gap: 16px;
    }
  }
}
</style>
