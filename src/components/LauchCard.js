import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Launch = styled.li`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  list-style-type: none;
  Width: 413px;
  Height: 286px;
  margin: 15px 0;
  display: inline-block;
  margin-right: 30px;
`;

const Image = styled.img`
  border-radius: 8px;
  Width: 100%;
  Height: 157px;
`;

const Name = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 20px;
  margin: 5px 0;
`;

const Detail = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
  line-height: 22px;
  color: rgba(255, 255, 255, 0.37);
  padding: 0 20px;
  margin: 5px 0;
  display: inline;
`;

export const LauchCard = ({launch, toggleFav}) => {
  const {
    id,
    missionName,
    details,
    launchDateUnix,
    smallImage,
    favourite
   } = launch;

  return (
    <Launch>
      <Link to={`/details?id=${id}`}>
        <Image src={smallImage}/>
      </Link>
      <Name>{missionName}</Name>
      <Detail>{details}</Detail>
      <Date>{moment.unix(launchDateUnix).format('MMMM Do, YYYY')}</Date>
      <FontAwesomeIcon 
        style={{
          float: "right",
          marginRight: "10px",
          display: "inline",
          color: favourite ? "rgba(255, 255, 255, 0.87)" : "rgba(255, 255, 255, 0.20)",
          fontSize: "20px",
          cursor: "pointer"
        }}
        icon={faStar}
        onClick={() => toggleFav(id)}/>
    </Launch>
  )
}
