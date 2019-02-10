import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Landing from "../Landing";

configure({ adapter: new Adapter() });

describe("Landing tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = () => {
    wrapper = shallow(<Landing />);
    instance = wrapper.instance();
  };
  beforeEach(() => {
    setInstanceAndWrapper();
  });

  describe("render", () => {
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
