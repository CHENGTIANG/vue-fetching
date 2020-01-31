import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Fetched from '../../dist/index';
const slots = {
  loading: 'loading',
}
const scopedSlots = {
  default: ({ data }) => {
    return `${data}`
  },
  error: ({ error }) => {
    return `${error}`
  },
}

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
const delay = (time = 1000) => new Promise(resolve => setTimeout(resolve, time))

describe('Fetched', () => {

  it('displays fetched', async () => {
    const msg = "Hello World!"
    const wrapper = mount(Fetched, {
      slots,
      scopedSlots,
    
      propsData: {
        fetch: async () => {
          return msg;
        }
      },
      
    });
    await tick()
    expect(wrapper.text()).to.equal(msg);
  });

  it('displays loading', async () => {
    const msg = "Hello World!"
    const wrapper = mount(Fetched, {
      slots,
      scopedSlots,
      propsData: {
        fetch: async () => {
          await delay(500);
          return msg;
        }
      },
    });
    await tick()
    expect(wrapper.text()).to.equal("loading");
  });

  it('displays loaded', async () => {
    const msg = "Hello World!"
    const wrapper = mount(Fetched, {
      slots,
      scopedSlots,
      propsData: {
        fetch: async () => {
          await delay(500);
          return msg;
        }
      },
    });
    await delay(500)
    await tick()
    expect(wrapper.text()).to.equal(msg);
  });


  it('display error', async () => {
    const msg = "Error"
    const wrapper = mount(Fetched, {
      slots,
      scopedSlots,
      propsData: {
        fetch: async () => {
          throw msg;
        }
      },
    });
    await tick()
    expect(wrapper.text()).to.equal(msg);
  });
});
