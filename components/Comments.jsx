import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";
const Comment = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);
  return (
    <div>
      {" "}
      {comments.length > 0 && (
        <div className="bg-white dark:bg-slate-900  shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 dark:text-white font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-slate-100 mb-4 pb-4"
            >
              <p className="mb-4 dark:text-slate-400">
                <span className="text-white font-semibold">{comment.name}</span>{" "}
                on {moment(comment.createdAt).format("MMMM DD, YYYY")}
              </p>
              <p className="dark: text-slate-400">{comment.comment} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
