import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editpost from './EditPost';

type Post = {
  id: string;
  title: string;
  contents: string;
};

type Props = {
  match: {
    params: {
      postID: string;
    };
  };
};

const Edit: React.FC<Props> = (props) => {
  useEffect(() => {
    viewPostId(props.match.params.postID);
  }, []);

  const [ispostId, setpostId] = useState<Post[]>([]);

  const viewPostId = async (ids: string) => {
    try {
      const res = await axios.post(`http://localhost:8080/getPostId`, {
        ids: props.match.params.postID,
      });
      if (res.data.success === true) {
        setpostId(res.data.listId);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {ispostId.length > 0 ? (
        <>
          <Editpost postList={ispostId} editPostID={props.match.params.postID} />
        </>
      ) : null}
    </>
  );
};

export default Edit;
