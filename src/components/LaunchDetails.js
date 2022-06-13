import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { useSearchParams, useNavigate } from "react-router-dom";
import { DataContext } from '../App';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { KEY } from './MainScreen';

const Container = styled.div`
  background: #131313;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 30px;
`;

const Name = styled.h1`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  display: flex;
  align-items: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 20px;
  margin: 5px 0;
`;

const ShortDetail = styled.h4`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 20px;
  margin: 5px 0;
  text-overflow: ellipsis;
  height: 25px;
  overflow: hidden;
`;

const Date = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 20px;
  margin: 5px 0;
`;

const Header = styled.div`
  ${(props) => props.image && `background-image: url(${props.image});`}
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 555px;
  width: 100%;
`;

const HeaderButtonsContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  padding-top: 240px;
`;

const HeaderButton = styled.button`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11)), #272727;
  Width: 55px;
  Height: 55px;
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.77);
  cursor: pointer;
  border: none;
`;

const Countbar = styled.div`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

const CountContainer = styled.div`
  padding: 0 90px;
  margin: 40px 0;
`;

const CountNumber = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
`;

const TextDetail = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.87);
  white-space: pre-wrap;
  margin-bottom: 0;
  & span {
    color: #7B7B7B;
  }
`;

const DescriptionContainer = styled.div`
  background: linear-gradient(180deg, #121212 0%, #1E1E1E 80.73%);
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 40px auto;
`;

const Title = styled.h3`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 0;
`;

const Description = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 0;
  width: 60%;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: 20px 0;
`;

const DetailImage = styled.div`
  height: 663px;
  width: 50%;
  ${(props) => props.image && `background-image: url(${props.image});`}
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const Details = styled.div`
  height: 663px;
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
`;

const OverviewRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.27);
`;

const Footer = styled.div`
  margin: 0 auto;
  width: 60%;
  padding: 20px;
`;

const FooterButton = styled.button`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1.25px;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.87);
  border-radius: 4px;
  padding: 10px;
  margin-top: 16px;
  cursor: pointer;
`;

const FooterText = styled.div`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
`;

export const LaunchDetails = () => {
  const { data, setData } = useContext(DataContext);
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();

  const launchId = searchParams.get("id");

  const {
    id,
    missionName,
    details,
    launchDateUnix,
    rocket,
    smallImage,
    image,
    favourite
  } = data.find((launch) => launch.id === launchId) || {};

  useEffect(() => {
    if (!id) {
      navigate("/");
    };
  }, []);

  const toggleFav = (id) => {
    const newData = [...data];
    const launch = newData.find((item) => item.id === id);
    if (launch) {
      launch.favourite = !launch.favourite;
      setData(newData);
      localStorage.setItem(KEY, JSON.stringify(newData.filter((item) => item.favourite)));
    }
  };

  return (
    <Container>
      <Header image={image}>
        <HeaderButtonsContainer>
          <HeaderButton onClick={() => (navigate("/"))}>
            <FontAwesomeIcon 
              style={{
                display: "inline",
                cursor: "pointer",
                fontSize: "24px",
                color: "rgba(255, 255, 255, 0.87)"
              }}
              icon={faAngleLeft} />
          </HeaderButton>
          <HeaderButton onClick={() => toggleFav(id)}>
            <FontAwesomeIcon 
              style={{
                display: "inline",
                cursor: "pointer",
                fontSize: "24px",
                color: favourite ? "rgba(255, 255, 255, 0.87)" : "rgba(255, 255, 255, 0.20)"
              }}
              icon={faStar} />
          </HeaderButton>
        </HeaderButtonsContainer>
        <HeaderInfoContainer>
          <Date>{moment.unix(launchDateUnix).format('MMMM Do, YYYY')}</Date>
          <Name>{missionName}</Name>
          <ShortDetail>{details}</ShortDetail>
        </HeaderInfoContainer>
      </Header>

      <Countbar>
        <CountContainer>
          <CountNumber>{parseInt(rocket?.first_stage?.burn_time_sec || 0)}</CountNumber>
          <TextDetail>{"TOTAL\nLAUNCHES"}</TextDetail>
        </CountContainer>
        <CountContainer style={{borderLeft: "1px solid rgba(255, 255, 255, 0.27)", borderRight: "1px solid rgba(255, 255, 255, 0.27)"}}>
          <CountNumber>{parseInt(rocket?.first_stage?.engines || 0)}</CountNumber>
          <TextDetail>{"TOTAL\nLANDINGS"}</TextDetail>
        </CountContainer>
        <CountContainer>
          <CountNumber>{parseInt(rocket?.first_stage?.fuel_amount_tons || 0)}</CountNumber>
          <TextDetail>{"REFLOWN\nROCKETS"}</TextDetail>
        </CountContainer>
      </Countbar>

      <DescriptionContainer>
        <Title>{"ABOUT LAUNCHED"}</Title>
        <Description>{rocket?.description}</Description>

        <DetailsContainer>
          <Details>
            <Title>{"OVERVIEW"}</Title>
            <OverviewRow>
              <TextDetail>{`HEIGHT`}</TextDetail>
              <TextDetail>{`${rocket?.height?.meters}m`}<span>{` / ${rocket?.height?.feet}ft`}</span></TextDetail>
            </OverviewRow>
            <OverviewRow>
              <TextDetail>{`DIAMETER`}</TextDetail>
              <TextDetail>{`${rocket?.diameter?.meters}m`}<span>{` / ${rocket?.diameter?.feet}ft`}</span></TextDetail>
            </OverviewRow>
            <OverviewRow>
              <TextDetail>{`MASS`}</TextDetail>
              <TextDetail>{`${rocket?.mass?.kg}kg`}<span>{` / ${rocket?.mass?.lb}lb`}</span></TextDetail>
            </OverviewRow>
          </Details>
          <DetailImage image={smallImage}></DetailImage>
        </DetailsContainer>
      </DescriptionContainer>

      <Footer>
        <FooterText>{"For information about our launch services, contact sales@spacex.com"}</FooterText>
        <FooterButton>{"DOWNLOAD USER'S GUIDE"}</FooterButton>
        <FooterButton style={{marginLeft: "30px"}}>{"CAPABILITIES AND SERVICES"}</FooterButton>
      </Footer>

    </Container>
  )
}
