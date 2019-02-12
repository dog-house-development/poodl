import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Register, mapStateToProps, mapDispatchToProps } from '../Register';

configure({ adapter: new Adapter() });

describe('Register tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false
                },
                errors: {}
            },
            _state
        );
        props = _.assign({}, { history: ['/register'] }, _props);
        wrapper = shallow(
            <Register
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
            name: 'Sam',
            email: 'sam@test.com',
            password: 'abc123',
            password2: 'abc123',
            errors: { email: 'Invalid email' }
        });
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                auth: { isAuthenticated: false, loading: false },
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.parse(JSON.stringify(mapDispatchToProps(dispatch)))).toEqual(
                JSON.parse(JSON.stringify({ registerAdmin: () => {} }))
            );
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
            const newInstanceProps = instance.props.history.concat('/dashboard');
            instance.componentDidMount();
            expect(instance.props.history).toEqual(newInstanceProps);
        });
    });

    describe('componentWillReceiveProps', () => {
        it('should set state.errors to newProps errors', () => {
            spyOn(instance, 'componentWillReceiveProps');
            expect(instance.state.errors).toEqual({ email: 'Invalid email' });
            wrapper.setProps({ errors: { password: 'Fake password' } });
            expect(instance.componentWillReceiveProps).toHaveBeenCalled();
            //expect(instance.state.errors).toEqual({ password: 'Fake password' });
            wrapper.setProps({ errors: {} });
            //expect(instance.state.errors).toEqual({});
            expect(instance.componentWillReceiveProps.calls.count()).toBe(2);
        });
    });

    describe('onChange', () => {
        it('should run without errors', () => {
            spyOn(instance, 'onChange');
            expect(instance.state.email).toEqual('sam@test.com');
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

    describe('getFields', () => {
        it('should return correct fields', () => {
            expect(instance.getFields()).toEqual([
                {
                    onChange: instance.onChange,
                    value: 'Sam',
                    id: 'name',
                    type: 'text',
                    label: 'Name',
                    placeholder: 'First Last...'
                },
                {
                    onChange: instance.onChange,
                    value: 'sam@test.com',
                    id: 'email',
                    type: 'email',
                    label: 'Email',
                    error: 'Invalid email',
                    placeholder: 'example@poodl.com...'
                },
                {
                    onChange: instance.onChange,
                    value: 'abc123',
                    id: 'password',
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Shhhhh...'
                },
                {
                    onChange: instance.onChange,
                    value: 'abc123',
                    id: 'password2',
                    type: 'password',
                    label: 'Confirm Password',
                    placeholder: 'Again...'
                }
            ]);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
