import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Form from '../Form';

configure({ adapter: new Adapter() });

describe('Form tests', () => {
    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                onSubmit: jasmine.createSpy('onSubmit'),
                fields: [
                    {
                        onChange: () => {},
                        value: '',
                        error: {},
                        id: 'email',
                        type: 'email',
                        label: 'Email:',
                        placeholder: 'Enter email...'
                    }
                ],
                noValidate: false,
                buttonLabel: 'Submit'
            },
            _props
        );
        wrapper = shallow(<Form {..._.assign({}, props)} />);
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
