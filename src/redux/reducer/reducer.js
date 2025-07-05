    import authReducer from "./authReducer";
    import worklogsReducer from "./worklogReducer";
    import { combineReducers } from 'redux';

    const rootReducer = combineReducers({
        auth:authReducer,
        worklogs:worklogsReducer
    })
    export default rootReducer;