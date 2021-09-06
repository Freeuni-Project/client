import React, { useState, useEffect } from "react";
/* axis base url */
import base from "../axios/axiosBase";
/* redux hooks */
import { useSelector } from "react-redux";

const ShowComment = ({ comment, getComments }) => {
  /* states for comment */
  const [commentData, setCommentData] = useState({
    commentOwner: {},
    comment: "",
  });

  const [editMode, setEditMode] = useState(true);
  /* get all users from current project */
  const { projectUsers } = useSelector((state) => state.current);
  const { userId } = useSelector((state) => state.auth);

  const deleteComment = async () => {
    const resp = base.delete(`/ticket/${comment.id}/delete-comment`);
  };

  useEffect(() => {
    if (comment) {
      setCommentData((val) => {
        return { ...val, comment: comment.comment };
      });
    }
    if (comment && projectUsers) {
      const commentOwner = projectUsers.find(
        (user) => user.id == comment.user_id
      );
      if (commentOwner) {
        setCommentData((val) => {
          return {
            ...val,
            commentOwner: {
              fistName: commentOwner.first_name,
              lastName: commentOwner.last_name,
              id: commentOwner.id,
            },
          };
        });
      }
    }
  }, []);

  console.log(commentData);

  return (
    <>
      <div className="commentcontainer">
        <div className="commentbox">
          <div className="commenttitle">
            {(commentData && commentData.commentOwner.fistName) || "nikoloz"}{" "}
            {(commentData && commentData.commentOwner.lastName) || "cxvedadze"}
          </div>
          <textarea
            className="commentinput"
            value={commentData.comment}
            disabled={editMode}
          />
        </div>
        {userId == commentData.commentOwner.id && (
          <div
            className="deletecomment"
            onClick={() => {
              deleteComment();
              getComments();
            }}
          >
            Delete
          </div>
        )}
      </div>
    </>
  );
};

export default ShowComment;
