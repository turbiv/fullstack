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

export const likeBlogs = (id) =>{
  return{
    type: "LIKE",
    data: id
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
      //TODO NEXT
      return;
    case "CREATE":
      const newblogs = [...state, action.data];
      return newblogs.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
    case "INIT":
      return action.data.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
    case "DELETE":
      console.log(state.map(blog => blog._id !== action.data.id ? blog : null).filter(x => x !== null));
      return state.map(blog => blog._id !== action.data.id ? blog : null)
        .filter(x => x !== null)
        .sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
    default:
  }

  console.log("default state: ", state);
  return state
};

export default reducer