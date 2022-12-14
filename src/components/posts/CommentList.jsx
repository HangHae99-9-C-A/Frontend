import React from "react";
import Comment from "../commons/Comment";

const CommentList = (props) => {
  return (
    <div className="pt-5">
      {props.commentList &&
        props.commentList.map((comment, index) => {
          return (
            <div key={index}>
              <Comment
                comment={comment}
                post={props.post}
                __deleteComment={props.__deleteComment}
              />
            </div>
          );
        })}
      <div className="h-16"></div>
    </div>
  );
};

export default CommentList;
