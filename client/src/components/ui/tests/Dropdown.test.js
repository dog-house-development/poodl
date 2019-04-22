import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Dropdown } from '../Dropdown';

configure({ adapter: new Adapter() });

describe('Dropdown tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                size: 'medium',
                kind: 'primary',
                buttonContent: 'Dropdown time',
                dropdownContent: [
                    { content: 'party', onClick: () => {} },
                    { type: 'divider' },
                    { content: 'woohoo', onClick: () => {} }
                ]
            },
            _props
        );
        wrapper = shallow(<Dropdown {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('handleClickOutside', () => {
        it('should set state to the open if it is closed', () => {
            instance.setState({ open: false });
            spyOn(instance, 'handleClickOutside');
            const e = {
                preventDefault: () => {}
            };
            instance.handleClickOutside(e);
            expect(instance.state.open).toEqual(true);
        });

        it('should set state to the closed if it is open', () => {
            instance.setState({ open: true });
            spyOn(instance, 'handleClickOutside');
            const e = {
                preventDefault: () => {}
            };
            instance.handleClickOutside(e);
            expect(instance.state.open).toEqual(false);
        });
    });

    describe('getDropdownContentMarkup', () => {
        it('should not return markup because open is false', () => {
            //spyOn(instance, 'handleClickOutside');
            instance.setState({ open: false });
            expect(instance.getDropdownContentMarkup()).toEqual(undefined);
        });
    });

    describe('render', () => {
        it('should render closed dropdown correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render open dropdown correctly', () => {
            instance.setState({ open: true });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render open arrow dropdown correctly', () => {
            setInstanceAndWrapper({ arrow: true });
            instance.setState({ open: true });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
