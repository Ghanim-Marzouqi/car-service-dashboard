import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastProvider } from 'react-toast-notifications';

// layouts
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import GarageOwnerLayout from "../layouts/GarageOwnerLayout";

const App = () => {
  return (
    <RecoilRoot>
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/garage-owner">
              <GarageOwnerLayout />
            </Route>
            <Route path="/admin">
              <AdminLayout />
            </Route>
            <Route path="/auth">
              <AuthLayout />
            </Route>
            <Redirect from="/" to="/auth" />
          </Switch>
        </Router>
      </ToastProvider>
    </RecoilRoot>
  );
}

export default App;
