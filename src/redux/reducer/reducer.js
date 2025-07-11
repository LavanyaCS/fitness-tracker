    import authReducer from "./authReducer";
    import worklogsReducer from "./worklogReducer";
    import weightlogsReducer from "./weightReducer";
    import { combineReducers } from 'redux';
    import goalsReducer from "./goalsReducer";

    const rootReducer = combineReducers({
        auth:authReducer,
        worklog:worklogsReducer,
        weight:weightlogsReducer,
        goal:goalsReducer
    })
    export default rootReducer;