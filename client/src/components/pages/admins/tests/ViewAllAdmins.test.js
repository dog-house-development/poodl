import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { ViewAllAdmins, mapStateToProps, mapDispatchToProps } from '../ViewAllAdmins';

configure({ adapter: new Adapter() });

describe('ViewAllAdmins tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                admins: {
                    loading: false,
                    all: [
                        {
                            _id: '123',
                            firstName: 'Big',
                            lastName: 'Tup',
                            email: 'bigtup@nowhere.com',
                            accessLevel: 'Super'
                        },
                        {
                            _id: '321',
                            firstName: 'Lil',
                            lastName: 'Tup',
                            email: 'liltup@nowhere.com',
                            accessLevel: 'Volunteer'
                        }
                    ],
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <ViewAllAdmins
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

    describe('mapStateToProps', () => {
        it('should map state to props', () => {
            expect(mapStateToProps(state, props)).toEqual({
                admins: [
                    {
                        _id: '123',
                        firstName: 'Big',
                        lastName: 'Tup',
                        email: 'bigtup@nowhere.com',
                        accessLevel: 'Super'
                    },
                    {
                        _id: '321',
                        firstName: 'Lil',
                        lastName: 'Tup',
                        email: 'liltup@nowhere.com',
                        accessLevel: 'Volunteer'
                    }
                ],
                errors: {},
                loading: false
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ adminActions: {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should run without breaking', () => {
            spyOn(instance, 'componentDidMount');
            instance.componentDidMount();
        });
    });

    describe('getDataGridContent', () => {
        it('should return filtered admins data', () => {
            expect(instance.getDataGridContent()).toEqual([
                {
                    key: '123',
                    firstName: 'Big',
                    lastName: 'Tup',
                    email: 'bigtup@nowhere.com',
                    super: 'Yes'
                },
                {
                    key: '321',
                    firstName: 'Lil',
                    lastName: 'Tup',
                    email: 'liltup@nowhere.com',
                    super: 'No'
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
