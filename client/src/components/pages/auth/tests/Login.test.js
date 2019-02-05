import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import { Login } from "../Login";

configure({ adapter: new Adapter() });

let state, props, wrapper, instance;
beforeEach(() => {
  state = {
    email: "test@test.test",
    password: "abc123",
    errors: {}
  };
  props = {
    loginUser: () => {},
    auth: {},
    errors: {}
  };
  wrapper = shallow(<Login {..._.assign({}, state, props)} />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
