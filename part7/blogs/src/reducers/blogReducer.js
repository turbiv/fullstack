import blogsService from "../services/blogs"

export const createBlogs = (blog) =>{
  return async dispatch =>{
    const content = await blogsService.postBlog(blog.url, blog.author, blog.title);
    dispatch({
      type: "CREATE",
      data: content
    })
  }
};

export const likeBlogs = (id, likes) =>{
  return async dispatch =>{
    const content = await blogsService.putBlogLike(id, likes + 1);
    dispatch({
      type: "LIKE",
      data: content
    })
  }
};

export const initializeBlogs = () =>{
  return async dispatch =>{
    const content = await blogsService.getAll();
    dispatch({
      type: "INIT",
      data: content
    })
  }
};

export const deleteBlogs = (id) =>{
  return async dispatch =>{
    await blogsService.deleteBlog(id);
    dispatch({
      type: "DELETE",
      data: { id }
    })
  };
};

const reducer = (state = [], action) =>{
  console.log("action data: " , action.data);
  console.log("action type:" , action.type);
  console.log("state data before: ", state);

  switch (action.type) {
    case "LIKE":
      const updateLikes = state.map(item => item._id !== action.data._id ? item : null)
        .filter(x => x !== null);
      return [...updateLikes, action.data];
    case "CREATE":
      return [...state, action.data];
    case "INIT":
      return action.data;
    case "DELETE":
      return state.map(blog => blog._id !== action.data.id ? blog : null)
        .filter(x => x !== null);
    default:
  }

  console.log("default state: ", state);
  return state
};

export default reducer