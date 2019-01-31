import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button";

it("renders without crashing", () => {
  const props = {
    content: "Press me",
    onClick: () => {}
  };
  const div = document.createElement("div");
  ReactDOM.render(<Button {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
