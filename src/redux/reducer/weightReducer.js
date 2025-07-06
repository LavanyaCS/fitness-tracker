import { GET_WEIGHTLOGS, ADD_WEIGHTLOGS ,EDIT_WEIGHTLOGS,DELETE_WEIGHTLOGS } from '../action';
// Initial state for the weightklogs
const initialState = {
  weightlogs: [],
};

const weightlogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WEIGHTLOGS':
      return { ...state, weightlogs: action.payload };

    case 'ADD_WEIGHTLOGS':
      return { ...state, weightlogs: [...state.weightlogs, action.payload] };

    case 'EDIT_WEIGHTLOGS':
      return {
        ...state,
        weightlogs: state.weightlogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
      };

    case 'DELETE_WEIGHTLOGS':
      return {
        ...state,
        weightlogs: state.weightlogs.filter((log) => log.id !== action.payload),
      };

    default:
      return state;
  }
};

export default weightlogsReducer;

