import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cart: {},
    inPromotion: [],
  },
  mutations: {
    add_to_cart(state, book) {
      if (book.id in state.cart) {
        state.cart[book.id].count += 1;
      } else {
        state.cart[book.id] = { book, count: 1 };
        if (book.isPromoted) state.inPromotion.push(book.id);
      }
    },
  },
});

export default store;
