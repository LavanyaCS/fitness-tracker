//Login Logout
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (user) => {
  localStorage.setItem("fitnessUser", JSON.stringify(user));

  return {
    type: "LOGIN",
    payload: user,
  };
};

export const logout = () => {
  localStorage.removeItem("fitnessUser");  
  return {
    type: "LOGOUT",
  };
};
export const loadUserData = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`);
    const userData = await res.json();

    dispatch(getWorklogsAction(userData.worklogs || []));
    dispatch(getWeightlogsAction(userData.weightlogs || []));
    dispatch(getGoalsAction(userData.goals || []));
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};
//Workout Log Crud
export const GET_WORKLOGS = "GET_WORKLOGS";
export const ADD_WORKLOGS = "ADD_WORKLOGS";
export const EDIT_WORKLOGS = "EDIT_WORKLOGS";
export const DELETE_WORKLOGS = "DELETE_WORKLOGS";

export const getWorklogsAction = (data) => ({ type: GET_WORKLOGS, payload: data });
export const addWorklogsAction = (data) => ({ type: ADD_WORKLOGS, payload: data });
export const editWorklogsAction = (data) => ({ type: EDIT_WORKLOGS, payload: data });
export const deleteWorklogsAction = (id) => ({ type: DELETE_WORKLOGS, payload: id });

// Weight Log Crud
export const GET_WEIGHTLOGS = "GET_WEIGHTLOGS";
export const ADD_WEIGHTLOGS = "ADD_WEIGHTLOGS";
export const EDIT_WEIGHTLOGS = "EDIT_WEIGHTLOGS";
export const DELETE_WEIGHTLOGS = "DELETE_WEIGHTLOGS";
export const LOAD_WEIGHTLOGS = "LOAD_WEIGHTLOGS";


export const getWeightlogsAction = (data) => ({ type: GET_WEIGHTLOGS, payload: data });
export const addWeightlogsAction = (data) => ({ type: ADD_WEIGHTLOGS, payload: data });
export const loadWeightlogsAction = (data) => ({ type: LOAD_WEIGHTLOGS, payload: data });
export const editWeightlogsAction = (data) => ({ type: EDIT_WEIGHTLOGS, payload: data });
export const deleteWeightlogsAction = (id) => ({ type: DELETE_WEIGHTLOGS, payload: id });

//Goals

// Weight Log Crud
export const GET_GOALS = "GET_GOALS";
export const ADD_GOALS = "ADD_GOALS";
export const EDIT_GOALS = "EDIT_GOALS";
export const DELETE_GOALS = "DELETE_GOALS";
export const LOAD_GOALS = "LOAD_GOALS";


export const getGoalsAction = (data) => ({ type: GET_GOALS, payload: data });
export const addGoalsAction = (data) => ({ type: ADD_GOALS, payload: data });
export const loadGoalsAction = (data) => ({ type: LOAD_GOALS, payload: data });
export const editGoalsAction = (data) => ({ type: EDIT_GOALS, payload: data });
export const deleteGoalsAction = (id) => ({ type: DELETE_GOALS, payload: id });