import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Navbar from "../Navbar";

configure({ adapter: new Adapter() });

describe("Navbar", () => {
  let props, wrapper, instance;
  beforeEach(() => {
    props = {
      content: "Press me",
      onClick: () => {}
    };
    wrapper = shallow(<Navbar {...props} />);
    instance = wrapper.instance();
  });

  it("should render correctly", () => {
    expect(instance).toMatchSnapshot();
  });
});
