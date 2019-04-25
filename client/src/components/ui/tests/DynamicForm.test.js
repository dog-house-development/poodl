import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lodash';

import DynamicForm from './../DynamicForm';

configure({ adapter: new Adapter() });

describe('DynamicForm tests', () => {
    const testInputs = [
        {
            id: 'testGroup',
            label: 'Test Group',
            description: 'Test description',
            kind: 'group',
            inputs: [
                {
                    id: 'testFlex',
                    kind: 'flex',
                    inputs: [
                        {
                            id: 'test1',
                            kind: 'field',
                            type: 'text',
                            label: 'First name',
                            editable: false
                        },
                        {
                            id: 'lastName',
                            kind: 'field',
                            type: 'text',
                            label: 'Last name'
                        }
                    ]
                },
                {
                    id: 'test0',
                    kind: 'datePicker',
                    label: 'Date of Birth'
                },
                {
                    id: 'test1',
                    kind: 'combobox',
                    label: 'Date of Birth'
                },
                {
                    id: 'test2',
                    kind: 'checkbox',
                    label: 'Date of Birth'
                },
                {
                    id: 'test3',
                    kind: 'multiCheckbox',
                    label: 'Date of Birth'
                },
                {
                    id: 'test4',
                    kind: 'timePicker',
                    label: 'Date of Birth'
                },
                {
                    id: 'test5',
                    kind: 'select',
                    label: 'Date of Birth',
                    options: ['test1', 'test2']
                },
                {
                    id: 'test6',
                    kind: 'radio',
                    label: 'Date of Birth'
                },
                {
                    id: 'test7',
                    kind: 'selectBoolean',
                    label: 'Date of Birth'
                }
            ]
        },
        {
            id: 'testGroup2',
            kind: 'group',
            inputs: [
                {
                    id: 'test',
                    kind: 'field'
                }
            ]
        }
    ];

    let wrapper, instance;
    const setInstanceAndWrapper = (_props = {}) => {
        const props = _.assign(
            {},
            {
                inputs: testInputs,
                loading: false,
                submitButtonLabel: 'Submit Button',
                data: {
                    test1: ['help', 'me']
                },
                errorDescription: 'So many errors'
            },
            _props
        );
        wrapper = shallow(<DynamicForm {..._.assign({}, props)} />);
        instance = wrapper.instance();
    };

    beforeEach(() => {
        setInstanceAndWrapper();
    });

    describe('render', () => {
        it('should render', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render as editable', () => {
            setInstanceAndWrapper({ editable: true });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with loading', () => {
            setInstanceAndWrapper({ loading: true, editable: true });
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with errors', () => {
            instance.setState({ hasErrors: true });
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleEditClick', () => {
        it('should click edit', () => {
            setInstanceAndWrapper({ editable: true });
            expect(wrapper.find('Button').length).toEqual(2);
            wrapper
                .find('Button')
                .first()
                .simulate('click', {
                    target: {
                        id: testInputs[0].id
                    }
                });
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleDoneClick', () => {
        it('should change present state to true', () => {
            setInstanceAndWrapper({ editable: true });
            instance.setState({ present: { ...instance.state.present, [testInputs[0].id]: false } });
            expect(wrapper.find('Button').at(1)).toMatchSnapshot();
            expect(wrapper.find('Button').length).toEqual(3);
            wrapper
                .find('Button')
                .at(1)
                .simulate('click', {
                    target: {
                        name: 'testGroup'
                    },
                    persist: jest.fn()
                });
            expect(wrapper).toMatchSnapshot();
        });

        it('should call editValues', () => {
            const editValues = jest.fn((modifiedInputs, onSuccess) => {
                onSuccess();
            });
            setInstanceAndWrapper({ editable: true, editValues: editValues });
            instance.setState({
                present: { ...instance.state.present, [testInputs[0].id]: false },
                modifiedInputs: { something: 'not empty' }
            });
            expect(wrapper.find('Button').at(1)).toMatchSnapshot();
            expect(wrapper.find('Button').length).toEqual(3);
            wrapper
                .find('Button')
                .at(1)
                .simulate('click', {
                    target: {
                        name: 'testGroup'
                    },
                    persist: jest.fn()
                });
            expect(wrapper).toMatchSnapshot();
            expect(editValues).toBeCalled();
            expect(instance.state.modifiedInputs).toEqual({});
        });
    });

    describe('handleCancelClick', () => {
        it('should click cancel', () => {
            setInstanceAndWrapper({ editable: true });
            instance.setState({ present: { ...instance.state.present, [testInputs[0].id]: false } });
            expect(wrapper.find('Button').at(0)).toMatchSnapshot();
            expect(wrapper.find('Button').length).toEqual(3);
            wrapper
                .find('Button')
                .at(0)
                .simulate('click', {
                    target: {
                        name: 'testGroup'
                    }
                });
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('componentDidUpdate', () => {
        it('should set hasErrors to true', () => {
            setInstanceAndWrapper({ errors: { error: 'testerror' } });
            expect(instance.state.hasErrors).toEqual(false);
            instance.componentDidUpdate({ errors: { error: 'different error' } });
            expect(instance.state.hasErrors).toEqual(true);
        });

        it('should set hasErrors to false', () => {
            setInstanceAndWrapper({ errors: {} });
            instance.setState({ hasErrors: true });
            expect(instance.state.hasErrors).toEqual(true);
            instance.componentDidUpdate({ errors: { error: 'different error' } });
            expect(instance.state.hasErrors).toEqual(false);
        });
    });

    describe('handleInputChange', () => {
        it('should remove value from modifiedInputs', () => {
            instance.setState({ modifiedInputs: { test1: 'not test' } });
            setInstanceAndWrapper({ values: { test1: 'test' } });
            const e = {
                target: {
                    id: 'test1',
                    value: 'test'
                }
            };
            wrapper
                .find('Field')
                .first()
                .simulate('change', e);
            expect(instance.state.modifiedInputs).toEqual({});
        });

        it('should change value in modifiedInputs', () => {
            const e = {
                target: {
                    id: 'test1',
                    value: 'test'
                }
            };
            wrapper
                .find('Field')
                .first()
                .simulate('change', e);

            expect(instance.state.modifiedInputs).toEqual({ test1: 'test' });
        });
    });

    describe('handleSubmit', () => {
        it('should call this.props.onSubmit', () => {
            const onSubmit = jest.fn();
            setInstanceAndWrapper({ onSubmit: onSubmit });
            const e = {
                preventDefault: jest.fn()
            };
            wrapper.find('form').simulate('submit', e);
            expect(onSubmit).toBeCalled();
        });
    });
});
