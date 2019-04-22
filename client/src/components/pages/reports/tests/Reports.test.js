import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Reports, mapStateToProps, mapDispatchToProps } from '../Reports';
import TestData from './testData/ReportsTestData';

// Return a fixed timestamp when moment().format() is called
jest.mock('moment', () => () => ({
    format: () => '2018–04–22T12:34:56+00:00',
    isBefore: () => true,
    isAfter: () => true,
    clone: () => {
        return {
            endOf: () => {
                return {
                    endOf: () => {}
                };
            }
        };
    }
}));

configure({ adapter: new Adapter() });

describe('Reports tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign({}, TestData, _state);
        wrapper = shallow(
            <Reports
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

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
