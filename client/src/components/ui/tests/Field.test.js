import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Field from '../Field';

configure({ adapter: new Adapter() });

describe('Field tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onChange: () => {},
                name: 'email',
                id: 'email',
                type: 'email',
                size: 'normal',
                content: '',
                placeholder: 'Enter email...',
                label: 'Email:',
                error: {}
            },
            _props
        );
        wrapper = shallow(<Field {..._.assign({}, props)} />);
        instance = wrapper.instance();
        instance.setState({ value: '' });
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('onComponentDidMount', () => {
        it('should run without errors', () => {
            spyOn(instance, 'onComponentDidMount');
            instance.onComponentDidMount();
        });
    });

    describe('handleChange', () => {
        it('should run without errors', () => {
            spyOn(instance, 'handleChange');
            const e = { target: undefined };
            instance.handleChange(e);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
