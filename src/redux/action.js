//Login Logout
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (user) => {
  localStorage.setItem("fitnessUser", JSON.stringify(user)); // ✅ Save to localStorage
  return {
    type: "LOGIN",
    payload: user,
  };
};
export const logout = () => {
  localStorage.removeItem("fitnessUser"); // ✅ Clear localStorage
  return {
    type: "LOGOUT",
  };
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