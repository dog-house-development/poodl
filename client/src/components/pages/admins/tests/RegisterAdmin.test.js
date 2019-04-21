import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { RegisterAdmin, mapStateToProps, mapDispatchToProps } from '../RegisterAdmin';

configure({ adapter: new Adapter() });

describe('RegisterAdmin tests', () => {
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
            firstName: 'Sam',
            lastName: 'Smith',
            email: 'sam@test.com',
            password: 'abc123',
            password2: 'abc123',
            error: { email: 'Invalid email' }
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

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
