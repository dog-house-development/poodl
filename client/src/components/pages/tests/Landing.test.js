import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Landing, mapStateToProps } from '../Landing';

configure({ adapter: new Adapter() });

describe('Landing tests', () => {
    let state, props, wrapper, instance;
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
        props = _.assign({}, { history: ['/'] }, _props);
        wrapper = shallow(<Landing {..._.assign({}, props, mapStateToProps(state, props))} />);
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

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                isAuthenticated: false
            });
        });
    });

    describe('componentDidMount', () => {
        it('should redirect if admin is authenticated', () => {
            const authenticatedState = {
                auth: {
                    isAuthenticated: true
                }
            };
            setInstanceAndWrapper({}, authenticatedState);
            const newInstanceProps = instance.props.history.concat('/dashboard');
            instance.componentDidMount();
            expect(instance.props.history).toEqual(newInstanceProps);
        });
    });
});
