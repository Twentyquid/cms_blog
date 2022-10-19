import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

function CommentsForm({ slug }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmit = () => {
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { value: comment } = commentEl.current;
    const { checked: storeData } = storeDataEl.current;
    setError(false);
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.clear();
    }
    submitComment(commentObj).then((result) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a comment!
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={commentEl}
          name="comment"
          cols="30"
          rows="10"
          placeholder="Comment"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="text"
          placeholder="name"
          name="name"
          ref={nameEl}
        />
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="email"
          placeholder="email"
          name="email"
          ref={emailEl}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            id="storedata"
            name="storedata"
            value="true"
            type="checkbox"
          />
          <label
            className="text-gray-500 ml-2 cursor-pointer"
            htmlFor="storedata"
          >
            Save my email and name
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          className="transition duration-200 ease-linear hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          onClick={handleCommentSubmit}
        >
          SUBMIT
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Successfully submitted for review
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentsForm;
