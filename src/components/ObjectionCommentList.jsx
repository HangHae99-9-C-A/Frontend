import React from "react";
import { useDispatch } from "react-redux";

const ObjectionCommentList = (props) => {
  const dispatch = useDispatch();
  const onDeleteButton = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(props.__deleteComment(payload));
    }
  };

  return (
    <>
      <div>CommentList</div>

      {props.commentList &&
        props.commentList.map((comment, index) => {
          return (
            <div key={index}>
              <span>{comment.nickname} </span>
              <span> {comment.issuesComment}</span>
              <button onClick={() => onDeleteButton(comment.issuesCommentId)}>
                댓글 삭제
              </button>
            </div>
          );
        })}
    </>
  );
};

export default ObjectionCommentList;