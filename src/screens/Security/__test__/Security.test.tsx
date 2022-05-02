import React from "react";
import { Security } from "../Security";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { act } from 'react-dom/test-utils';


const SecurityComponent = () => {
  return <Security />;
};

describe("<TaskComponent />", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const container = render(<SecurityComponent />);
    expect(container).toMatchSnapshot();
  });
});
