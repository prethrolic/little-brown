<template>
  <div
    :class="['bed-container', { 'clicked': clicked }]"
    @click='onClick'
    @animationend='clicked = false'
  >
    <div class='bed-cover-img-container'>
      <img class='bed-cover-img' :src="book.cover">
    </div>
    <div class='bed-detail-container'>
      <div v-html="book.title" class='bed-title' />
      <div v-if="book.isPromoted" class='bed-promo-tag'>promo</div>
      <div v-html="'฿' + book.price" class='bed-price' />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BookEntryDisplay',
  props: {
    book: Object,
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    onClick() {
      this.$store.commit('add_to_cart', this.book);
      this.clicked = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.bed {
  &-container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 1fr;
    height: 100%;
    padding: 12px;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
    box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      -webkit-box-shadow: 0px 0px 21px -5px rgba(46,46,46,0.44);
      box-shadow: 0px 0px 21px -5px rgba(46,46,46,0.44);
    }

    &.clicked {
      -webkit-box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
      box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
      animation: 0.4s bounce ease-in-out;
    }
  }

  &-cover-img {
    max-width: 100%;
    border-radius: 8px;
  }

  &-promo-tag {
    width: fit-content;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 8px;
    margin-top: 8px;
    border-radius:4px;
    background-color: $primary;
    color: white;
  }

  &-detail-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 4px;
    padding: 8px;
  }

  &-title {
    font-size: 12px;
    display: -webkit-box;
    font-weight: bold;
    text-transform: uppercase;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  &-price {
    margin-top: auto;
  }
}
</style>
