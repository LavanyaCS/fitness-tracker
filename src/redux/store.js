import { createStore } from "redux";
import rootReducer from "./reducer/reducer";

const store = createStore(rootReducer);
export default store;