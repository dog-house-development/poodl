import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import Field from "../Field";

configure({ adapter: new Adapter() });

describe("Field tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = (_props = {}) => {
    const props = _.assign(
      {},
      {
        onChange: () => {},
        name: "email",
        id: "email",
        type: "email",
        size: "normal",
        content: "",
        placeholder: "Enter email...",
        label: "Email:",
        error: {}
      },
      _props
    );
    wrapper = shallow(<Field {..._.assign({}, props)} />);
    instance = wrapper.instance();
    instance.setState({ value: "" });
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
