import React from "react";
import { Task } from "../Task";
import { render, fireEvent , cleanup} from "@testing-library/react-native";

// Setting default Props per render.
const defaultProps = {
  todo: "test",
  position: 0,
  id: 0,
  remove: () => null,
  update: () => null,
};

const TaskComponent = (customProps: JSX.IntrinsicAttributes & taskProps) => {
  return <Task {...defaultProps} {...customProps} />;
};

describe("<TaskComponent />", () => {
  afterEach(cleanup);
  it("renders correctly", () => {
    const container = render(<TaskComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it("Should trigger Update Task data and verified that the return parameter is the same the props", () => {
    const onTriggerUpdateMock = jest.fn();
    const mockData = {todo: "update data", position:0 , id: 0}
    const { getByTestId } = render(
      <TaskComponent {...mockData} update={onTriggerUpdateMock} remove={()=>null}/>
    );
    const icon = getByTestId("updateTO");
    fireEvent.press(icon);
    expect(onTriggerUpdateMock).toHaveBeenCalled()
    expect(onTriggerUpdateMock.mock.calls[0][1]).toBe(mockData.todo)
    expect(onTriggerUpdateMock.mock.calls[0][0]).toBe(mockData.id)
  });
  it("Should trigger Remove Task data and verified that the return parameter is the same as the prop", () => {
    const onTriggerRemoveMock = jest.fn();
    const mockData = {todo: "update data", position:0 , id:0}
    const { getByTestId } = render(
      <TaskComponent {...mockData} remove={onTriggerRemoveMock} update={()=>null}/>
    );
    const icon = getByTestId("removeTO");
    fireEvent.press(icon);
    expect(onTriggerRemoveMock).toHaveBeenCalled()
    expect(onTriggerRemoveMock.mock.calls[0][0]).toBe(mockData.id)
  });
});
