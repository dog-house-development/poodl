import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ViewAllVolunteers, mapStateToProps, mapDispatchToProps } from '../ViewAllVolunteers';

configure({ adapter: new Adapter() });

describe('ViewAllVolunteers tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                volunteers: {
                    loading: false,
                    all: [
                        {
                            _id: '123',
                            firstName: 'Tup',
                            lastName: 'Big',
                            email: 'bigtup@nowhere.com'
                        },
                        {
                            _id: '321',
                            firstName: 'Tup',
                            lastName: 'Lil',
                            email: 'liltup@nowhere.com'
                        }
                    ]
                },
                errors: {}
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <ViewAllVolunteers
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
                volunteers: [
                    {
                        _id: '123',
                        firstName: 'Tup',
                        lastName: 'Big',
                        email: 'bigtup@nowhere.com'
                    },
                    {
                        _id: '321',
                        firstName: 'Tup',
                        lastName: 'Lil',
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
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ getVolunteers: () => {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should run without breaking', () => {
            spyOn(instance, 'componentDidMount');
            instance.componentDidMount();
        });
    });

    describe('getDataGridContent', () => {
        it('should return filtered volunteers data', () => {
            expect(instance.getDataGridContent()).toEqual([
                {
                    key: '123',
                    firstName: 'Tup',
                    lastName: 'Big',
                    email: 'bigtup@nowhere.com'
                },
                {
                    key: '321',
                    firstName: 'Tup',
                    lastName: 'Lil',
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
