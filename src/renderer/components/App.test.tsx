import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "../../store";

describe("<App />", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should contain a Box component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId("box-container")).toBeInTheDocument(); // Make sure to add data-testid="box-container" to the Box component in App.tsx
  });

  it("should render VideoList", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId("video-list")).toBeInTheDocument(); // Make sure to add data-testid="video-list" to the VideoList component in its file
  });
});
