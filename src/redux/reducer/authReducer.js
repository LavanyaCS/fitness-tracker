import { LOGIN, LOGOUT } from '../action';
const savedUser = JSON.parse(localStorage.getItem("fitnessUser"));

const initalState = {
     user: savedUser || null,
    isAuthenticated: false
}
//Login and Logout
const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;

    }
};
//Exported Login and Logout
export default authReducer;