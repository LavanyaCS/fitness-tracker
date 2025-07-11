import { GET_GOALS, ADD_GOALS ,EDIT_GOALS,DELETE_GOALS,LOAD_GOALS } from '../action';
// Initial state for the weightklogs
const initialState = {
  goals: [],
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GOALS':
      return { ...state, goals: action.payload };

    case 'ADD_GOALS':
      return { ...state, goals: [...state.goals, action.payload] };

    case 'LOAD_GOALS':
      return { ...state, goals: action.payload};

    case 'EDIT_GOALS':
      return {
        ...state,
        goals: state.goals.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
      };

    case 'DELETE_GOALS':
      return {
        ...state,
        goals: state.goals.filter((log) => log.id !== action.payload),
      };

    default:
      return state;
  }
};

export default goalsReducer;

