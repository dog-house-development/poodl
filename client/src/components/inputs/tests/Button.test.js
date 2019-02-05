import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Button from "../Button";

configure({ adapter: new Adapter() });

let props, wrapper, instance;
beforeEach(() => {
  props = {
    onClick: () => {},
    size: "medium",
    kind: "primary",
    content: "Press me",
    type: "normal"
  };
  wrapper = shallow(<Button {..._.assign({}, props)} />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
