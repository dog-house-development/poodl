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
  wrapper = shallow(<Register {..._.assign({}, props)} />);
  instance = wrapper.instance();
  instance.state = state;
});

describe("onChange", () => {
  it("should update the state", () => {
    spyOn(instance, "onChange");
    const event = {
      target: {
        id: "email",
        value: "changed.email@test.test"
      }
    };
    instance.onChange(event);
    expect(instance.onChange).toHaveBeenCalled();
    expect(instance.state.email).toEqual("changed.email@test.test");
  });
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
