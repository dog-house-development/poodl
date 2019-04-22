import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { AddActivity, mapStateToProps, mapDispatchToProps } from '../AddActivity';

// // Return a fixed timestamp when moment().format() is called
// jest.mock('moment', () => () => ({
//     startOf: () => '2018–04–22T12:34:56+00:00',
//     get: () => {},
//     isAfter: () => true,
//     clone: () => {
//         return {
//             endOf: () => {
//                 return {
//                     endOf: () => {}
//                 };
//             }
//         };
//     }
// }));

configure({ adapter: new Adapter() });

describe('Add activity tests', () => {
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
                activities: {
                    errors: {}
                }
            },
            _state
        );
        wrapper = shallow(
            <AddActivity
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
            name: 'Test',
            description: 'test description',
            date: '1111-11-11T11:11:11',
            startTime: '1111-11-11T11:11:11',
            endTime: '1111-11-11T12:11:11',
            errors: { description: 'Description is required' }
        });
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
