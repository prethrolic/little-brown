import { shallowMount } from '@vue/test-utils';
import BookListPage from '@/views/BookListPage.vue';
import { bookList } from '@/const/testdata.js';


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
    const wrapper = shallowMount(BookListPage);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(process.env.VUE_APP_BOOK_LIST_API, {"contentType": "application/json", "method": "GET"});
  });

  it('render all books', async () => {
    const wrapper = shallowMount(BookListPage);
    await wrapper.setData({
      displayBookList: bookList,
    })
    
    expect(wrapper.element).toMatchSnapshot();
  });
});
