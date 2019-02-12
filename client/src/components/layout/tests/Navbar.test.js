import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Navbar, mapStateToProps } from '../Navbar';

configure({ adapter: new Adapter() });

describe('Navbar tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        props = _.assign(
            {},
            {
                content: 'Press me',
                onClick: () => {}
            },
            _props
        );
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false
                }
            },
            _state
        );
        wrapper = shallow(<Navbar {..._.assign({}, props, mapStateToProps(state, props))} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                auth: { isAuthenticated: false, loading: false }
            });
        });
    });

    describe('render', () => {
        it('should render links for logged in admins', () => {
            setInstanceAndWrapper({}, { auth: { isAuthenticated: true } });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render links for nobody logged in', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
