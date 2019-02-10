import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Button from "../Button";

configure({ adapter: new Adapter() });

describe("Button tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = (_props = {}) => {
    const props = _.assign(
      {},
      {
        onClick: () => {},
        size: "medium",
        kind: "primary",
        content: "Press me",
        type: "normal"
      },
      _props
    );
    wrapper = shallow(<Button {..._.assign({}, props)} />);
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
