import React from 'react'
import {render, waitForElement} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../app'
jest.mock("../services/blogs");

describe("Index test", () =>{
  test("check login form", async () =>{

    const component = render(
      <App/>
    );

    await waitForElement(() => component.getByText("Login"));

    expect(component.container).toHaveTextContent("Please login");
    expect(component.container).toHaveTextContent("Password");
    expect(component.container).toHaveTextContent("Username")
  });


  test("check blogs are rendered", async () =>{
    const component = render(
      <App/>
    );

    await waitForElement(() => component.getByText("Login"));

    const user = {
      username: "testerUser",
      token: "testerToken",
      name: "Test Name"
    };

    localStorage.setItem("loggedUser", JSON.stringify(user));

    component.rerender(<App/>);

    await waitForElement(() => component.getByText("Blogs"));

    component.debug()

  })
});