import React from "react";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";

import PhoneListPage from "./pages/phones/PhoneList";
import PhoneAddPage from "./pages/phones/PhoneAdd";
import PhoneUpdatePage from "./pages/phones/PhoneUpdate";

const App: React.FunctionComponent = () => (
  <Router>
    <div>
      <Redirect exact from="/" to="/phones" />
      <Route exact path="/phones" component={PhoneListPage} />
      <Route path="/phones/add" component={PhoneAddPage} />
      <Route path="/phones/update/:id" component={PhoneUpdatePage} />
    </div>
  </Router>
);

export default App;
