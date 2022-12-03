import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../../redux/modules/PostsSlice";
import photoIMG from "../../assets/photoIMG.png";
import whiteChatting from "../../assets/whiteChatting.png";
import blueHeart from "../../assets/blueHeart.svg";
import emptyHeart from "../../assets/emptyHeart.svg";
import blueBackArrow from "../../assets/blueBackArrow.svg";
import blueHome from "../../assets/blueHome.svg";
import blueToggle from "../../assets/blueToggle.svg";
import whiteComment from "../../assets/whiteComment.png";
import rightTriangle from "../../assets/rightTriangle.svg";
import { __CreateRoom } from "../../redux/modules/ChattingSlice";
import Layout from "../../components/commons/Layout";
import {
  __CartInPost,
  __CartOutPost,
  __getPostDetail,
} from "../../redux/modules/PostDetailsSlice";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.details);
  const postChat = useSelector((state) => state.chatting.createRoom);

  //찜하기
  const onCartButton = (payload) => {
    console.log(post);
    {
      post.isLike
        ? dispatch(__CartOutPost(payload))
        : dispatch(__CartInPost(payload));
    }
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(payload));
      window.location.replace("/postread/all");
    }
  };

  const [editTg, setEidtTg] = useState({
    isEdit: false,
  });

  const editToggleHandler = () => {
    const newEdit = {
      isEdit: !editTg.isEdit,
    };
    setEidtTg(newEdit);
  };

  useEffect(() => {
    dispatch(__getPostDetail(params.id));
    console.log("겟 포스트 디테일 내용", post);
  }, [params]);

  const onSellerPage = () => {
    navigate(`/sellerpage/${post.memberId}`);
  };

  // 채팅방 개설

  useEffect(() => {
    localStorage.setItem("roomId", postChat);
  }, [postChat]);

  const onClickChatting = () => {
    dispatch(
      __CreateRoom({
        postId: post.postId,
      })
    );
    setTimeout(
      function () {
        // 만들어진 채팅방으로 이동하는 로직 => localStorage 활용한 방법 이용
        // 연결되었을 때 콜백함수 실행
        navigate(`/chatting/${localStorage.getItem("roomId")}`);
      },
      300 // 밀리초 간격으로 실행
    );
  };

  // 케러셀
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };

  return (
    <>
      <Layout>
        <div className="bg-white h-screen">
          <div className=" relative flex-col h-[410px] w-[375px] z-10">
            <div className="bg-transparent flex relative h-[60px] items-center justify-center z-20">
              <img className="h-5 w-5 absolute  left-3" src={blueBackArrow} />
              <img
                className="h-[18px] w-[18px] absolute left-10"
                src={blueHome}
                onClick={() => navigate("/main")}
              />
              <img
                className="h-[18px] w-[18px] absolute right-4"
                src={blueToggle}
                onClick={editToggleHandler}
              />
            </div>
            {editTg.isEdit === true && (
              <div className=" absolute right-3 top-13 z-30 w-10">
                <button
                  className=" bg-white w-12 h-10 rounded-lg"
                  onClick={() => navigate(`/postupdate/${params.id}`)}
                >
                  수정
                </button>
                <button
                  className=" bg-white w-12 h-10 rounded-lg mt-[1px]"
                  onClick={() => {
                    onDeleteHandler(params.id);
                  }}
                >
                  삭제
                </button>
              </div>
            )}

            <div className=" absolute top-0 z-0 w-full h-[446px]">
              <Slider {...settings}>
                {post.images !== undefined &&
                  post.images.map((item, index) => {
                    return (
                      <img
                        className=" h-[446px] object-cover"
                        src={item.imgUrl}
                        key={index}
                      />
                    );
                  })}
              </Slider>
            </div>

            {post.isLike ? (
              <div className="bg-transparent flex-col absolute z-10 right-4 bottom-0">
                <img
                  src={blueHeart}
                  onClick={() => onCartButton(post.postId)}
                />
                <div className="text-center text-sm text-CC">
                  {post.likeCnt}
                </div>{" "}
              </div>
            ) : (
              <div className="bg-transparent flex-col absolute z-10 right-4 bottom-0">
                <img
                  src={emptyHeart}
                  onClick={() => onCartButton(post.postId)}
                />
                <div className="text-center text-sm text-white">
                  {post.likeCnt}
                </div>
              </div>
            )}
          </div>
          <div className="bg-white relative flex-col grow rounded-t-3xl z-30 mt-5 ">
            <div className=" h-[77px]  rounded-t-3xl border-b-[1px] border-D9 flex p-[18px] justify-between">
              <div
                className="items-center flex cursor-pointer"
                onClick={onSellerPage}
              >
                <img
                  className="w-[46px] h-[46px] rounded-full"
                  src={
                    post.avatarUrl == (null || undefined)
                      ? photoIMG
                      : post.avatarUrl
                  }
                />
                <div className="ml-2 text-sm font-semibold">
                  {post.nickname}
                </div>
              </div>
              <button
                className="bg-CC text-white text-sm p-3 rounded-md"
                onClick={() => {
                  navigate("/pricingtext", { state: post });
                }}
              >
                상품 상세 정보
              </button>
            </div>

            <div className="  flex-col relative ">
              {post.options !== undefined && (
                <div className=" flex text-xs px-[18px] items-stretch my-3 opacity-50 text-CC">
                  <div className="p-1 bg-EB rounded-md mx-0.5">
                    {post.options.category}
                  </div>
                  <div className="p-1 bg-EB rounded-md mx-0.5">
                    {post.options.model}
                  </div>
                  <div className="p-1 bg-EB rounded-md mx-0.5">
                    {post.options.years}
                  </div>
                  <div className="p-1 bg-EB rounded-md mx-0.5">
                    {post.options.options}
                  </div>
                </div>
              )}
              <div className="px-[18px] font-semibold">{post.title}</div>
              <div className=" p-[18px] text-sm">{post.content}</div>
              <div className=" min-h-96 h-96" />
            </div>
          </div>

          <div className="absolute bottom-0 bg-CC flex w-full h-[75px] justify-between z-30 items-center px-[18px] text-white">
            <div className=" absolute bottom-24">
              <div className=" font-medium text-xs text-DD">
                {post.createdAt}
              </div>
            </div>

            <div className=" flex items-center">
              {post.expectPrice !== undefined && (
                <div className="w-[90px]">
                  <div className="text-[12px] text-translucent5">책정가격</div>
                  <div>{post.expectPrice.toLocaleString("ko-KR")}원</div>
                </div>
              )}
              <img className=" px-1 mr-1 py-6" src={rightTriangle} />
              {post.userPrice !== undefined && (
                <div className="  w-[120px] flex-col">
                  <div className="text-[12px] text-translucent5">판매가격</div>
                  <div>{post.userPrice.toLocaleString("ko-KR")}원</div>
                </div>
              )}
            </div>

            <div className=" flex mt-1 w-[70px]">
              <div className="  flex-col w-6 text-[10px] text-translucent3 mr-5  ">
                <img onClick={onClickChatting} src={whiteChatting} />
                <div>채팅</div>
              </div>
              <div className="  flex-col w-6 text-[10px] text-translucent3   ">
                <img
                  onClick={() => {
                    navigate(`/postComment/${params.id}`);
                  }}
                  src={whiteComment}
                />
                <div>댓글</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PostDetail;
