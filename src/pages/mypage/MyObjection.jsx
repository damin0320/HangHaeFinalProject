import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyObjection } from "../../redux/modules/MypageSlice";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import styled from "styled-components";
import backArrow from "../../assets/backArrow.svg";
import mainHeart from "../../assets/mainHeart.svg";

const MyObjection = () => {
  const { objections } = useSelector((state) => state.mypage);
  console.log(objections);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyObjection());
  }, []);
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <img
          className="h-6 w-6 absolute  left-3"
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>내 이의제기</div>
      </div>

      <div className=" flex relative p-3 mt-5 ">
        {objections &&
          objections.map((objection) => {
            return (
              <div
                className="bg-white p-2 mx-1 mt-2 rounded-md drop-shadow-lg"
                key={objection.issuesId}
                onClick={() => {
                  navigate(`/PostDetail/${objection.issuesId}`);
                }}
              >
                <img
                  className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-md  "
                  src={objection.images[0].imgUrl}
                />
                <div className=" p-1">
                  <div>{objection.expectPrice.toLocaleString("ko-KR")}원</div>
                  <div className="text-sm  text-OO">{objection.title}</div>
                  <div className="flex text-xs ">
                    <img src={mainHeart} />
                    <div className="ml-1 text-DD">{objection.likeCnt}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="h-16" />
      <Footer />
    </Layout>
  );
};

export default MyObjection;
