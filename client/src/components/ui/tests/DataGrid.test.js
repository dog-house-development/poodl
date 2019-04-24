import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import { DataGrid } from '../DataGrid';

configure({ adapter: new Adapter() });

describe('DataGrid tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                data: [
                    { name: 'Dong Nong', email: 'dongnong@nowhere.com', key: '123' },
                    { name: 'Juck Gruck', email: 'juckgruck@nowhere.com', key: '321' }
                ],
                loading: false,
                location: { search: {} }
            },
            _props
        );
        wrapper = shallow(<DataGrid {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('componentDidUpdate', () => {
        it('should set filteredData to props data if it is next', () => {
            setInstanceAndWrapper({ data: [{ name: 'Dong Nong', email: 'dongnong@nowhere.com', key: '123' }] });
            instance.componentDidUpdate({ data: { name: 'Dang Nang', email: 'dangnang@nowhere.com', key: '123' } });
            expect(instance.state.filteredData).toEqual([
                {
                    name: 'Dong Nong',
                    email: 'dongnong@nowhere.com',
                    key: '123'
                }
            ]);
        });
    });

    describe('getSortedData', () => {
        it('should set filteredData to props data if it is next', () => {
            expect(instance.state.filterValue).toEqual('');
            instance.setState({ filterValue: 'Dong' });
            instance.getSortedData();
            expect(instance.getSortedData()).toEqual([
                {
                    name: 'Dong Nong',
                    email: 'dongnong@nowhere.com',
                    key: '123'
                }
            ]);
        });
    });

    describe('handleFilterChange', () => {
        it('should handle change to filter', () => {
            expect(wrapper.find('Field').at(0)).toMatchSnapshot();
            const e = {
                target: {
                    id: 'FilterValue',
                    value: 'test'
                }
            };
            wrapper
                .find('Field')
                .first()
                .simulate('change', e);
            expect(instance.state.filterValue).toEqual('test');
        });
    });
    describe('getFilterMarkup', () => {
        it('should return filter field', () => {
            setInstanceAndWrapper({ includeFilterControls: true });
            instance.getFilterMarkup();
            expect(instance.getFilterMarkup()).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render loading', () => {
            setInstanceAndWrapper({ loading: true });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render data', () => {
            setInstanceAndWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
