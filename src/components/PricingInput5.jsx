import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import Layout from "./Layout";
import PriceStep5 from "../assets/PriceStep5.svg";

const PricingInput5 = ({ params, stepState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { priceLists } = useSelector((state) => state.price);
  //경우에 따른 초기값으로 현상태 스테이트 초기화
  const initialState = {
    category: priceLists.category,
    years: priceLists.years,
    model: priceLists.model,
    options: priceLists.options,
    batteryState: 0,
    careOX: "",
    careDate: "",
    iphoneState: "",
    macbookState: "",
    ram: "",
    storage: "",
    keyboard: "",
  };
  const [tag, setTag] = useState(initialState);
  const [getInfo, setGetInfo] = useState("");
  const { getList } = useSelector((state) => state.price);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
  };

  const onSubmitHandler = () => {
    if (tag.model === " " || tag.model === "model") {
      return alert("항목을 확인하세요");
    }

    console.log("전개", { ...tag });
    let objMac = {};
    let objMac2 = {};
    if (tag.category === "macbook") {
      objMac = {
        category: tag.category,
        years: Number(tag.years),
        model: tag.model,
        options: tag.options,
        ram: tag.ram,
        keyboard: getList.keyboard[0],
        storage: tag.storage,
        batteryState: Number(tag.batteryState),
        macbookState: tag.macbookState,
        careOX: tag.careOX,
        careDate: tag.careDate,
      };
      objMac2 = {
        category: tag.category,
        years: Number(tag.years),
        model: tag.model,
        options: tag.options,
        ram: tag.ram,
        keyboard: getList.keyboard[0],
        storage: tag.storage,
        macbookState: tag.macbookState,
        batteryState: Number(tag.batteryState),
        careOX: tag.careOX,
        careDate: "",
      };
    }
    const objPhone = {
      category: tag.category,
      years: Number(tag.years),
      model: tag.model,
      options: tag.options,
      batteryState: Number(tag.batteryState),
      iphoneState: tag.iphoneState,
      careOX: tag.careOX,
      careDate: tag.careDate,
    };

    const objPhone2 = {
      category: tag.category,
      years: Number(tag.years),
      model: tag.model,
      options: tag.options,
      batteryState: Number(tag.batteryState),
      iphoneState: tag.iphoneState,
      careOX: tag.careOX,
      careDate: "",
    };

    const Data =
      tag.category === "macbook"
        ? tag.careOX === "false"
          ? objMac2
          : objMac
        : tag.careOX === "false"
        ? objPhone2
        : objPhone;

    const passData = {
      category: tag.category,
      Data: Data,
    };
    console.log(passData);
    if (window.confirm(`입력한 정보와 일치합니까?`)) {
      dispatch(__checkPrice(passData));
      navigate(`/Pricingfinal`);
      setTag({});
    }
  };

  return (
    <>
      <div>
        <div>
          {tag.category === "macbook" ? (
            <div>
              <ContentDiv>램 메모리</ContentDiv>
              <CategoryDiv>
                <SelectBox name="ram" onChange={onChangeHandler}>
                  <option value={"ram"}> ram </option>
                  {getList.ram &&
                    getList.ram.map((list) => {
                      return <option value={list}> {list} </option>;
                    })}
                </SelectBox>
              </CategoryDiv>

              <ContentDiv>SSD 용량</ContentDiv>
              <CategoryDiv>
                <SelectBox name="storage" onChange={onChangeHandler}>
                  <option value={"storage"}> storage </option>
                  {getList.storage &&
                    getList.storage.map((list) => {
                      return <option value={list}> {list} </option>;
                    })}
                </SelectBox>
              </CategoryDiv>
              <ContentDiv>배터리 사이클</ContentDiv>
              <CategoryDiv>
                <PriceInput
                  placeholder="배터리 사이클을 입력해주세요"
                  value={tag.batteryState}
                  type="Number"
                  min="0"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
              <ContentDiv>맥북 상태</ContentDiv>
              <CategoryDiv>
                <SelectBox name="macbookState" onChange={onChangeHandler}>
                  <option value={"macbookState"}>맥북 상태</option>
                  <option value={"Class A"}>A급</option>
                  <option value={"Class B"}>B급</option>
                  <option value={"Class C"}>C급</option>
                </SelectBox>
              </CategoryDiv>
            </div>
          ) : (
            <div>
              <ContentDiv>아이폰 상태</ContentDiv>
              <CategoryDiv>
                <SelectBox name="iphoneState" onChange={onChangeHandler}>
                  <option value={"iphoneState"}>아이폰 상태</option>
                  <option value={"Class A"}>A급</option>
                  <option value={"Class B"}>B급</option>
                  <option value={"Class C"}>C급</option>
                </SelectBox>
              </CategoryDiv>
              <ContentDiv>배터리 성능 최대치</ContentDiv>
              <CategoryDiv>
                <PriceInput
                  placeholder="0% ~ 100%"
                  value={tag.batteryState}
                  type="Number"
                  min="0"
                  max="100"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
            </div>
          )}

          <ContentDiv>애플케어 유무</ContentDiv>
          <CategoryDiv>
            <SelectBox name="careOX" onChange={onChangeHandler}>
              <option value={"careOX"}>애플케어 유무</option>
              <option value={"O"}>있음</option>
              <option value={"X"}>없음</option>
            </SelectBox>
          </CategoryDiv>

          {tag.careOX === "O" && (
            <>
              <ContentDiv>애플케어 보증기간</ContentDiv>
              <CategoryDiv>
                <DateInput
                  placeholder="애플케어 보증기간"
                  type="date"
                  name="careDate"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
            </>
          )}
        </div>

        <DDid />

        <StepDiv>
          <img src={PriceStep5} />
        </StepDiv>

        <NextButton onClick={onSubmitHandler}>다음으로</NextButton>
      </div>
    </>
  );
};

export default PricingInput5;

const RLDiv = styled.div`
  .C02:checked {
    .C01 {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  position: relative;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 10px;
  padding-left: 10px;
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const SelectBox = styled.select`
  width: 330px;
  height: 40px;
  overflow: auto;
  border: 1px solid #000000;
  background-color: transparent;
  border-radius: 50px;
  font-size: 15px;
`;

const ContainerDiv1 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: transparent;
  height: 100%;
  width: 375px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  border-bottom: solid 1px gray;
  /* background-color: blue; */
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 50px;
`;

const PriceInput = styled.input`
  position: absolute;
  width: 330px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: transparent;
`;
const DateInput = styled.input`
  position: absolute;
  width: 177px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-radius: 50px;
  border: 1px solid #c4c4c4;
  background-color: transparent;
`;

const Backbutton = styled.button`
  position: absolute;
  left: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const Xbutton = styled.button`
  position: absolute;
  right: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const DDid = styled.div`
  height: 100px;
`;

const StepDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 56px;
  border: none;
  background-color: transparent;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 56px;
  color: white;
  border: none;
  background-color: #4f75ff;
`;