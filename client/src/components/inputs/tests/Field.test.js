import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Field from "../Field";

configure({ adapter: new Adapter() });

let state, props, wrapper, instance;
beforeEach(() => {
  state = {
    value: ""
  };
  props = {
    onChange: () => {},
    name: "email",
    id: "email",
    type: "email",
    size: "normal",
    content: "",
    placeholder: "Enter email...",
    label: "Email:",
    error: {}
  };
  wrapper = shallow(<Field {..._.assign({}, props)} />);
  instance = wrapper.instance();
  instance.state = state;
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
