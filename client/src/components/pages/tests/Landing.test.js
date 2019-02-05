import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Landing from "../Landing";

configure({ adapter: new Adapter() });

let wrapper, instance;
beforeEach(() => {
  wrapper = shallow(<Landing />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
