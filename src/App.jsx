import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Layout from "./components/UI/Layout";
import Navbar from "./components/UI/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
         <Route path="/" element={<Home />} />
         <Route path="/user/:username" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;