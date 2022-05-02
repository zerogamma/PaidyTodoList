import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import ContexProvider from "./ContextProvider";

const AllTheProviders = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return <ContexProvider>{props.children}</ContexProvider>;
};

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions | undefined
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
