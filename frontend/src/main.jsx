import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store"; 
import App from "./App"; 
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
);





// coersefactory-
//               backend-
//                       -db.json
//               frontend-
//                       -src-
//                           -components
//                                     -CourseDeatils.jsx
//                                     -CourseList.jsx
//                                     -Dashboard.jsx
//                           -redux-
//                                  -coursesSlice.jsx
//                                  -Store.jsx               