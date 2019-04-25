import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Finished from '../Finished';

configure({ adapter: new Adapter() });

describe('Button tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = () => {
        wrapper = shallow(<Finished />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
