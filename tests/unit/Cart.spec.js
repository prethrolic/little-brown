import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Cart from '@/components/Cart.vue';
import { cart, inPromotion } from '@/const/testdata.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Cart.vue', () => {
  it('render cart correctly', async () => {
    const wrapper = shallowMount(Cart, {
      mocks: {
        $store: {
          state: {
            cart,
            inPromotion,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      cart,
      cartItemList: Object.keys(cart)
    })

    expect(wrapper.element).toMatchSnapshot();
  });

  it('calculate discount correctly', async () => {
    const wrapper = shallowMount(Cart, {
      mocks: {
        $store: {
          state: {
            cart,
            inPromotion,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      cart,
      cartItemList: Object.keys(cart)
    })

    expect(wrapper.vm.discount).toEqual('114.40');
  });

  it('calculate subtotal correctly', async () => {
    const wrapper = shallowMount(Cart, {
      mocks: {
        $store: {
          state: {
            cart,
            inPromotion,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      cart,
      cartItemList: Object.keys(cart)
    })

    expect(wrapper.vm.subtotal).toEqual('1850.00');
  });

  it('calculate total correctly', async () => {
    const wrapper = shallowMount(Cart, {
      mocks: {
        $store: {
          state: {
            cart,
            inPromotion,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      cart,
      cartItemList: Object.keys(cart)
    })

    expect(wrapper.vm.total).toEqual('1735.60');
  });
});