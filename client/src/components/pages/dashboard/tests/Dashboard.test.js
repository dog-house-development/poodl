import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Dashboard, mapStateToProps, mapDispatchToProps } from '../Dashboard';

configure({ adapter: new Adapter() });

describe('Dashbaord tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        id: '5c52379d9be6fc0017afd46e',
                        name: 'Sandwich Man'
                    }
                },
                errors: {}
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <Dashboard
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
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        id: '5c52379d9be6fc0017afd46e',
                        name: 'Sandwich Man'
                    }
                }
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ logoutAdmin: () => {} }));
        });
    });

    describe('onLogoutClick', () => {
        it('should run without errors', () => {
            spyOn(instance, 'onLogoutClick');
            const e = {
                target: { name: 'email', value: 'Moo' },
                preventDefault: () => {}
            };
            wrapper.find('Button').simulate('click', e);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
