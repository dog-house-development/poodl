import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import PageNotFound from '../PageNotFound';

configure({ adapter: new Adapter() });

describe('PageNotFound tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = () => {
        wrapper = shallow(<PageNotFound />);
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
