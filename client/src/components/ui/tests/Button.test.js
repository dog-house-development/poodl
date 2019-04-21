import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onClick: () => {},
                size: 'medium',
                kind: 'primary',
                content: 'Press me',
                type: 'normal'
            },
            _props
        );
        wrapper = shallow(<Button {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('getIconMarkup', () => {
        it('should render loading', () => {
            setInstanceAndWrapper({ loading: true });
            expect(wrapper).toMatchSnapshot();
        });
        it('should run getIconMarkup correctly', () => {
            setInstanceAndWrapper({ icon: 'account_box' });
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('getContent', () => {
        it('should render getContent correctly', () => {
            setInstanceAndWrapper();
            expect(wrapper).toMatchSnapshot();
        });
        it('should render loading', () => {
            setInstanceAndWrapper({ loading: true });
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render normal button correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render form-button correctly', () => {
            setInstanceAndWrapper({ formButton: true });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
