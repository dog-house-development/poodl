import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Footer from '../Footer';

configure({ adapter: new Adapter() });

describe('Navbar tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        const props = _.assign({}, _props);
        const state = _.assign({}, _state);
        wrapper = shallow(<Footer {..._.assign({}, props)} />);
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
