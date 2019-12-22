import blogApi from "../services/blogs";

export const setUser = (user) =>{
  return async dispatch =>{
    blogApi.setToken(user.token);
    dispatch({
      type: "SET_USER",
      data: user
    })
  }
};

export const removeUser = () =>{
  return async dispatch =>{
    blogApi.setToken("");
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "REMOVE_USER",
      data: ""
    })
  }
};

const reducer = (state = null, action) =>{
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "REMOVE_USER":
      return null;
    default:
  }

  return state
};

export default reducer