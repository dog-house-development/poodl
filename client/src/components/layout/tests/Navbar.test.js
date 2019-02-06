import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Navbar from "../Navbar";

configure({ adapter: new Adapter() });

describe("Navbar tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = (_props = {}) => {
    const props = _.assign(
      {},
      {
        content: "Press me",
        onClick: () => {}
      },
      _props
    );
    wrapper = shallow(<Navbar {...props} />);
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
