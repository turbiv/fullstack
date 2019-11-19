import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import SimpleBlog from '../components/SimpleBlog'
import ExpandedBlogInfo from '../components/ExpandedBlogInfo'
import '@testing-library/jest-dom/extend-expect'

test("render SimpleBlog component", () => {
  const blogData = {
    title: "TestTitle",
    author: "TestAuthor",
    likes: "TestLikes"
  };

  const component = render(
    <SimpleBlog blog={blogData}/>
  );

  expect(component.container).toHaveTextContent("TestTitle")

});

test("check like button", () => {
  const blogData = {
    title: "TestTitle",
    author: "TestAuthor",
    likes: "TestLikes"
  };

  const likeHandler = jest.fn();

  const {getByText} = render(
    <SimpleBlog blog={blogData} onClick={likeHandler}/>
  );

  const button = getByText("like");

  fireEvent.click(button);
  fireEvent.click(button);

  expect(likeHandler.mock.calls.length).toBe(2)

});

test("Verify name and author shown by default", () => {

  const blogData = {
    title: "TestingTitle",
    author: "TestingAuthor",
    url: "TestingUrl",
    likes: "TestingLikes",
    user:{
      username: "TestingUsername",
      name: "TestingName"
    },
  };

  const component = render(
    <ExpandedBlogInfo blog={blogData}>
      {blogData.title + " " + blogData.author}
    </ExpandedBlogInfo>
  );

  const div = component.container.querySelector(".DefaultBlogInfo");

  expect(div).not.toHaveStyle("display: none")

});