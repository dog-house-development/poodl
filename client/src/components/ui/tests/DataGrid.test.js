import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import DataGrid from '../DataGrid';
import Loading from '../Loading';

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
                loading: false
            },
            _props
        );
        wrapper = shallow(<DataGrid {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('getHeaderMarkup', () => {
        it('should return header markup', () => {
            const headerMarkup = (
                <tr>
                    <th key="name">Name</th>
                    <th key="email">Email</th>
                    {null}
                </tr>
            );
            expect(instance.getHeaderMarkup()).toEqual(headerMarkup);
        });
    });

    describe('getBodyMarkup', () => {
        it('should return body markup', () => {
            const bodyMarkup = [
                <tr key="123">
                    <td key="name">Dong Nong</td>
                    <td key="email">dongnong@nowhere.com</td>
                    {null}
                </tr>,
                <tr key="321">
                    <td key="name">Juck Gruck</td>
                    <td key="email">juckgruck@nowhere.com</td>
                    {null}
                </tr>
            ];
            expect(instance.getBodyMarkup()).toEqual(bodyMarkup);
        });
    });

    describe('getTableMarkup', () => {
        it('should return loading table markup', () => {
            setInstanceAndWrapper({ loading: true });
            expect(instance.getTableMarkup()).toEqual(<Loading />);
        });
        it('should return data table markup', () => {
            const tableMarkup = (
                <table>
                    <thead>
                        <tr>
                            <th key="name">Name</th>
                            <th key="email">Email</th>
                            {null}
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="123">
                            <td key="name">Dong Nong</td>
                            <td key="email">dongnong@nowhere.com</td>
                            {null}
                        </tr>
                        <tr key="321">
                            <td key="name">Juck Gruck</td>
                            <td key="email">juckgruck@nowhere.com</td>
                            {null}
                        </tr>
                    </tbody>
                </table>
            );
            expect(instance.getTableMarkup()).toEqual(tableMarkup);
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
