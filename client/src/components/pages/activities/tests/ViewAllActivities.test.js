import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ViewAllActivities, mapStateToProps, mapDispatchToProps } from '../ViewAllActivities';

configure({ adapter: new Adapter() });

describe('View all activities tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                activities: {
                    loading: false,
                    all: [
                        {
                            _id: '1',
                            name: 'Fun',
                            startDate: '1970-01-01T07:00:00.000Z',
                            endDate: '1970-01-01T07:00:00.000Z'
                        },
                        {
                            _id: '2',
                            name: 'Stuff',
                            startDate: '1970-01-01T07:00:00.000Z',
                            endDate: '1970-01-01T07:00:00.000Z'
                        }
                    ],
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <ViewAllActivities
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

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
