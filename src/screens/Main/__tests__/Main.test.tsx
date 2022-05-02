import React from "react";
import { Main } from "../Main";
import { render } from "../../../context/Main.test-utils";
import { fireEvent, cleanup, act } from "@testing-library/react-native";

const MainComponent = () => {
  return <Main />;
};

describe("<TaskComponent />", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const container = render(<MainComponent />);
    expect(container).toMatchSnapshot();
  });
  it("Should not match the snashot for the input value", () => {
    const testText = "Testing input Value";
    const { getByPlaceholderText } = render(<MainComponent />);
    const inputComp = getByPlaceholderText("Enter new task");
    expect(inputComp.props.value).toEqual("");
    fireEvent.changeText(inputComp, testText);
    expect(inputComp.props.value).toEqual(testText);
  });
  it("Should add a new Task", () => {
    const { getByTestId, getByText, getByPlaceholderText } =
      render(<MainComponent />);
    const newTaskTest = "testing new Task";
    const inputComp = getByPlaceholderText("Enter new task");
    fireEvent.changeText(inputComp, newTaskTest);
    const addTask = getByTestId("addTask");
    fireEvent.press(addTask);
    const newTask = getByText(newTaskTest);
    expect(newTask).toBeTruthy();
  });
});
