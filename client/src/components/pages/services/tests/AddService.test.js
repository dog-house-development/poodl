import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { AddService, mapStateToProps, mapDispatchToProps } from '../AddService';

configure({ adapter: new Adapter() });

describe('Add service tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: true,
                    admin: {
                        superAdmin: false,
                        seniorCenter: 123,
                        firstName: 'Frog',
                        lastName: 'Anderson'
                    },
                    errors: {}
                },
                services: {
                    all: [
                        {
                            memberId: '123',
                            seniorCenterId: '1',
                            name: 'Fun',
                            details: 'A fun time with fun activities'
                        },
                        {
                            memberId: '321',
                            seniorCenterId: '1',
                            name: 'Stuff',
                            details: 'A fun time with fun stuff'
                        }
                    ],
                    errors: {}
                }
            },
            _state
        );
        wrapper = shallow(
            <AddService
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
            name: 'Test',
            description: 'test description',
            startDate: '1111-11-11T11:11:11',
            endDate: '1111-11-11T11:11:11',
            members: [
                { firstName: 'Big', lastName: 'Tup', _id: '123' },
                { firstName: 'Lil', lastName: 'Tup', _id: '321' }
            ],
            errors: { description: 'Description is required' }
        });
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                services: [
                    {
                        memberId: '123',
                        seniorCenterId: '1',
                        name: 'Fun',
                        details: 'A fun time with fun activities'
                    },
                    {
                        memberId: '321',
                        seniorCenterId: '1',
                        name: 'Stuff',
                        details: 'A fun time with fun stuff'
                    }
                ],
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ serviceActions: {} }));
        });
    });

    describe('getFields', () => {
        xit('should return correct fields if not super admin', () => {
            expect(instance.getFields()).toEqual([
                {
                    onChange: instance.onChange,
                    id: 'description',
                    type: 'text',
                    label: 'Description',
                    placeholder: 'Description',
                    error: undefined
                }
            ]);
        });

        describe('onSubmit', () => {
            xit('should run without errors', () => {
                spyOn(instance, 'onSubmit');
                const e = {
                    target: { id: 'name', value: 'Bingo' },
                    preventDefault: () => {}
                };
                wrapper.find('Form').simulate('submit', e);
            });
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
        xit('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
