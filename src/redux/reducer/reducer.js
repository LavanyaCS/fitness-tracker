    import authReducer from "./authReducer";
    import worklogsReducer from "./worklogReducer";
    import weightlogsReducer from "./weightReducer";
    import { combineReducers } from 'redux';

    const rootReducer = combineReducers({
        auth:authReducer,
        worklogs:worklogsReducer,
        weightlogs:weightlogsReducer
    })
    export default rootReducer;