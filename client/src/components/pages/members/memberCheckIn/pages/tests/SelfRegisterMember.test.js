import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { SelfRegisterMember, mapStateToProps, mapDispatchToProps } from '../SelfRegisterMember';

configure({ adapter: new Adapter() });

describe('SelfRegisterMember tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                members: {
                    errors: {},
                    loading: false
                },
                auth: {
                    admin: {
                        seniorCenterId: '34543'
                    }
                }
            },
            _state
        );
        props = _.assign({}, {}, _props);
        wrapper = shallow(
            <SelfRegisterMember
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
                loading: false,
                errors: {},
                adminSeniorCenterId: '34543'
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ memberActions: {} }));
        });
    });

    describe('handleChange', () => {
        it('should set the state to the id and the value', () => {
            instance.handleChange({ target: { id: 'name', value: 'Sam' } });
            expect(instance.state).toEqual({ name: 'Sam', seniorCenterId: '34543' });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
