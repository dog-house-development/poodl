import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import { Dashboard, mapStateToProps, mapDispatchToProps } from "../Dashboard";

configure({ adapter: new Adapter() });

describe("Dashbaord tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = (_props = {}, _state = {}) => {
    const state = _.assign(
      {},
      {
        auth: {
          isAuthenticated: true,
          loading: false,
          admin: {
            id: "5c52379d9be6fc0017afd46e",
            name: "Sandwich Man"
          }
        },
        errors: {}
      },
      _state
    );
    const props = _.assign({}, _props);
    wrapper = shallow(
      <Dashboard
        {..._.assign(
          {},
          props,
          mapStateToProps(state, props),
          mapDispatchToProps(jasmine.createSpy("dispatch"))
        )}
      />
    );
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
