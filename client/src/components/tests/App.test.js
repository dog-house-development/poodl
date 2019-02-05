import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import App from "../App";

configure({ adapter: new Adapter() });

let wrapper, instance;
beforeEach(() => {
  wrapper = shallow(<App />);
  instance = wrapper.instance();
});

describe("render", () => {
  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
