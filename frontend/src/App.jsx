import { Routes, Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:id" element={<CourseDetails />} />
    </Routes>
  );
};

export default App;
