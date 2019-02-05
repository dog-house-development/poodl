import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Form from "../Form";

configure({ adapter: new Adapter() });

let props, wrapper, instance;
beforeEach(() => {
  props = {
    onSubmit: () => {},
    fields: [
      {
        onChange: () => {},
        value: "",
        error: {},
        id: "email",
        type: "email",
        label: "Email:",
        placeholder: "Enter email..."
      }
    ],
    noValidate: false,
    buttonLabel: "Submit"
  };
  wrapper = shallow(<Form {..._.assign({}, props)} />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
