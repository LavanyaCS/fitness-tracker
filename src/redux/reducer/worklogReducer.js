import { GET_WORKLOGS, ADD_WORKLOGS ,EDIT_WORKLOGS,DELETE_WORKLOGS } from '../action';
// Initial state for the Worklogs
const initialState = {
  worklogs: [],
};

const worklogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WORKLOGS':
      return { ...state, worklogs: action.payload };

    case 'ADD_WORKLOGS':
      return { ...state, worklogs: [...state.worklogs, action.payload] };

    case 'EDIT_WORKLOGS':
      return {
        ...state,
        worklogs: state.worklogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
      };

    case 'DELETE_WORKLOGS':
      return {
        ...state,
        worklogs: state.worklogs.filter((log) => log.id !== action.payload),
      };

    default:
      return state;
  }
};

export default worklogsReducer;

