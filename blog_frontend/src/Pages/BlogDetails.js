import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  const getBlogDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/get-blog/${id}`);
      const data = await response.json();
      if (data.status === "failed") {
        console.error("Failed to fetch blog details");
      } else {
        setBlog(data?.blog); // Fetch and set blog details
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      title: data.get("title"),
      description: data.get("description"),
      image: data.get("image"),
      userId: userId,
    };

    const myInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actualData),
    };

    fetch(`http://localhost:8000/api/blogs/update-blog/${id}`, myInit)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/myblogs");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div>
      <Box
        component="form"
        id="update-blog-id"
        onSubmit={handleSubmit}
        width="80%"
        display="flex"
        flexDirection="column"
        margin="auto"
        marginTop="2%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Update Blog</Typography>
        <TextField
          label="Title"
          margin="normal"
          type="text"
          fullWidth
          required
          name="title"
          defaultValue={blog?.title || ""}
        />
        <TextField
          label="Description"
          margin="normal"
          type="text"
          fullWidth
          required
          name="description"
          defaultValue={blog?.description || ""}
        />
        <TextField
          label="Image URL"
          margin="normal"
          required
          name="image"
          fullWidth
          defaultValue={blog?.image || ""}
        />
        <Button type="submit" variant="contained">
          Update Blog
        </Button>
      </Box>
    </div>
  );
};

export default BlogDetails;
