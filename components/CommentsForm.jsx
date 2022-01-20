import React, { useState, useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0f172a",
  border: "2px solid #000",
  color: "white",
  boxShadow: 24,
  p: 4,
};

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [submitedSucc, setSubmitedSucc] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmition = () => {
    console.log("Handling button click!!");
    setError(false);
    setSubmitedSucc(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      handleOpen();
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("name", name);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setSubmitedSucc(true);
      handleOpen();
    });
  };
  return (
    <div className="bg-slate-900 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 text-white font-semibold border-b pb-4">
        Leave you comment
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 p-4 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="py-2 p-4 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700"
          placeholder="Comment"
          name="comment"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ml-1">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
          />
          <label className="text-white pl-2 text-sm" htmlFor="storeData">
            Remember my name and email for next time I comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <Button
          variant="outlined"
          color="success"
          onClick={handleCommentSubmition}
        >
          Submit comment
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              style={submitedSucc ? { color: "green" } : { color: "red" }}
            >
              {submitedSucc ? "Success!" : "Failed!"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your comment was successfully submitted , please wait while admin
              approves it.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CommentsForm;
