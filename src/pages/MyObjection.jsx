import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyObjection } from "../redux/modules/MypageSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import styled from "styled-components";
import back from "../assets/back.png";
const MyObjection = () => {
  const { objections } = useSelector((state) => state.mypage);
  console.log(objections);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyObjection());
  }, []);
  const onClickHandler = () => {
    navigate("/mypage");
  };
  return (
    <div>
      <Layout>
        <HeadContainer>
          <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
          <span>
            <div>내 이의제기</div>
          </span>
        </HeadContainer>
        <hr />
        <PostList>
          <Posts>
            {objections.length > 0 && (
              <>
                {objections.map((objection) => {
                  return (
                    <SellerPost key={objection.issuesId}>
                      <img
                        src={objection.images[0].imgUrl}
                        onClick={() => {
                          navigate(`/ObjectionDetail/${objection.issuesId}`);
                        }}
                      />
                      <div>{objection.expectPrice}원</div>
                      <TitleEdit>{objection.title}</TitleEdit>
                      <LikeCnt>🤍{objection.likeCnt}</LikeCnt>
                    </SellerPost>
                  );
                })}
              </>
            )}
          </Posts>
          <Div></Div>
        </PostList>
        <Footer />
      </Layout>
    </div>
  );
};

export default MyObjection;
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 22px;

  img {
    position: absolute;
    left: 10px;
  }
`;

// 아이템

const PostList = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding-bottom: 140px;
`;

const Posts = styled.div`
  margin-bottom: 50px;
  overflow: auto;
`;

const Div = styled.div`
  height: 58px;
  background-color: white;
`;

const SellerPost = styled.div`
  float: left;
  margin-left: 20px;
  img {
    margin: auto;
    position: relative;
    display: flex;
    width: 160px;
    height: 160px;
    border-radius: 5px;
  }
`;

// 타이틀 글자 줄이기
const TitleEdit = styled.div`
  font-size: 12px;
`;
//찜하기
const LikeCnt = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #595959;
`;
