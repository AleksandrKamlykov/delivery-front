import { rootReducer } from './reducers/rootReducer';
import { compose, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart'],
    // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export const store = createStore(persistedReducer, composeEnhancers());
export const persistor = persistStore(store);