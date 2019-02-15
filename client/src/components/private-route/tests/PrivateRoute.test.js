import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { PrivateRoute, mapStateToProps } from '../PrivateRoute';

configure({ adapter: new Adapter() });

describe('PrivateRoute tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        const props = _.assign({}, _props);
        const state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        id: '5c52379d9be6fc0017afd46e',
                        name: 'Sandwich Man'
                    }
                }
            },
            _state
        );
        wrapper = shallow(<PrivateRoute {..._.assign({}, props, mapStateToProps(state, props))} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render redirect if isAuthenticated is false', () => {
            setInstanceAndWrapper({}, { auth: { isAuthenticated: false } });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render the component if isAuthenticated is true', () => {
            setInstanceAndWrapper({}, { auth: { isAuthenticated: true } });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
