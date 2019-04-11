import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { ViewActivity, mapStateToProps, mapDispatchToProps } from '../ViewActivity';

configure({ adapter: new Adapter() });

const match = {
    params: {
        _id: '123' //any id you want to set
    }
};
describe('ViewActivity tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    admin: {
                        superAdmin: true
                    },
                    errors: {}
                },
                activities: {
                    all: {
                        123: {
                            _id: '1',
                            name: 'Fun',
                            description: 'A fun time with fun activities',
                            startDate: '1971-02-01T07:00:00.000Z',
                            endDate: '1971-02-01T07:00:00.000Z',
                            members: [
                                { firstName: 'Big', lastName: 'Tup', _id: '123' },
                                { firstName: 'Lil', lastName: 'Tup', _id: '321' }
                            ],
                            loading: false
                        }
                    },

                    errors: {},
                    loading: false
                }
            },
            _state
        );
        props = _.assign({}, { match: { params: { id: 123 } } }, _props);
        wrapper = shallow(
            <ViewActivity
                match={match}
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
                activity: {
                    _id: '1',
                    name: 'Fun',
                    description: 'A fun time with fun activities',
                    startDate: '1971-02-01T07:00:00.000Z',
                    endDate: '1971-02-01T07:00:00.000Z',
                    members: [
                        { firstName: 'Big', lastName: 'Tup', _id: '333' },
                        { firstName: 'Lil', lastName: 'Tup', _id: '444' }
                    ]
                },
                membersLoading: {
                    members: {
                        accessLevel: 'Admin',
                        seniorCenterId: 123,
                        firstName: 'Frog',
                        lastName: 'Anderson',
                        loading: false
                    },
                    errors: {}
                },
                loading: false,
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(
                JSON.stringify({ activityActions: {}, memberActions: {} })
            );
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
