import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import { Register } from "../Register";

configure({ adapter: new Adapter() });

let state, props, wrapper, instance;
beforeEach(() => {
  state = {
    name: "Sam",
    email: "sam@test.com",
    password: "abc123",
    password2: "abc123",
    errors: {}
  };
  props = {
    registerUser: () => {},
    auth: {},
    errors: {}
  };
  wrapper = shallow(<Register {..._.assign({}, state, props)} />);
  instance = wrapper.instance();
});

describe("onChange", () => {
  it("should update the state", () => {
    spyOn(instance, "onChange");
    const lastState = instance.state;
    const e = {
      target: {
        id: "email",
        value: "changed.email@test.test"
      }
    };
    instance.onChange(e);
    expect(instance.onChange).toHaveBeenCalled();
    expect(instance.state).not.toEqual(lastState);
  });
});

describe("onChange", () => {
  it("should call onChange when form is changed", () => {
    spyOn(instance, "onChange");

    expect(instance.onChange).not.toHaveBeenCalled();
  });
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
