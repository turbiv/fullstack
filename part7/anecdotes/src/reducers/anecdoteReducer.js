export const createAnecdote = (anecdote) =>{
  return{
    type: "CREATE",
    data: anecdote
  }
};

export const voteAnecdote = (id) =>{
  return{
    type: "VOTE",
    data: id
  }
};

const reducer = (state = [], action) =>{
  switch (action.type) {
    case "VOTE":
      const anecdote = state.find(a => a.id === action.data.id);
      const voted = {
        ...anecdote,
        votes: state.votes + 1
      };
      return state.map(a => a.id === action.data.id ? voted : a);
    case "CREATE":
      return [...state, action.data];
    default:
  }

  return state
};

export default reducer