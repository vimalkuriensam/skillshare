import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store/configureStore";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);

export default App;
