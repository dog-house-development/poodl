import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { Register, mapStateToProps, mapDispatchToProps } from '../Register';

configure({ adapter: new Adapter() });

describe('Register tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        const state = _.assign(
            {},
            {
                auth: {
                    isAuthenticated: false,
                    loading: false
                },
                errors: {}
            },
            _state
        );
        const props = _.assign({}, { history: ['/register'] }, _props);
        wrapper = shallow(
            <Register
                {..._.assign(
                    {},
                    props,
                    mapStateToProps(state, props),
                    mapDispatchToProps(jasmine.createSpy('dispatch'))
                )}
            />
        );
        instance = wrapper.instance();
        wrapper.setState({
            name: 'Sam',
            email: 'sam@test.com',
            password: 'abc123',
            password2: 'abc123',
            errors: {}
        });
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('componentDidMount', () => {
        it('should redirect if admin is authenticated', () => {
            const authenticatedState = {
                auth: {
                    isAuthenticated: true,
                    loading: false
                }
            };
            setInstanceAndWrapper({}, authenticatedState);
            const newInstanceProps = instance.props.history.concat('/dashboard');
            instance.componentDidMount();
            expect(instance.props.history).toEqual(newInstanceProps);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
