import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { AdminProfile, mapStateToProps, mapDispatchToProps } from '../AdminProfile';

configure({ adapter: new Adapter() });

const match = {
    params: {
        _id: '123' //any id you want to set
    }
};
describe('AdminProfile tests', () => {
    let state, props, wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        state = _.assign(
            {},
            {
                auth: {
                    admin: {
                        superAdmin: true
                    }
                },
                admins: {
                    one: [
                        {
                            _id: '123',
                            firstName: 'Moose',
                            lastName: 'Man',
                            email: 'mooseman@nowhere.com',
                            superAdmin: true
                        }
                    ]
                },
                errors: {}
            },
            _state
        );
        props = _.assign({}, _props);
        wrapper = shallow(
            <AdminProfile
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
                admin: [
                    {
                        _id: '123',
                        firstName: 'Moose',
                        lastName: 'Man',
                        email: 'mooseman@nowhere.com',
                        superAdmin: true
                    }
                ],
                currentAdminIsSuper: true,
                errors: {}
            });
        });
    });

    describe('mapDispatchToProps', () => {
        it('should map dispatch to props', () => {
            const dispatch = jest.fn();
            expect(JSON.stringify(mapDispatchToProps(dispatch))).toEqual(JSON.stringify({ getAdmin: () => {} }));
        });
    });

    describe('componentDidMount', () => {
        it('should run without breaking', () => {
            spyOn(instance, 'componentDidMount');
            instance.componentDidMount();
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
