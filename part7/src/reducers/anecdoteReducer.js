export const createAnecdote = (anecdote) =>{
  return{
    type: "CREATE",
    data: anecdote
  }
};

const reducer = (state = [], action) =>{
  switch (action.type) {
    case "VOTE":
      return;
    case "CREATE":
      return [...state, action.data];
    default:
  }

  return state
};

export default reducer