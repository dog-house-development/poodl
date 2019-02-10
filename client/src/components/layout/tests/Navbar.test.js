import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Navbar, mapStateToProps, mapDispatchToProps } from '../Navbar';

configure({ adapter: new Adapter() });

describe('Navbar tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        const props = _.assign(
            {},
            {
                content: 'Press me',
                onClick: () => {}
            },
            _props
        );
        const state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false
                }
            },
            _state
        );
        wrapper = shallow(
            <Navbar
                {..._.assign(
                    {},
                    props,
                    mapStateToProps(state, props),
                    mapDispatchToProps(jasmine.createSpy('dispatch'))
                )}
            />
        );
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
