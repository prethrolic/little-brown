import { shallowMount } from '@vue/test-utils';
import ReceiptModal from '@/components/ReceiptModal.vue';
import { cart, user, paymentInfo } from '@/const/testdata.js';

const date = new Date(1466424490000);

describe('ReceiptModal.vue', () => {
  it('not render when isOpen is false', () => {
    const wrapper = shallowMount(ReceiptModal, {
      propsData: {
        isOpen: false,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('render correctly with cart and payment information', () => {
    const wrapper = shallowMount(ReceiptModal, {
      propsData: {
        date,
        cart,
        user,
        paymentInfo,
        isOpen: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});