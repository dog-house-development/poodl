import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import DeleteButton from '../DeleteButton';

configure({ adapter: new Adapter() });

describe('DeleteButton tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onConfirm: () => {},
                confirmQuestion: 'Are you sure?'
            },
            _props
        );
        wrapper = shallow(<DeleteButton {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });
    describe('render', () => {
        it('should render normal Deletebutton correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render form-Deletebutton correctly', () => {
            setInstanceAndWrapper({ formButton: true });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
