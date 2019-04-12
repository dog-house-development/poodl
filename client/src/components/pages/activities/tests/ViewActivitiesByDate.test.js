import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ViewActivitiesByDate, mapStateToProps, mapDispatchToProps } from '../ViewActivitiesByDate';

configure({ adapter: new Adapter() });

describe('View ActivitiesByDate test', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    admin: {
                        _id: '123',
                        firstName: 'Moose',
                        lastName: 'Man',
                        email: 'mooseman@nowhere.com',
                        superAdmin: true
                    },
                    errors: {}
                },
                activities: {
                    loading: false,
                    all: [
                        {
                            _id: '1',
                            name: 'Fun',
                            description: 'A fun time with fun activities',
                            startDate: '1971-02-01T07:00:00.000Z',
                            endDate: '1971-02-01T07:00:00.000Z',
                            members: [
                                { firstName: 'Big', lastName: 'Tup', _id: '123' },
                                { firstName: 'Lil', lastName: 'Tup', _id: '321' }
                            ]
                        },
                        {
                            _id: '2',
                            name: 'Stuff',
                            description: 'A fun time with fun stuff',
                            startDate: '1970-01-01T07:00:00.000Z',
                            endDate: '1970-01-01T07:00:00.000Z',
                            members: [
                                { firstName: 'Big', lastName: 'Tup', _id: '123' },
                                { firstName: 'Lil', lastName: 'Tup', _id: '321' }
                            ]
                        }
                    ],
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <ViewActivitiesByDate
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
                activities: [
                    {
                        _id: '1',
                        name: 'Fun',
                        description: 'A fun time with fun activities',
                        startDate: '1971-02-01T07:00:00.000Z',
                        endDate: '1971-02-01T07:00:00.000Z',
                        members: [
                            { firstName: 'Big', lastName: 'Tup', _id: '123' },
                            { firstName: 'Lil', lastName: 'Tup', _id: '321' }
                        ]
                    },
                    {
                        _id: '2',
                        name: 'Stuff',
                        description: 'A fun time with fun stuff',
                        startDate: '1970-01-01T07:00:00.000Z',
                        endDate: '1970-01-01T07:00:00.000Z',
                        members: [
                            { firstName: 'Big', lastName: 'Tup', _id: '123' },
                            { firstName: 'Lil', lastName: 'Tup', _id: '321' }
                        ]
                    }
                ],
                activitiesLoading: false,
                auth: {
                    admin: {
                        _id: '123',
                        firstName: 'Moose',
                        lastName: 'Man',
                        email: 'mooseman@nowhere.com',
                        superAdmin: true
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
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ activityActions: {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should run without breaking', () => {
            spyOn(instance, 'componentDidMount');
            instance.componentDidMount();
        });
    });

    describe('render', () => {
        xit('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
