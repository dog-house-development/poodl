import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { ViewAdmins, mapStateToProps, mapDispatchToProps } from '../ViewAdmins';

configure({ adapter: new Adapter() });

describe('ViewAdmins tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}, _state = {}) => {
        const state = _.assign(
            {},
            {
                admins: {
                    loading: false,
                    all: {
                        data: [
                            {
                                _id: '123',
                                name: 'Big Tup',
                                email: 'bigtup@nowhere.com'
                            },
                            {
                                _id: '321',
                                name: 'Lil Tup',
                                email: 'liltup@nowhere.com'
                            }
                        ]
                    }
                },
                errors: {}
            },
            _state
        );
        const props = _.assign({}, _props);
        wrapper = shallow(
            <ViewAdmins
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

    describe('getDataGridContent', () => {
        it('should return filtered admins data', () => {
            spyOn(instance, 'getDataGridContent');
            instance.getDataGridContent();
            expect(instance.getDataGridContent()).toBe([
                { name: 'Big Tup', email: 'bigtup@nowhere.com', key: 123 },
                { name: 'Lil Tup', email: 'liltup@nowhere.com', key: 321 }
            ]);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
