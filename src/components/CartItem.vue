<template>
  <div class='cit-container'>
    <img class='cit-cover-img' :src='book.cover'>
    <div v-html='book.title' class='cit-book-title' />
    <div class='cit-count-modifier'>
      <div class='cit-button' @click='onMinusClick'>
        <div class='icon icon-minus' />
      </div>
      <div v-html='count' class='cit-count-display' />
      <div class='cit-button' @click='onPlusClick'>
        <div class='icon icon-plus' />
      </div>
    </div>
    <div v-html="'฿' + totalPrice" class='cit-total-price' />
  </div>
</template>
<script>
export default {
  name: 'CartItem',
  props: {
    book: Object,
    count: Number,
  },
  methods: {
    onPlusClick() {
      this.$store.dispatch('add_to_cart', this.book);
    },
    onMinusClick() {
      this.$store.dispatch('remove_from_cart', this.book);
    },
  },
  computed: {
    totalPrice() {
      return this.book.price * this.count;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/icons.scss';

.cit {
  &-container {
    display: grid;
    align-items: center;
    grid-template-columns: .8fr 2fr 2fr 1fr;
    width: 100%;
    grid-gap: 16px;
    margin-bottom: 16px;
  }

  &-cover-img {
    max-height: 100%;
    max-width: 100%;
    border-radius: 8px;
  }

  &-count-modifier {
    display: flex;
    align-items: center;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background-color: $light-gray;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: $light-gray-hover;
      transition: 0.2s ease-in-out;
    }
  }

  &-count-display {
    flex-grow: 1;
    font-size: 14px;
    font-weight: 600;
  }

  &-total-price {
    font-size: 14px;
    font-weight: 600;
    text-align: right;

  }

  &-book-title {
    text-align: left;
    font-size: 12px;
    max-height: 48px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
  }
}
</style>
