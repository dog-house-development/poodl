import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import Form from '../Form';
import Field from '../Field';

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

    describe('getFieldsMarkup', () => {
        it('should return correct fields markup', () => {
            const fieldsMarkup = [
                JSON.parse(
                    JSON.stringify(
                        <Field
                            key="email"
                            id="email"
                            type="email"
                            name={undefined}
                            label="Email:"
                            placeholder="Enter email..."
                            onChange={() => {}}
                            error={{}}
                        />
                    )
                )
            ];
            expect(JSON.parse(JSON.stringify(instance.getFieldsMarkup()))).toEqual(fieldsMarkup);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
