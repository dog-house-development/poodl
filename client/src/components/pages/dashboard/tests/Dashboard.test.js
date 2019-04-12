import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Dashboard, mapStateToProps, mapDispatchToProps } from '../Dashboard';

configure({ adapter: new Adapter() });

describe('Dashboard tests', () => {
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
                    },
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(<Dashboard {..._.assign({}, props, mapStateToProps(state, props))} />);
        instance = wrapper.instance();
        instance.setState({ activitiesStartDate: new Date('01-14-2019') });
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
                    },
                    errors: {}
                }
            });
        });
    });
});
