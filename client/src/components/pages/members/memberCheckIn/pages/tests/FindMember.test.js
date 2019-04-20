import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { FindMember, mapStateToProps, mapDispatchToProps } from '../FindMember';

configure({ adapter: new Adapter() });

describe('FindMember tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                members: {
                    all: {
                        123: {
                            _id: '123',
                            firstName: 'Big',
                            lastName: 'Tup',
                            membershipDate: '02/20/2020',
                            email: 'bigtup@nowhere.com'
                        }
                    },
                    errors: {},
                    loading: false
                }
            },
            _state
        );
        props = _.assign({}, { setMemberId: _.noop }, _props);
        wrapper = shallow(
            <FindMember
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
                members: {
                    123: {
                        _id: '123',
                        firstName: 'Big',
                        lastName: 'Tup',
                        membershipDate: '02/20/2020',
                        email: 'bigtup@nowhere.com'
                    }
                },
                loading: false,
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ memberActions: {} }));
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
