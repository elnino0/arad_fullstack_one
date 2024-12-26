
// Reducer
const initialState = {
  users: [],
  movies: [],
  sunscriptions: [],
  roles: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case 'ADD_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };
    
    
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case 'DELETE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    case 'DELETE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.filter((subscription) => subscription._id !== action.payload),
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
      };
    case 'UPDATE_MOVIE':
      return {
        ...state,
        movies: state.movies.map((movie) => (movie._id === action.payload._id ? action.payload : movie)),
      };
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map((subscription) => (subscription._id === action.payload._id ? action.payload : subscription)),
      };    

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: action.payload,
      };
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.payload,
      };
    
    default:
      return state;
    
    
    
  }
}


export default reducer;