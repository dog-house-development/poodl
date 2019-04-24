import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import CheckBox from '../CheckBox';

configure({ adapter: new Adapter() });

describe('CheckBox tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onChange: () => {},
                label: 'Test Box',
                value: true,
                id: 'primary'
            },
            _props
        );
        wrapper = shallow(<CheckBox {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render normal checkbox correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
