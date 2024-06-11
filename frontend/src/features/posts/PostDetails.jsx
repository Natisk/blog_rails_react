import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
          setLoading(false);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("An error occured", e)
      }
    };
    fetchCurrentPost();
  }, [id])

  if (loading) return <h2>Loading ...</h2>;

  return(
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to list</Link>
    </div>
  )
}

export default PostDetails;
