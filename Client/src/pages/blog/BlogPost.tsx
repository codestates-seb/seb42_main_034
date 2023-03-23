import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats } from '../../component/ui/EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserInformation {
  title: string;
  contents: string;
}

function BlogPost() {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState<UserInformation>({
    title: '',
    contents: '',
  });
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onContents = (value: string) => {
    setuserInfo({
      ...userInfo,
      contents: value,
    });
  };
  const [isError, setError] = useState<string | null>(null);
  const addDetails = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.contents.length < 50) {
        setError('Required, Add description minimum length 50 characters');
        return;
      }
      axios
        .post(`http://localhost:8080/addArticle`, {
          title: userInfo.title,
          contents: userInfo.contents,
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
    <>
      <div className="App">
        <div className="container">
          <div className="row">
            <form onSubmit={addDetails} className="update__forms">
              <h3 className="myaccount-content"> 블로그 작성 페이지 </h3>
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
                <div className="clearfix"></div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {' '}
                    Contents <span className="required"> * </span>{' '}
                  </label>
                  <EditorToolbar toolbarId={'t1'} />
                  <ReactQuill
                    theme="snow"
                    value={userInfo.contents}
                    onChange={onContents}
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
                    제출하기{' '}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogPost;
