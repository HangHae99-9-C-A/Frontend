import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { initialHeaderState } from "../redux/modules/PostsSlice";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //카테고리별 이동 및 get 을 위한 store 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    const initialObj = {
      paramObj: paramObj,
      pageNumber: 0,
      pageSize: 10,
      postSort: "postId",
    };
    dispatch(initialHeaderState(initialObj));
    navigate(`${props.Navigate}/${data}/postId`);
  };

  return (
    <div>
      <HeaderSpace>
        <div
          onClick={() => {
            onClickCategoryHandler("all");
          }}
        >
          {" "}
          제품 전체보기
        </div>
        <div
          onClick={() => {
            onClickCategoryHandler("macbook");
          }}
        >
          MacBook
        </div>
        <div
          onClick={() => {
            onClickCategoryHandler("iphone");
          }}
        >
          iPhone
        </div>
      </HeaderSpace>
    </div>
  );
};

export default MainHeader;

const HeaderSpace = styled.div`
  cursor: pointer;
  background-color: beige;
  display: flex;
  div {
    margin-right: 15px;
  }
`;