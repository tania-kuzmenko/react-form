import React, { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from '../api/users.json';
import { Post } from '../types/Post';
import { getUserById } from '../servises/user';

type Props = {
  onSubmit: (post: Post) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyErrorMsg, setHasBodyErrorMsg] = useState('');
 


  const [isBodyShown, setIsBodyShown] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
    // setIsBodyShown(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyErrorMsg('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);
    
    if (!body) {
      setHasBodyErrorMsg('Enter some text');
    } else if (body.length < 5) {
      setHasBodyErrorMsg('Enter minimum 5 characters');
    }

    if (!title || !userId || body.length < 5) {
      return;
    }

    

    onSubmit({
      id: 0,
      title,
      body,
      userId,
      user: getUserById(userId),
    });

    handleReset();

  };

  const handleReset = () => {
    setTitle('');
    setBody('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
    setHasBodyErrorMsg('');
  };

  return (
    <form 
      action="/api/posts" 
      method="POST" 
      className="box"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field">
        <label className="label" htmlFor="post-title">
          Title
        </label>
        <div
          className={classNames('control', {
            'has-icons-right': hasTitleError,
          })}
        >
          <input
            id="post-title"
            className={classNames('input', {
              'is-danger': hasTitleError
            })} 
            type="text"
            placeholder="Email input"
            defaultValue="Post 1" 
            value={title}
            onChange={handleTitleChange}
            onBlur={() => {
              setHasTitleError(!title);
            }}
          />
          {hasTitleError && (
            <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle has-text-danger"></i>
          </span>
          )}

          {hasTitleError && (
            <p className="help is-danger">Title is required</p>
          )}
        </div>
      </div>
      <div className="field">
        <label
          className="label"
          htmlFor="post-user-id"
        >
          User
        </label>
        <div className="control has-icons-left">
          <div className={classNames('select', {
              'is-danger': hasUserIdError
            })} 
          
          >
            <select
              id="post-user-id"
              required
              defaultValue="0"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0">
                Select user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
        
        {hasUserIdError && (
          <p className="help is-danger">
            Please select user
          </p>
        )}
      </div>
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              defaultChecked
              checked={isBodyShown}
              onChange={(event) => setIsBodyShown(event.target.checked)}
            />
              I want enter the text <a href="#">terms and conditions</a>
          </label>
      </div>
      </div>
      {isBodyShown && (
        <div className="field">
          <label className="label">
            Text
          </label>

          <div className="control">
            <textarea
              className={classNames('textarea', {
                'is-danger': hasBodyErrorMsg,
                
              })}
              placeholder="Add some text here"
              value={body}
              onChange={handleBodyChange}
            
            ></textarea>
          </div>

          {hasBodyErrorMsg && (
          <p className="help is-danger">
            {hasBodyErrorMsg}
          </p>
        )}
        </div>
      )}
        <div className="buttons">
        <button
          className="button is-link"
          type="submit"
        >
          Submit
        </button>
        <button
          className="button is-link is-light"
          type="reset"
        >
          Cancel
        </button>
        </div>
    </form>
  );
};