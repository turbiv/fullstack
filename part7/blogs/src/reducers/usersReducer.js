import usersService from "../services/users"

export const initializeUsers = (blog) =>{
  return async dispatch =>{
    const content = await usersService.getAll();
    dispatch({
      type: "INITIALIZE",
      data: content
    })
  }
};

const reducer = (state = [], action) =>{
  switch (action.type) {
    case "INITIALIZE":
      return action.data;
    default:
  }

  return state
};

export default reducer