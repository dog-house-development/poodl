import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { MemberCheckIn, mapStateToProps, mapDispatchToProps, pages } from '../MemberCheckIn';

configure({ adapter: new Adapter() });

describe('MemberCheckIn tests', () => {
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
        props = _.assign({}, { history: { listen: _.noop } }, _props);
        wrapper = shallow(
            <MemberCheckIn
                {..._.assign(
                    {},
                    props,
                    mapStateToProps(state, props),
                    mapDispatchToProps(jasmine.createSpy('dispatch'))
                )}
            />
        );
        instance = wrapper.instance();
        instance.state = { memberId: null, currentPage: pages.findMember };
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
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(
                JSON.stringify({ memberActions: {}, authActions: {} })
            );
        });
    });

    describe('setMemberId', () => {
        it('should set member id and current page to select activities', () => {
            instance.setMemberId('66');
            expect(instance.state).toEqual({ currentPage: pages.selectActivities, memberId: '66' });
        });
    });

    describe('getBackButtonMarkup', () => {
        it('should not return markup if current page is find member or member sign up', () => {
            instance.setState({ currentPage: pages.findMember });
            expect(instance.getBackButtonMarkup()).toBeUndefined();
            instance.setState({ currentPage: pages.memberSignUp });
            expect(instance.getBackButtonMarkup()).toBeUndefined();
        });

        it('should return back button markup', () => {
            instance.setState({ currentPage: pages.selectActivities });
            expect(instance.getBackButtonMarkup()).toMatchSnapshot();
        });
    });

    describe('onNextClick', () => {
        it('should go to find member page if on finished page', () => {
            instance.setState({ currentPage: pages.finished });
            instance.onNextClick();
            expect(instance.state.currentPage).toEqual(pages.findMember);
        });

        it('should go to next page if not on finished page', () => {
            instance.setState({ currentPage: pages.selectActivities });
            instance.onNextClick();
            expect(instance.state.currentPage).toEqual(pages.finished);
        });
    });

    describe('getNextButtonMarkup', () => {
        it('should not return markup if current page is find member or member sign up', () => {
            instance.setState({ currentPage: pages.findMember });
            expect(instance.getNextButtonMarkup()).toBeUndefined();
            instance.setState({ currentPage: pages.memberSignUp });
            expect(instance.getNextButtonMarkup()).toBeUndefined();
        });

        it('should return next button markup', () => {
            instance.setState({ currentPage: pages.selectActivities });
            expect(instance.getNextButtonMarkup()).toMatchSnapshot();
        });
    });

    describe('onSignUpClick', () => {
        it('should set current page to member sign up', () => {
            instance.onSignUpClick();
            expect(instance.state).toEqual({ currentPage: pages.memberSignUp, memberId: null });
        });
    });

    describe('onSignUpSuccess', () => {
        it('should set memberId and change page to find member', () => {
            instance.onSignUpSuccess('123');
            expect(instance.state).toEqual({ memberId: '123', currentPage: pages.findMember });
        });
    });

    describe('getPageMarkup', () => {
        it('should return memberSignUpMarkup', () => {
            instance.setState({ currentPage: pages.memberSignUp });
            expect(instance.getPageMarkup()).toMatchSnapshot();
        });

        it('should return findMember', () => {
            instance.setState({ currentPage: pages.findMember });
            expect(instance.getPageMarkup()).toMatchSnapshot();
        });

        it('should return selectActivities', () => {
            instance.setState({ currentPage: pages.selectActivities });
            expect(instance.getPageMarkup()).toMatchSnapshot();
        });

        it('should return finished', () => {
            instance.setState({ currentPage: pages.finished });
            expect(instance.getPageMarkup()).toMatchSnapshot();
        });

        it('should return you are lost', () => {
            instance.setState({ currentPage: {} });
            expect(instance.getPageMarkup()).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
