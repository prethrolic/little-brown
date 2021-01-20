<template>
  <div v-if='isOpen' class='rcm-backdrop'>
    <h2 class='rcm-title'>Thank You for Shopping with Us!</h2>
    <h3 class='rcm-subtitle'>here's your receipt</h3>
    <div class='rcm-receipt-container'>
      <div class='rcm-receipt-body'>
        <h3 class='rcm-store-title'>Little Brown</h3>
        <div class='rcm-information'>
          <div v-html='date.toString()' />
          <div>Service Cashier: {{ user.displayName }}</div>
        </div>
        <div class='rcm-divider' />
        <div class='rcm-product-info' v-for='id in Object.keys(cart)' :key='id'>
          <div v-html='cart[id].book.title' />
          <div v-html='cart[id].count' />
          <div v-html='cart[id].book.price * cart[id].count' style='text-align: right'/>
        </div>
        <div class='rcm-text'><br>Total {{ cartCount }} items</div>
        <div class='rcm-divider' />
        <div class='rcm-payment-info'>
          <div>Subtotal</div>
          <div v-html='paymentInfo.subtotal' />
        </div>
        <div class='rcm-payment-info'>
          <div>Discount</div>
          <div v-html="'- ' + paymentInfo.discount" />
        </div>
        <div class='rcm-payment-info'>
          <div>Sales Tax</div>
          <div>+ 0.00</div>
        </div>
        <div class='rcm-divider' />
        <div class='rcm-payment-info large'>
          <div>Total</div>
          <div v-html="'฿ '+ paymentInfo.total" />
        </div>
        <div class='rcm-divider' />
        <div class='rcm-payment-info'>
          <div>Cash</div>
          <div v-html='paymentInfo.cash' />
        </div>
        <div class='rcm-payment-info'>
          <div>Change</div>
          <div v-html='(paymentInfo.cash - paymentInfo.total).toFixed(2)' />
        </div>
      </div>
    </div>
    <div class='rcm-button-container'>
      <button class='rcm-button cancel' @click="$emit('bill:cancel')">
        Cancel Bill
      </button>
      <button class='rcm-button confirm' @click="$emit('bill:success')">
        Proceed
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReceiptModal',
  props: {
    date: Date,
    user: Object,
    cart: Object,
    paymentInfo: Object,
    isOpen: Boolean,
  },
  computed: {
    cartCount() {
      let count = 0;
      Object.keys(this.cart).forEach((id) => {
        count += this.cart[id].count;
      });

      return count;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.rcm {
  &-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-title {
  }

  &-receipt-container {
    width: 30%;
    height: 60%;
    max-width: 500px;
    min-width: 400px;
    max-height: 600px;
    background-color: $primary;
    padding: 32px 24px;
    margin: 24px 0 8px 0;
    overflow-x: auto;
    overflow-y: scroll;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }

  &-receipt-body {
    width: 80%;
    margin: auto;
    padding: 24px 16px 36px 16px;
    border-radius: 12px;
    background: white;
  }

  &-store-title {
    margin: 8px 0;
  }

  &-information {
    font-size: 12px;
    color: $dark-gray;
  }

  &-divider {
    width: 100%;
    margin: 16px auto;
    border-top: 1px dashed $dark-gray;
  }

  &-product-info {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr .1fr .2fr;
    text-align: left;

    & div {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow-y: hidden;
      font-size: 10px;
    }
  }

  &-text {
    font-size: 10px;
    text-align: left;
  }

  &-payment-info {
    display: flex;
    justify-content: space-between;
    font-size: 10px;

    &.large {
      font-size: 14px;
    }
  }

  &-button-container {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    border: none;
    height: 64px;
    width: 40%;
    min-width: fit-content;
    padding: 0 24px;
    border-radius: 12px;
    font-size: 20px;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &.confirm{
      background-color: $secondary;
      color: white;

      &:hover {
        background-color: $secondary-hover;
      }
    }

    &.cancel {
      background-color: $light-gray;
      color: $dark-gray;

      &:hover {
        background-color: $light-gray-hover;
      }
    }
  }
}
</style>
