import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { __getSellerinfo } from "../redux/modules/SellerSlice";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/commons/Layout";
import Footer from "../components/commons/Footer";
import whiteX from "../assets/pictures/whiteX.png";
import bookmark8D from "../assets/pictures/bookmark8D.png";

const SellerPage = () => {
  const { myPostList, sellerInfoDto } = useSelector(
    (state) => state.sellerpage
  );

  const navigate = useNavigate();
  const { memberId } = useParams();
  // params, router 접근
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getSellerinfo(memberId));
  }, [memberId]);

  return (
    <div>
      <Layout>
        <div className="bg-CC text-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-2 border-D9">
          <img
            className="h-6 w-6 absolute left-3 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
            src={whiteX}
          />
          <div>
            <div>프로필</div>
          </div>
        </div>

        {sellerInfoDto !== undefined && (
          <div className="   flex-col relative">
            <div className="justify-center flex">
              <div className="flex-col absolute top-16 z-20 ">
                <div className="flex justify-center items-center">
                  <img
                    className="w-16 h-16 rounded-full shadow-2xl object-cover"
                    src={sellerInfoDto?.profileImg}
                  />
                </div>
                <div className=" h-10 font-semibold flex justify-center items-center">
                  {sellerInfoDto?.nickname}
                </div>
              </div>
            </div>
            <div className=" h-24" />
            <div className="bg-white h-24 rounded-t-3xl"></div>

            <div className="bg-white">
              <div className="flex px-[18px] py-2">
                <div className=" font-semibold">{sellerInfoDto?.nickname}</div>
                님의 판매상품
              </div>
              <div className="px-[18]">
                {myPostList?.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 gap-y-5">
                    {myPostList?.map((mypost, index) => {
                      return (
                        <div className=" flex" key={index}>
                          <div
                            className="  ml-3  flex-col content-between justify-between place-content-between  "
                            key={mypost?.postId}
                          >
                            <img
                              className="h-40 w-40 object-cover"
                              src={mypost?.images[0]?.imgUrl}
                            />

                            <div className="font-semibold ">
                              {mypost?.userPrice?.toLocaleString("ko-KR")}원
                            </div>
                            <div className="text-sm break-words w-40 text-OO">
                              {mypost?.title}
                            </div>

                            <div className="flex">
                              <div className="h-5" />
                              <div className="text-DD flex text-xs items-center absolute bottom-[1px]">
                                <img className="h-3" src={bookmark8D} />
                                <div>{mypost?.likeCnt}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="h-14" />
        <Footer />
      </Layout>
    </div>
  );
};

export default SellerPage;
