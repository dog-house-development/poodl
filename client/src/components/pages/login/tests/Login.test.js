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
            expect(mapStateToProps(state, props)).toEqual({
                auth: { isAuthenticated: false, loading: false, errors: {} },
                errors: {}
            });
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
        it('should run without errors', () => {
            spyOn(instance, 'onChange');
            expect(instance.state.email).toEqual('test@test.test');
            const e = {
                target: { id: 'email', value: 'Meow' }
            };
            instance.onChange(e);
        });
    });

    describe('onSubmit', () => {
        it('should run without errors', () => {
            spyOn(instance, 'onSubmit');
            const e = {
                target: { id: 'email', value: 'Meow' },
                preventDefault: () => {}
            };
            wrapper.find('Form').simulate('submit', e);
        });
    });

    describe('getFormErrors', () => {
        it('should return nothing when there are no errors', () => {
            expect(instance.getFormErrors()).toEqual([]);
        });

        it('should return correct errors when they exist', () => {
            setInstanceAndWrapper({}, { auth: { errors: { emailnotfound: 'Email not found' } } });
            expect(instance.getFormErrors()).toEqual(['Email and password combination not found']);

            setInstanceAndWrapper({}, { auth: { errors: { passwordincorrect: 'Password incorrect' } } });
            expect(instance.getFormErrors()).toEqual(['Email and password combination not found']);

            setInstanceAndWrapper({}, { auth: { errors: { email: 'Invalid email' } } });
            expect(instance.getFormErrors()).toEqual([]);

            setInstanceAndWrapper({}, { auth: { errors: { party: 'Party time' } } });
            expect(instance.getFormErrors()).toEqual(['Party time']);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
