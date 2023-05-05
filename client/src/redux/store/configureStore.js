import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const encryptor = encryptTransform({
  secretKey: "dummy-secret",
  onError: function (error) {
    // Handle the error.
  },
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
  blacklist: [],
};

const store = createStore(
  persistReducer(persistConfig, combineReducers({})),
  composeEnhancers(applyMiddleware(thunk, logger))
);

const persistor = persistStore(store);

export { store, persistor };
