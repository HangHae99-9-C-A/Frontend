import React, { useState } from "react";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(true);
  };

  return (
    <div>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </h1>
      <h2
        onClick={() => {
          navigate("/postread/macbook");
        }}
      >
        MacBook
      </h2>
      <h2
        onClick={() => {
          navigate("/postread/iphone");
        }}
      >
        iPhone
      </h2>
      <button
        onClick={() => {
          navigate("/mypage");
        }}
      >
        마이페이지
      </button>
      <button
        onClick={() => {
          navigate("/pricingInput");
        }}
      >
        가격책정
      </button>
      {modalOn && <Modal setModalOn={setModalOn} />}
    </div>
  );
};

export default Header;

const Span = styled.span`
  cursor: pointer;
`;
