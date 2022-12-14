import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getRoomList } from "../../../redux/modules/ChattingSlice";
import { __getinitialChatList } from "../../../redux/modules/ChattingSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Room = useSelector((state) => state.chatting.roomList);
  useEffect(() => {
    dispatch(__getRoomList());
  }, []);

  const onClickChatting = (item) => {
    navigate(`/Chatting/${item.roomId}`);

    dispatch(
      __getinitialChatList({
        postId: item.postId,
        roomId: item.roomId,
      })
    );
    localStorage.setItem("roomId", item.roomId);
  };

  return (
    <div className=" w-[375px] px-4">
      <div className="border-b-[0.5px] border-D9 h-10 bg-white flex rounded-t-md  items-center px-3 text-sm font-semibold">
        채팅
      </div>
      <div
        className="bg-white rounded-b-md h-80 overflow-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {Room !== undefined &&
          (Room.length > 0 ? (
            Room.map((item, i) => {
              return (
                <>
                  {item.chatList.length > 0 && (
                    <>
                      <div className=" px-3 py-1 " key={i}>
                        <div
                          className=" flex justify-between items-center h-14 "
                          onClick={() => onClickChatting(item)}
                        >
                          <div className="flex  items-center w-full">
                            <img
                              className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                              src={item.otherUserAvatarUrl}
                            />
                            <div className=" ml-2 flex-col text-sm ">
                              <div className="flex items-center">
                                <div className="font-semibold">
                                  {item.otherNickname.length > 10
                                    ? item.otherNickname.substring(0, 9) + "..."
                                    : item.otherNickname}
                                </div>
                                <div className="ml-1 text-OO text-xs">
                                  {
                                    item.chatList[item.chatList.length - 1]
                                      .sendDate
                                  }
                                </div>
                              </div>
                              <div className="text-xs">
                                {item.chatList[item.chatList.length - 1].message
                                  .length > 20
                                  ? item.chatList[
                                      item.chatList.length - 1
                                    ].message.substring(0, 19) + "..."
                                  : item.chatList[item.chatList.length - 1]
                                      .message}
                              </div>
                            </div>
                          </div>

                          {item.image !== undefined && (
                            <img
                              className="w-11 h-11 object-cover rounded-lg flex-shrink-0"
                              src={item.image.imgUrl}
                            />
                          )}
                        </div>
                      </div>
                      <hr className="last-of-type:hidden border-t-[0.5px] border-D9" />
                    </>
                  )}
                </>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full text-D9">
              <div>
                <div className="flex justify-center">아직 채팅이 없어요 </div>
                <div>유저들과 채팅을 시작해보세요!</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
