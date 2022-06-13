import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  float: right;
`;

const PageButton = styled.button`
  border-radius: 16px;
  Width: 32px;
  Height: 32px;
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.77);
  cursor: pointer;
  background: transparent;
  border: none;
  margin: 0 4px;
  ${(props) => props.selected && `background: rgba(255, 255, 255, 0.87); color: #2C2C2E; pointer-events: none;`}
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Dots = styled.span`
  Width: 32px;
  Height: 32px;
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.77);
  margin: 0 4px;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Paginator = ({ totalItems, currentPage, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / pageSize);
  
  const buildPages = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      if ((currentPage <= 3 && i <= 3) || (currentPage >= pageCount - 2 && i >= pageCount - 2) || currentPage === i || i === 1 || i === pageCount || pageCount <= 5) {
        pages.push(<PageButton key={i} onClick={() => onPageChange(i)} selected={currentPage === i}>{i}</PageButton>);
      }
      else if (i === 2 || i === pageCount-1) {
        pages.push(<Dots key={i}>...</Dots>);
      }
    }
    return pages;
  };

  return (
    <Container>
      {
        pageCount > 1 &&
          <FontAwesomeIcon 
            style={{
              display: "inline",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "16px",
              color: currentPage === 1 ? "rgba(255, 255, 255, 0.27)" : "white",
              pointerEvents: currentPage === 1 && "none",
            }}
            icon={faAngleLeft}
            onClick={() => onPageChange(currentPage-1)}/>
      }
      {
        buildPages().map((element) => (element))
      }
      {
        pageCount > 1 &&
          <FontAwesomeIcon 
            style={{
              display: "inline",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "16px",
              color: currentPage === pageCount ? "rgba(255, 255, 255, 0.27)" : "white",
              pointerEvents: currentPage === pageCount && "none",
            }}
            icon={faAngleRight}
            onClick={() => onPageChange(currentPage+1)}/>
      }
    </Container>
  )
}
