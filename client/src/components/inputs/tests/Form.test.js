import React from "react";
import ReactDOM from "react-dom";
import Form from "../Form";

it("renders without crashing", () => {
  const props = {
    fields: [{ id: "name", onChange: () => {} }],
    onSubmit: () => {}
  };
  const div = document.createElement("div");
  ReactDOM.render(<Form {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
