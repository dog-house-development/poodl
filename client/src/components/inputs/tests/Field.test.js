import React from "react";
import ReactDOM from "react-dom";
import Field from "../Field";

it("renders without crashing", () => {
  const props = {
    onChange: () => {},
    id: "name"
  };
  const div = document.createElement("div");
  ReactDOM.render(<Field {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
