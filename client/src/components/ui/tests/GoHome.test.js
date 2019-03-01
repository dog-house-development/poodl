import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { GoHome, mapStateToProps } from '../GoHome';

configure({ adapter: new Adapter() });

describe('GoHome tests', () => {
    let wrapper, instance, state, props;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false
                }
            },
            _state
        );
        props = _.assign(
            {},
            {
                size: 'medium',
                kind: 'primary',
                content: 'Go Home'
            },
            _props
        );
        wrapper = shallow(<GoHome {..._.assign({}, props, mapStateToProps(state, props))} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render correctly when admin is authenticated', () => {
            const authenticatedState = {
                auth: {
                    isAuthenticated: true
                }
            };
            setInstanceAndWrapper({}, authenticatedState);
            expect(wrapper).toMatchSnapshot();
        });
        it('should render correctly when admin is not authenticated', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                isAuthenticated: false
            });
        });
    });
});
