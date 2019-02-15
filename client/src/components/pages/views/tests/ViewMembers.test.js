import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { ViewMembers, mapStateToProps, mapDispatchToProps } from '../ViewMembers';

configure({ adapter: new Adapter() });

describe('ViewMembers tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                members: {
                    loading: false,
                    all: {
                        data: [
                            {
                                _id: '123',
                                firstName: 'Big',
                                lastName: 'Tup',
                                membershipDate: '02/20/2020',
                                email: 'bigtup@nowhere.com'
                            },
                            {
                                _id: '321',
                                firstName: 'Lil',
                                lastName: 'Tup',
                                membershipDate: '02/02/2002',
                                email: 'liltup@nowhere.com'
                            }
                        ]
                    }
                },
                errors: {}
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <ViewMembers
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
                members: [
                    {
                        _id: '123',
                        firstName: 'Big',
                        lastName: 'Tup',
                        membershipDate: '02/20/2020',
                        email: 'bigtup@nowhere.com'
                    },
                    {
                        _id: '321',
                        firstName: 'Lil',
                        lastName: 'Tup',
                        membershipDate: '02/02/2002',
                        email: 'liltup@nowhere.com'
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
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ getMembers: () => {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should run without breaking', () => {
            spyOn(instance, 'componentDidMount');
            instance.componentDidMount();
        });
    });

    describe('getDataGridContent', () => {
        it('should return filtered members data', () => {
            expect(instance.getDataGridContent()).toEqual([
                {
                    key: '123',
                    firstName: 'Big',
                    lastName: 'Tup',
                    membershipDate: '02/20/2020',
                    email: 'bigtup@nowhere.com'
                },
                {
                    key: '321',
                    firstName: 'Lil',
                    lastName: 'Tup',
                    membershipDate: '02/02/2002',
                    email: 'liltup@nowhere.com'
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
