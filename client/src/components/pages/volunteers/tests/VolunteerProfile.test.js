import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { VolunteerProfile, mapStateToProps, mapDispatchToProps } from '../VolunteerProfile';

configure({ adapter: new Adapter() });

const match = {
    params: {
        _id: '123' //any id you want to set
    }
};
describe('VolunteerProfile tests', () => {
    global.scrollTo = jest.fn();
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                volunteers: {
                    all: {
                        123: {
                            _id: '123',
                            firstName: 'Big',
                            lastName: 'Tup',
                            email: 'bigtup@nowhere.com'
                        }
                    },
                    errors: {}
                }
            },
            _state
        );
        props = _.assign({}, { match: { params: { id: 123 } } }, _props);
        wrapper = shallow(
            <VolunteerProfile
                match={match}
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
                volunteer: {
                    _id: '123',
                    firstName: 'Big',
                    lastName: 'Tup',
                    email: 'bigtup@nowhere.com'
                },
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ volunteerActions: {} }));
        });
    });
    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
