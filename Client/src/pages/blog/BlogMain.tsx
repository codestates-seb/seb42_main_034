import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  contents: string;
}

function App(): JSX.Element {
  useEffect(() => {
    viewPost();
  }, []);

  const [ispost, setPost] = useState<Post[]>([]);

  const viewPost = async (): Promise<void> => {
    try {
      const res = await axios.get<{ success: boolean; listall: Post[] }>('http://localhost:8080/allPost');
      if (res.data.success === true) {
        setPost(res.data.listall);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h1 className="App__tittle">Blog Post</h1>
          <Link to="/board/blogpost" className="btn btn__theme btn__add">
            Create Now
          </Link>

          {ispost.map((item: Post, index: number) => (
            <div className="post__list" key={index}>
              <h2>{item.title}</h2>
              <div className="post__description" dangerouslySetInnerHTML={{ __html: item.contents }} />
              <Link to={`/Edit/${item.id}`} className="btn btn__theme">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
