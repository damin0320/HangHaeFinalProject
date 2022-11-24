import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import MainList from "../components/MainList";
import Slide from "../components/Slide";
import LOGO from "../assets/LOGO.svg";
import { initialHeaderState } from "../redux/modules/PostsSlice";

const Main = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MoreSeeClick = () => {
    dispatch(
      initialHeaderState({
        paramObj: "all",
        pageNumber: 0,
        pageSize: 10,
        postSort: "postLikeCnt",
      })
    );
    navigate("/postread/all/postLikeCnt");
  };

  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <MainLogo>
          <Title>
            <img src={LOGO} />
          </Title>
          <br />

          <MYLIKE
            onClick={() => {
              navigate("/mylike");
            }}
          >
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.09008 21.06C5.82486 21.06 5.57051 20.9546 5.38297 20.7671C5.19544 20.5796 5.09008 20.3252 5.09008 20.06L4.94008 5.4C4.92804 5.10234 4.97496 4.80525 5.07815 4.52579C5.18135 4.24633 5.33877 3.99004 5.54137 3.77164C5.74396 3.55324 5.98774 3.37705 6.25868 3.25321C6.52961 3.12936 6.82236 3.0603 7.12008 3.05L16.7101 3C17.0082 3.00521 17.3024 3.06909 17.5758 3.18801C17.8492 3.30692 18.0965 3.47854 18.3036 3.69305C18.5107 3.90756 18.6735 4.16077 18.7827 4.43821C18.8919 4.71565 18.9454 5.01189 18.9401 5.31L19.0801 19.97C19.0818 20.1452 19.0374 20.3178 18.9514 20.4705C18.8654 20.6232 18.7408 20.7506 18.5901 20.84C18.4381 20.9278 18.2656 20.974 18.0901 20.974C17.9145 20.974 17.7421 20.9278 17.5901 20.84L11.8901 17.68L6.60008 20.91C6.44343 20.9975 6.26916 21.0488 6.09008 21.06V21.06ZM11.8501 15.51C12.0238 15.5103 12.1951 15.5514 12.3501 15.63L17.0601 18.24L16.9401 5.29C16.9401 5.09 16.8101 4.95 16.7301 4.96L7.13008 5.05C7.05008 5.05 6.94008 5.18 6.94008 5.38L7.06008 18.28L11.3401 15.65C11.4955 15.561 11.671 15.5128 11.8501 15.51V15.51Z"
                fill="black"
              />
            </svg>
          </MYLIKE>
        </MainLogo>

        <MainHeader Navigate={"/postread"} />

        <div>
          <Slide />
        </div>

        <Text>
          회원님을 위한 추천상품!
          <More_seebutton onClick={MoreSeeClick}>더보기 〉</More_seebutton>
        </Text>

        <MainList />

        <Diiiiv />

        <Footer />
      </Layout>
    </>
  );
};

export default Main;

const MainLogo = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;
const MYLIKE = styled.div`
  position: absolute;
  right: 15px;
  background-color: transparent;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  font: inter;
  margin-top: 40px;
  margin-left: 15px;
  position: relative;
  top: 10px;
  a {
    font-size: 12px;
    position: relative;
    left: 50px;
  }
`;
const More_seebutton = styled.button`
  width: 58px;
  height: 16px;
  border: 0;
  border-radius: 5px;
  outline: 0;
  opacity: 0.5;
  font-weight: 600;
  font-size: 12px;
  position: absolute;
  right: 15px;
  cursor: pointer;
  background-color: transparent;
`;

const Diiiiv = styled.div`
  height: 70px;
`;
