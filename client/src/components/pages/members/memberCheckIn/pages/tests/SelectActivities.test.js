import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { SelectActivities, mapStateToProps, mapDispatchToProps } from '../SelectActivities';

configure({ adapter: new Adapter() });

describe('SelectActivities tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    admin: {
                        accessLevel: 'Admin'
                    }
                },
                members: {
                    all: { 123: { firstName: 'Sam', _id: '123' } },
                    errors: {},
                    loading: false
                },
                activities: {
                    all: { 321: { name: 'Yoga', _id: '321' } },
                    errors: {},
                    loading: false
                }
            },
            _state
        );
        props = _.assign({}, { memberId: '123' }, _props);
        wrapper = shallow(
            <SelectActivities
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
            expect(mapStateToProps(state, props)).toMatchSnapshot();
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(mapDispatchToProps(dispatch)).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
