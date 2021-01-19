import { shallowMount } from '@vue/test-utils';
import CartItem from '@/components/CartItem.vue';
import { bookList } from '@/const/testdata.js';

describe('CartItem.vue', () => {
  it('render cart items correctly', () => {
    const wrapper = shallowMount(CartItem, {
      propsData: {
        book: bookList[0],
        count: 2,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});