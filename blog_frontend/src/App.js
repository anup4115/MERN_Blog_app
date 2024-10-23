import { BrowserRouter,Routes,Route } from "react-router-dom";
import Headers from "./components/Headers";
import Blogs from "./Pages/Blogs";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserBlogs from "./Pages/UserBlogs";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetails from "./Pages/BlogDetails";


function App() {
  return (
    <>
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/myblogs" element={<UserBlogs />} />
        <Route path="//blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
