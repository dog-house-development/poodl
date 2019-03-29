import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { RegisterAdmin, mapStateToProps, mapDispatchToProps } from '../RegisterAdmin';

configure({ adapter: new Adapter() });

describe('Register tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        accessLevel: 'Admin',
                        seniorCenterId: 123,
                        firstName: 'Frog',
                        lastName: 'Anderson'
                    },
                    errors: {}
                },
                admins: {
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, { history: ['/admins/register'] }, _props);
        wrapper = shallow(
            <RegisterAdmin
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
                adminIsSuper: false,
                adminSeniorCenterId: 123,
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        accessLevel: 'Admin',
                        seniorCenterId: 123,
                        firstName: 'Frog',
                        lastName: 'Anderson'
                    },
                    errors: {}
                },
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ adminActions: {} }));
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
        xit('should run without errors', () => {
            spyOn(instance, 'onSubmit');
            const e = {
                target: { id: 'email', value: 'Meow' },
                preventDefault: () => {}
            };
            wrapper.find('Form').simulate('submit', e);
        });
    });

    describe('getFields', () => {
        xit('should return correct fields if not super admin', () => {
            expect(instance.getFields()).toEqual([
                {
                    onChange: instance.onChange,
                    id: 'firstName',
                    type: 'text',
                    label: 'First name',
                    placeholder: 'John...',
                    sidebyside: 1,
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'lastName',
                    type: 'text',
                    label: 'Last name',
                    placeholder: 'Smith...',
                    sidebyside: 2,
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'example@poodl.com...',
                    autoComplete: 'off',
                    error: 'Invalid email'
                },
                {
                    onChange: instance.onChange,
                    id: 'password',
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Shhhhh...',
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'password2',
                    type: 'password',
                    label: 'Confirm Password',
                    placeholder: 'Again...',
                    autoComplete: 'off',
                    error: undefined
                }
            ]);
        });

        xit('should return correct fields if super admin', () => {
            setInstanceAndWrapper({}, { auth: { admin: { accessLevel: 'Super', seniorCenterId: '123' } } });
            expect(instance.getFields()).toEqual([
                {
                    onChange: instance.onChange,
                    id: 'firstName',
                    type: 'text',
                    label: 'First name',
                    placeholder: 'John...',
                    sidebyside: 1,
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'lastName',
                    type: 'text',
                    label: 'Last name',
                    placeholder: 'Smith...',
                    sidebyside: 2,
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'email',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'example@poodl.com...',
                    autoComplete: 'off',
                    error: 'Invalid email'
                },
                {
                    onChange: instance.onChange,
                    id: 'password',
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Shhhhh...',
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'password2',
                    type: 'password',
                    label: 'Confirm Password',
                    placeholder: 'Again...',
                    autoComplete: 'off',
                    error: undefined
                },
                {
                    onChange: instance.onChange,
                    id: 'seniorCenterId',
                    content: '123',
                    type: 'text',
                    label: 'Senior Center Id',
                    placeholder: 'ID...',
                    error: undefined
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
