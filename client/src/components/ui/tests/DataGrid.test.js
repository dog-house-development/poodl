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
