import blogsService from "../services/blogs"

export const createBlogs = (blog) =>{
  return async dispatch =>{
    const content = await blogsService.postBlog(blog.url, blog.author, blog.title); //TODO: LATEST CHANGE HERE , ERROR DUE TO THIS, ID NOT PROVIDED WHEN BLOG IS CREATED
    dispatch({
      type: "CREATE",
      data: content
    })
  }
};

export const voteBlogs = (id) =>{
  return{
    type: "VOTE",
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
  console.log("action data: " , action.data)
  console.log("state data: ", state)

  switch (action.type) {
    case "VOTE":
      return;
    case "CREATE":
      const newblogs = [...state, action.data];
      return newblogs.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
    case "INIT":
      return action.data;
    case "DELETE":
      return state.map(blog => blog._id !== action.data.id ? blog : null).filter(x => x !== null);
    default:
  }

  return state
};

export default reducer