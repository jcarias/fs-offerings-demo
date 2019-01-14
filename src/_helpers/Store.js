import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { UserReducer } from "../_reducers/UserReducer";

const rootReducer = combineReducers({
	UserReducer,
	// ...your other reducers here
	// you have to pass formReducer under 'form' key,
	// for custom keys look up the docs for 'getFormState'
	form: formReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
