import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import ConfirmButton from '../ConfirmButton';

configure({ adapter: new Adapter() });

describe('DeleteButton tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onConfirm: () => {},
                message: 'Are you sure you want to delete this?'
            },
            _props
        );
        wrapper = shallow(<ConfirmButton {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render delete button correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
