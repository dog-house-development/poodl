import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ViewAllActivities, mapStateToProps, mapDispatchToProps } from '../ViewAllActivities';

configure({ adapter: new Adapter() });

describe('View all activities tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
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
            <ViewAllActivities
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

                errors: {},
                loading: false
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

    describe('getDataGridContent', () => {
        it('should return filtered activity data', () => {
            expect(instance.getDataGridContent()).toEqual([
                {
                    key: '1',
                    name: 'Fun',
                    startDate: '12:00 am, February 1st 1971',
                    endDate: '12:00 am, February 1st 1971',
                    memberCount: 2
                },
                {
                    key: '2',
                    name: 'Stuff',
                    startDate: '12:00 am, January 1st 1970',
                    endDate: '12:00 am, January 1st 1970',
                    memberCount: 2
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
