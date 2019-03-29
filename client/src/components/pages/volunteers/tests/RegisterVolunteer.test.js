import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { RegisterVolunteer, mapStateToProps, mapDispatchToProps } from '../RegisterVolunteer';

configure({ adapter: new Adapter() });

describe('Register volunteer tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: true,
                    loading: false,
                    admin: {
                        superAdmin: false,
                        seniorCenter: 123,
                        firstName: 'Frog',
                        lastName: 'Anderson'
                    },
                    errors: {}
                },
                volunteers: {
                    errors: {}
                }
            },
            _state
        );
        wrapper = shallow(
            <RegisterVolunteer
                {..._.assign({}, mapStateToProps(state, props), mapDispatchToProps(jasmine.createSpy('dispatch')))}
            />
        );
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
