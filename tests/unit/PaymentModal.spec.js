import { shallowMount, mount } from '@vue/test-utils';
import PaymentModal from '@/components/PaymentModal.vue';

describe('PaymentModal.vue', () => {
  it('not render when isOpen is false', () => {
    const wrapper = shallowMount(PaymentModal, {
      propsData: {
        isOpen: false,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('render correctly for cash input', async () => {
    const wrapper = shallowMount(PaymentModal, {
      propsData: {
        isOpen: true,
        total: '2000.00'
      },
    });

    await wrapper.setData({
      cash: '',
      mode: 'payment',
      submitted: false,
    })

    expect(wrapper.element).toMatchSnapshot();
  });

  it('call doSubmit when checkout with proper cash', async () => {
    const wrapper = mount(PaymentModal, {
      propsData: {
        isOpen: true,
        total: '2000.00'
      },
    });

    await wrapper.setData({
      cash: '3000',
      mode: 'payment',
      submitted: false,
    });
    jest.spyOn(wrapper.vm, 'doSubmit');
    wrapper.vm.onSubmit();
    expect(wrapper.vm.doSubmit).toHaveBeenCalled();
  });

  it('not call doSubmit when checkout with inadequate cash', async () => {
    const wrapper = mount(PaymentModal, {
      propsData: {
        isOpen: true,
        total: '2000.00'
      },
    });

    await wrapper.setData({
      cash: '1000',
      mode: 'payment',
      submitted: false,
    });
    jest.spyOn(wrapper.vm, 'doSubmit');
    wrapper.vm.onSubmit();
    expect(wrapper.vm.doSubmit).not.toHaveBeenCalled();
  });

  it('render correctly for processing', async () => {
    const wrapper = shallowMount(PaymentModal, {
      propsData: {
        isOpen: true,
        total: '2000.00'
      },
    });

    await wrapper.setData({
      cash: '3000',
      mode: 'processing',
      submitted: true,
    })

    expect(wrapper.element).toMatchSnapshot();
  });

});