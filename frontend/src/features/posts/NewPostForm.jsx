import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

function NewPostForm () {
  const [title, setTile] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const post = {
      title: title,
      body: body
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ post: post })
      });

      if (!response.ok) {
        const errorData = await response.json();        
        throw errorData;
      }
          
      const data = await response.json();
      navigate(`/posts/${data.id}`);
    } catch (error) { 
      console.error('Error creating post:', error);
      setError(error || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>New Post Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input id="titleInput"
                 type="text" 
                 value={title}
                 onChange={(event) => setTile(event.target.value)}
                 required />
          {error?.title && error.title.map((err, index) => (
            <div key={index} style={{ color: 'red' }}>{index+1}. {err}</div>
          ))}
        </div>
        <br />
        <div>
          <label htmlFor="bodyInput">Body</label>
          <input id="bodyInput"
                 type="text"
                 value={body}
                 onChange={(event) => setBody(event.target.value)}
                 required />
          {error?.body && error.body.map((err, index) => (
            <div key={index} style={{ color: 'red' }}>{index+1}. {err}</div>
          ))}
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm;
