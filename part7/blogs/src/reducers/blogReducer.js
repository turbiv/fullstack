import blogsService from "../services/blogs"

export const createBlogs = (blog) =>{
  return{
    type: "CREATE",
    data: blog
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

const reducer = (state = [], action) =>{
  switch (action.type) {
    case "VOTE":
      return;
    case "CREATE":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
  }

  return state
};

export default reducer