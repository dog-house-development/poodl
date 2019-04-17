import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Navbar, mapStateToProps, mapDispatchToProps } from '../Navbar';

configure({ adapter: new Adapter() });

describe('Navbar tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        props = _.assign(
            {},
            {
                content: 'Press me',
                location: { pathname: '/' },
                onClick: () => {}
            },
            _props
        );
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false,
                    errors: {}
                }
            },
            _state
        );
        wrapper = shallow(
            <Navbar
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
                auth: { isAuthenticated: false, loading: false, errors: {} }
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ authActions: {} }));
        });
    });

    describe('updateWidth', () => {
        it('should set skinny to false if window is large and skinny is true', () => {
            window.innerWidth = 701;
            instance.setState({ skinny: true });
            spyOn(instance, 'setState');
            instance.updateWidth();
            expect(instance.setState).toHaveBeenCalledWith({ skinny: false });
        });
    });

    describe('getSkinnyHeaderMarkup', () => {
        it('should return skinny header markup', () => {
            expect(instance.getSkinnyHeaderMarkup()).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render links for logged in admins', () => {
            setInstanceAndWrapper(
                {},
                { auth: { isAuthenticated: true, admin: { firstName: 'Frank', lastName: 'Limb' } } }
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render links for nobody logged in', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render member check-in header', () => {
            setInstanceAndWrapper({ location: { pathname: '/member-check-in' } });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render skinny header', () => {
            setInstanceAndWrapper(
                {},
                { auth: { isAuthenticated: true, admin: { firstName: 'Sam', lastName: 'Bam' } } }
            );
            instance.setState({ skinny: true });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
