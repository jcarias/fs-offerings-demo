import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
	// ...your other reducers here
	// you have to pass formReducer under 'form' key,
	// for custom keys look up the docs for 'getFormState'
	form: formReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
