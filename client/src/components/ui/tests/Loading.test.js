import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Loading from '../Loading';

configure({ adapter: new Adapter() });

describe('Loading tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                size: 'medium',
                kind: 'primary'
            },
            _props
        );
        wrapper = shallow(<Loading {..._.assign({}, props)} />);
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
