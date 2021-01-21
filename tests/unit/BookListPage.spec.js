import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BookListPage from '@/views/BookListPage.vue';
import { bookList, user } from '@/const/testdata.js';

const localVue = createLocalVue();
localVue.use(Vuex);

const originalFetch = global.fetch;
const mockJsonPromise = Promise.resolve({ books: bookList });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });

describe('BookListPage.vue', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.fetch = originalFetch;
  });

  it('call fetch correctly', () => {
    const wrapper = shallowMount(BookListPage, {
      mocks: {
        $store: {
          state: {
            user,
          },
        },
      },
      localVue
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(process.env.VUE_APP_BOOK_LIST_API, {"contentType": "application/json", "method": "GET"});
  });

  it('render all books without cart when screen width is <= 1024', async () => {
    const wrapper = shallowMount(BookListPage, {
      mocks: {
        $store: {
          state: {
            user,
            windowWidth: 768,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      displayBookList: bookList,
    })
    
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render cart when cart button is clicked', async () => {
    const wrapper = shallowMount(BookListPage, {
      mocks: {
        $store: {
          state: {
            user,
            windowWidth: 768,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      displayBookList: bookList,
    })

    await wrapper.find('.blp-cart-button').trigger('click');
    expect(wrapper.element).toMatchSnapshot();
  })

  it('render cart when screen width is more than 1024px', async () => {
    const wrapper = shallowMount(BookListPage, {
      mocks: {
        $store: {
          state: {
            user,
            windowWidth: 1200,
          },
        },
      },
      localVue
    });
    await wrapper.setData({
      displayBookList: bookList,
    })
    
    expect(wrapper.element).toMatchSnapshot();
  });
});
