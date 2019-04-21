import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Login, mapStateToProps, mapDispatchToProps } from '../Login';

configure({ adapter: new Adapter() });

describe('Login tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false,
                    errors: {}
                }
            },
            _state
        );
        props = _.assign(
            {},
            {
                history: ['/login'],
                location: {}
            },
            _props
        );
        wrapper = shallow(
            <Login
                {..._.assign(
                    {},
                    props,
                    mapStateToProps(state, props),
                    mapDispatchToProps(jasmine.createSpy('dispatch'))
                )}
            />
        );
        instance = wrapper.instance();
        wrapper.setState({
            email: 'test@test.test',
            password: 'abc123',
            errors: {}
        });
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toMatchSnapshot();
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ authActions: {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should redirect if admin is authenticated', () => {
            const authenticatedState = {
                auth: {
                    isAuthenticated: true,
                    loading: false
                }
            };
            setInstanceAndWrapper({}, authenticatedState);
            const newInstanceProps = _.concat(instance.props.history, '/dashboard');
            instance.componentDidMount();
            expect(instance.props.history).toEqual(newInstanceProps);
        });
    });

    describe('componentWillReceiveProps', () => {});

    describe('onChange', () => {
        it('should change auth loading to true', () => {
            instance.setState({ auth: { loading: false } });
            spyOn(instance, 'onChange');
            const e = {
                target: {
                    id: 'auth',
                    value: {
                        isAuthenticated: false,
                        loading: true,
                        errors: {}
                    }
                }
            };
            wrapper.find('DynamicForm').simulate('change', e);
        });
    });

    describe('onSubmit', () => {
        it('should run without errors', () => {
            spyOn(instance, 'onSubmit');
            const e = {
                target: { id: 'email', value: 'Meow' },
                preventDefault: () => {}
            };
            wrapper.find('DynamicForm').simulate('submit', e);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
