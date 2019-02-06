import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";

import { Login, mapStateToProps, mapDispatchToProps } from "../Login";

configure({ adapter: new Adapter() });

describe("Login tests", () => {
  let wrapper, instance;
  const setInstanceAndWrapper = (_props = {}, _state = {}) => {
    const state = _.assign(
      {},
      {
        auth: {
          isAuthenticated: false,
          loading: false
        },
        errors: {}
      },
      _state
    );
    const props = _.assign({}, { history: ["/login"] }, _props);
    wrapper = shallow(
      <Login
        {..._.assign(
          {},
          props,
          mapStateToProps(state, props),
          mapDispatchToProps(jasmine.createSpy("dispatch"))
        )}
      />
    );
    instance = wrapper.instance();
    wrapper.setState({
      email: "test@test.test",
      password: "abc123",
      errors: {}
    });
  };

  beforeEach(() => {
    setInstanceAndWrapper();
  });

  describe("componentDidMount", () => {
    it("should redirect if user is authenticated", () => {
      const authenticatedState = {
        auth: {
          isAuthenticated: true,
          loading: false
        }
      };
      setInstanceAndWrapper({}, authenticatedState);
      const newInstanceProps = _.concat(instance.props.history, "/dashboard");
      instance.componentDidMount();
      expect(instance.props.history).toEqual(newInstanceProps);
    });
  });

  describe("render", () => {
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
