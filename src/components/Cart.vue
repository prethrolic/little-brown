<template>
  <div class='cart-container'>
    <div class='cart-header-container'>
      <h2 class='cart-title'>Cart</h2>
      <div class='cart-clear-button' @click='onClear'>
        Clear All
      </div>
    </div>
    <div class='cart-products-container'>
      <CartItem
        v-for='id in cartItemList'
        :key='id'
        :book='cart[id].book'
        :count='cart[id].count'
      />
    </div>
    <div class='cart-total-price-container'>
      <table>
        <tr>
          <td class='cart-small-label'>Subtotal</td>
          <td v-html="'฿' + subtotal" class='cart-small-value' />
        </tr>
        <tr>
          <td class='cart-small-label'>Discounts</td>
          <td v-html="'- ฿' + discount" class='cart-small-value'/>
        </tr>
        <tr>
          <td class='cart-small-label'>Sales Tax</td>
          <td v-html="'฿' + tax.toFixed(2)" class='cart-small-value' />
        </tr>
      </table>
      <div class='cart-divider' />
      <table>
        <tr>
          <td class='cart-large-label'>Total</td>
          <td v-html="'฿' + total" class='cart-large-value' />
        </tr>
      </table>
    </div>
    <div
      :class="['cart-payment-button', { 'disabled' : isCartEmpty }]"
      @click='onPayment'
    >
      Pay with Cash
    </div>
    <PaymentModal
      :total='total'
      :isOpen='isPaymentModalOpen'
      @payment:cancel='isPaymentModalOpen = false'
      @payment:success='onPaymentSuccess'
    />
    <ReceiptModal
      :date='new Date()'
      :cart='cart'
      :user='user'
      :paymentInfo='{ subtotal, discount, total, cash }'
      :isOpen='isReceiptModalOpen'
      @bill:cancel='isReceiptModalOpen = false'
      @bill:success='onBillSuccess'
    />
  </div>
</template>
<script>
import CartItem from '@/components/CartItem.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import ReceiptModal from '@/components/ReceiptModal.vue';

export default {
  name: 'Cart',
  components: {
    CartItem,
    PaymentModal,
    ReceiptModal,
  },
  data() {
    return {
      cart: {},
      cartItemList: [],
      inPromotion: [],
      tax: 0,
      cash: '',
      isPaymentModalOpen: false,
      isReceiptModalOpen: false,
      scroll: false,
    };
  },
  updated() {
    if (this.scroll) {
      this.scroll = false;
      this.$nextTick(() => this.scrollToBottom());
    }
  },
  methods: {
    getCart() {
      this.cart = this.$store.state.cart;
      this.cartItemList = Object.keys(this.cart);
      this.inPromotion = this.$store.state.inPromotion;
    },
    onBillSuccess() {
      this.$store.dispatch('clear_all');
      window.location.reload();
    },
    onClear() {
      this.$store.dispatch('clear_all');
    },
    onPayment() {
      this.isPaymentModalOpen = true;
    },
    onPaymentSuccess(cash) {
      this.isPaymentModalOpen = false;
      this.cash = cash;
      this.isReceiptModalOpen = true;
    },
    scrollToBottom() {
      const productContainer = this.$el.querySelector('.cart-products-container');
      productContainer.scrollTop = productContainer.scrollHeight;
    },
  },
  computed: {
    discount() {
      let discount = 0;
      const promotedTitleCount = this.inPromotion.length;
      if (promotedTitleCount > 1 && promotedTitleCount <= 7) {
        this.inPromotion.forEach((id) => {
          discount += this.cart[id].book.price * (10 + (promotedTitleCount - 2)) * 0.01;
        });
      } else if (promotedTitleCount > 7) {
        this.inPromotion.forEach((id) => {
          discount += this.cart[id].book.price * 0.15;
        });
      }

      return discount.toFixed(2);
    },
    isCartEmpty() {
      return this.cartItemList.length === 0;
    },
    total() {
      return (this.subtotal - this.discount + this.tax).toFixed(2);
    },
    subtotal() {
      let subtotal = 0;
      this.cartItemList.forEach((id) => {
        subtotal += this.cart[id].book.price * this.cart[id].count;
      });

      return subtotal.toFixed(2);
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    '$store.state.cart': {
      deep: true,
      handler(oldCart, newCart) {
        this.getCart();
        if (Object.keys(oldCart).length > Object.keys(newCart).length) {
          this.scroll = true;
        }
      },
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.cart {
  &-container {
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100vh;
    border-right: 1px solid $light-gray;
    background-color: $bg-gray;
  }

  &-header-container {
    display: flex;
    margin: 24px 0;
  }

  &-clear-button {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: $secondary;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: $secondary-hover;
      color: white;
      cursor: pointer;
    }
  }

  &-products-container {
    height: 100%;
    overflow-y: scroll;
  }

  &-total-price-container {
    width: 100%;
    background-color: white;
    border: 1px solid $light-gray;
    border-radius: 12px;
    padding: 8px 16px;
    margin-top: 24px;
    -webkit-box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
    box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
  }

  &-small-label {
    font-size: 14px;
    text-align: left;
  }

  &-small-value {
    font-size: 14px;
    font-weight: bold;
    text-align: right;
  }

  &-large-label {
    font-size: 18px;
    text-align: left;
  }

  &-large-value {
    font-size: 20px;
    font-weight: bold;
    text-align: right;
  }

  &-divider {
    background-color: $light-gray;
    height: 1px;
    width: 100%;
    margin: 4px 0;
  }

  &-payment-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    width: 100%;
    height: 112px;
    border-radius: 12px;
    background-color: $primary;
    font-size: 20px;
    font-weight: bold;
    color: white;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: $primary-hover;
    }

    &.disabled {
      background-color: $light-gray;
      color: $dark-gray;
      cursor: not-allowed;
    }
  }
}

table {
  width: 100%;
  padding: 8px 8px 4px 8px;
}

td {
  padding-bottom: 8px;
}
</style>
