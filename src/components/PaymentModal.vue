<template>
  <div v-if='isOpen' class='pmd-backdrop' @click="onClose">
    <div class='pmd-container' @click.stop=''>
      <div v-if="mode === 'payment'" class='pmd-body'>
        <h1 class='pmd-title'>
          Payment
        </h1>
        <form @submit.prevent='onSubmit'>
          <label class='pmd-form-label'>
            Please input amount of cash
          </label>
          <div class='pmd-input-wrap'>
            <div class='pmd-input-prefix'>฿</div>
            <input
              @focus='submitted = false'
              :class="['pmd-cash-input', { 'error' : submitted && (invalidCash || notEnoughCash) }]"
              v-model='cash'
              placeholder = "ex. 2000"
            />
          </div>
          <div class='pmd-error-message'>
            <div v-if='submitted && invalidCash'>
              Σ('◉⌓◉’)！！ Please input a valid number!
            </div>
            <div v-else-if='submitted && notEnoughCash'>
              Σ('◉⌓◉’)！！ Please pay adequate amount! no credits here!
            </div>
          </div>
          <button class='pmd-checkout-button'>Checkout</button>
        </form>
      </div>
      <div v-if="mode === 'processing'" class='pmd-body'>
        <div class='pmd-spinner'>
          <div class='icon-circle-notch' />
        </div>
        <div class='pmd-spinner-text'>
          processing change of ฿{{ change }} to customer..
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaymentModal',
  props: {
    total: String,
    isOpen: Boolean,
  },
  data() {
    return {
      cash: '',
      mode: 'payment',
      submitted: false,
    };
  },
  methods: {
    initModal() {
      this.cash = '';
      this.mode = 'payment';
      this.submitted = false;
    },
    isNumber(numString) {
      return !!(numString && numString.match(/^\d*\.?\d*$/));
    },
    onClose() {
      console.log('close');
      this.initModal();
      this.$emit('payment:cancel');
    },
    onSubmit() {
      this.submitted = true;
      console.log(this.cash, this.total, this.notEnoughCash);
      if (this.invalidCash || this.notEnoughCash) return;
      this.mode = 'processing';

      setTimeout(() => {
        this.$emit('payment:success', this.cash);
        this.initModal();
      }, 3000);
    },
  },
  computed: {
    change() {
      if (!this.isNumber(this.cash)) return 0;
      return (this.cash - this.total).toFixed(2);
    },
    invalidCash() {
      return !(this.isNumber(this.cash));
    },
    notEnoughCash() {
      if (this.isNumber(this.cash)) return (this.cash - this.total) < 0;
      return true;
    },
  },
  watch: {
    cash: {
      handler() {
        this.submitted = false;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/icons.scss';
@import '@/assets/scss/variables.scss';

.pmd {
  &-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-container {
    width: 40%;
    height: 50%;
    background-color: white;
    padding: 24px;
    overflow-x: auto;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
    box-shadow: 0px 0px 21px -5px rgba(199,199,199,0.44);
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &-form-label {
    font-size: 16px;
    font-weight: bold;
  }

  &-input-wrap {
    display: flex;
    align-items: center;
    margin: 16px 0;
    padding: 4px 16px;
    background-color: $light-gray;
    border-radius: 8px;
  }

  &-input-prefix {
    font-size: 20px;
    font-weight: 600;
  }

  &-cash-input {
    font-size: 24px;
    width: 160px;
    margin-left: 16px;
  }

  &-error-message {
    width: 250px;
    height: 36px;
    font-size: 12px;
    color: $accent;
  }

  &-checkout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    border: none;
    height: 64px;
    width: 250px;
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
  }

  &-spinner {
    animation: 1s spin infinite;
    animation-timing-function: linear;
  }

  &-spinner-text {
    margin: 24px;
    color: $dark-gray;
  }
}
</style>
