import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { App } from '../src/App';

describe('Basic App test', () => {
  it('shallow render', () => {
    const result = shallow(<App />);
    expect(result.contains(<h1>Hello World! <span>testing</span></h1>)).to.equal(true);
  });

  it('full render', () => {
    const result = mount(<App />);
    expect(result.find('h1').length).to.equal(1);
  });

  it('static render', () => {
    const result = render(<App />);
    expect(result.text()).to.contain('Hello World');
  });
});
