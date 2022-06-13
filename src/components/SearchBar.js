import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Input = styled.input`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
  border-radius: 8px;
  Width: 379px;
  Height: 47px;
  padding-left: 32px;
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.47);
  border: none;
`;

export const SearchBar = ({handleSearch}) => {

  return (
    <>
      <Input onChange={(event) => handleSearch(event.target.value)} placeholder='Search all launches...'></Input>
      <FontAwesomeIcon 
        style={{
          position: "relative",
          bottom: "36px",
          left: "8px",
          color: "rgba(255, 255, 255, 0.47)",
          pointerEvents: "none",
        }}
        icon={faSearch}/>
    </>
  )
}
