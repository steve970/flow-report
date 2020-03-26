import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import { Components } from 'meteor/vulcan:core';
import RiversMain from '../lib/components/rivers/RiversMain';

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('RiversMain component testing', function() {
  it('renders welcome message', function() {
    const wrapper = mount(<Components.RiversMain />)
  });
});
