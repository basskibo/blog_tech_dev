import React, { useState, useEffect } from "react";
import moment from "moment";

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
        <div className="bg-slate-900  shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 text-white font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-slate-100 mb-4 pb-4"
            >
              <p className="mb-4 text-slate-400">
                <span className="text-white font-semibold">{comment.name}</span>{" "}
                on {moment(comment.createdAt).format("MMMM DD, YYYY")}
              </p>
              <p className="text-slate-400">{comment.comment} </p>
            </div>
          ))}

          {/* <Stack spacing={3}>
            <Paginations
              count={5}
              defaultPage={1}
              variant="outlined"
              color="primary"
              // className={" w-full"}
              style={{ color: "#ffff" }}
              renderItem={(item) => (
                <PaginationItem
                  className="text-slate-400 bg-slate-900  lg:m-1 sm:m-1 xs:ml-4 xs:mb-6 first:ml-1 "
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              style={{ color: "#ffff" }}
            />
          </Stack> */}
        </div>
      )}
    </div>
  );
};

export default Comment;
