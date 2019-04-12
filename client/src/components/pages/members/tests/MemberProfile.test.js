import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { MemberProfile, mapStateToProps, mapDispatchToProps } from '../MemberProfile';

configure({ adapter: new Adapter() });

const match = {
    params: {
        _id: '123' //any id you want to set
    }
};
describe('MemberProfile tests', () => {
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
                },
                services: {
                    all: {
                        123: { memberId: '123' },
                        321: { memberId: '444' }
                    }
                }
            },
            _state
        );
        props = _.assign({}, { match: { params: { id: '123' } } }, _props);
        wrapper = shallow(
            <MemberProfile
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
                member: {
                    _id: '123',
                    firstName: 'Big',
                    lastName: 'Tup',
                    membershipDate: '02/20/2020',
                    email: 'bigtup@nowhere.com'
                },
                loading: false,
                errors: {},
                serviceCount: 1
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(
                JSON.stringify({ memberActions: {}, serviceActions: {} })
            );
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
