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
                value: '',
                content: '',
                placeholder: 'Enter email...',
                label: 'Email:',
                error: {}
            },
            _props
        );
        wrapper = shallow(<Field {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('handleChange', () => {
        it('should change set the state to the new value', () => {
            spyOn(instance, 'handleChange');
            const baseProps = { onChange: jest.fn() };
            setInstanceAndWrapper(baseProps);
            const e = {
                target: { name: 'email', value: 'Moo' },
                preventDefault: () => {}
            };
            wrapper.find('input').simulate('change', e);
            expect(baseProps.onChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('render', () => {
        it('should render not side by side', () => {
            setInstanceAndWrapper();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render the first side by side input', () => {
            setInstanceAndWrapper({ sidebyside: 1 });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render the second side by side input', () => {
            setInstanceAndWrapper({ sidebyside: 2 });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render without errors correctly', () => {
            setInstanceAndWrapper({ error: null });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with errors correctly', () => {
            setInstanceAndWrapper({ error: 'Big bad error' });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
