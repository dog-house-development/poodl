import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import { PrivateRoute } from "../PrivateRoute";

configure({ adapter: new Adapter() });

let props, wrapper, instance;
beforeEach(() => {
  props = {
    auth: {
      isAuthenticated: true,
      loading: false,
      user: {
        exp: 1580940830,
        iat: 1549383904,
        id: "5c52379d9be6fc0017afd46e",
        name: "Sandwich Man"
      }
    }
  };
  wrapper = shallow(<PrivateRoute {..._.assign({}, props)} />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
