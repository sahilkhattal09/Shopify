import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}>
          <Route path="blogs" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
