import { createStore, combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer);
// const persistConfig = {
//     key: 'root',
//     whitelist: [loginReducer]
//   }
// const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// const store = createStore(
//     persistedReducer,
//   );


export default store;