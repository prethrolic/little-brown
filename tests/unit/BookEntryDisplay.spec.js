import { shallowMount } from '@vue/test-utils';
import BookEntryDisplay from '@/components/BookEntryDisplay';
import { bookList } from '@/const/testdata.js';

describe('BookEntryDisplay.vue', () => {
  it('render book details correctly', () => {
    const wrapper = shallowMount(BookEntryDisplay, {
      propsData: {
        book: bookList[0],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});