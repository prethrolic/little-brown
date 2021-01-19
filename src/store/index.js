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
      const cart = JSON.parse(JSON.stringify(state.cart));
      if (book.id in cart) {
        cart[book.id].count += 1;
      } else {
        cart[book.id] = { book, count: 1 };
        if (book.isPromoted) state.inPromotion.push(book.id);
      }

      state.cart = cart;
    },
    remove_from_cart(state, book) {
      const cart = JSON.parse(JSON.stringify(state.cart));
      if (book.id in cart) {
        if (cart[book.id].count === 1) {
          delete cart[book.id];
          state.inPromotion = state.inPromotion.filter((id) => id !== book.id);
        } else {
          cart[book.id].count -= 1;
        }
      }
      state.cart = cart;
    },
    clear_all(state) {
      state.cart = {};
      state.inPromotion = [];
    },
  },
  actions: {
    add_to_cart(context, book) {
      context.commit('add_to_cart', book);
    },
    remove_from_cart(context, book) {
      context.commit('remove_from_cart', book);
    },
    clear_all(context, book) {
      context.commit('clear_all', book);
    },
  },
});

export default store;
