import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Props {
  postList: Array<{
    title: string;
    contents: string;
  }>;
  editPostID: string;
}

function Editpost(props: Props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    title: props.postList[0].title,
    contents: props.postList[0].contents,
  });
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onContentsChange = (value: string) => {
    setUserInfo({ ...userInfo, contents: value });
  };

  const [isError, setError] = useState<string | null>(null);
  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.contents.length < 50) {
        setError('Required, Add contents minimum length 50 characters');
        return;
      }
      axios
        .post(`http://localhost:8080/editArticle`, {
          title: userInfo.title,
          contents: userInfo.contents,
          ids: props.editPostID,
        })
        .then((res) => {
          if (res.data.success === true) {
            navigate('/');
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form onSubmit={handlePostSubmit} className="update__forms">
            <h3 className="myaccount-content"> Edit </h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="font-weight-bold">
                  {' '}
                  Title <span className="required"> * </span>{' '}
                </label>
                <input
                  type="text"
                  name="title"
                  value={userInfo.title}
                  onChange={onChangeValue}
                  className="form-control"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">
                  {' '}
                  contents <span className="required"> * </span>{' '}
                </label>
                <EditorToolbar toolbarId={'t1'} />
                <ReactQuill
                  theme="snow"
                  value={userInfo.contents}
                  onChange={onContentsChange}
                  placeholder={'Write something awesome...'}
                  // modules={modules('t1')}
                  formats={formats}
                />
              </div>
              <br />
              {isError !== null && <div className="errors"> {isError} </div>}
              <div className="form-group col-sm-12 text-right">
                <button type="submit" className="btn btn__theme">
                  {' '}
                  Submit{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editpost;
