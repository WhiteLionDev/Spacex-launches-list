import React, { useState, useEffect, useContext } from 'react'
import { getLaunches, getRockets } from '../services/service';
import { LauchCard } from './LauchCard';
import styled from 'styled-components';
import spacex from '../assets/spacex1.png';
import { SearchBar } from './SearchBar';
import { Paginator } from './Paginator';
import SyncLoader from "react-spinners/SyncLoader";
import { DataContext } from '../App';

export const KEY = "lauchs.favourites";

const Logo = styled.img`
  margin: 0 auto;
  display: block;
`;

const MainContainer = styled.div`
  background: #121212;
  min-width: 100vw;
  min-height: 100vh;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  padding: 0;
  margin: 0 auto;
  min-height: 632px;
  max-width: 1400px;
`;

const Header = styled.div`
  background: linear-gradient(180deg, #121212 64.11%, #1E1E1E 100%);
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
  height: 178px;
  padding: 28px 60px 0 60px;
`;

const Body = styled.div`
  padding: 28px 60px 0 60px;
`;

const Footer = styled.div`
  padding: 30px 100px 60px 60px;
`;

const Title = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.87);
  padding-top: 32px;
  margin: 0;
`;

const Tab = styled.button`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  margin-top: 35px;
  width: 180px;
  border: none;
  cursor: pointer;
  ${(props) => props.selected && `border-bottom: 2px solid;`}
`;

const Total = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.47);
  margin: 0;
`;

const Mark = styled.p`
  font-family: 'D-DIN';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
  display: inline;
`;

const Loader = styled.div`
  min-height: 532px;
  display: flex;
  padding-top: 100px;
  justify-content: center;
`;

export const MainScreen = () => {
  const { data, setData } = useContext(DataContext);
  const [tab, setTab] = useState("All");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;

  useEffect(() => {
    const loadData = async () => {
      const launches = await getLaunches();
      const rockets = await getRockets();
      const storedFavourites = JSON.parse(localStorage.getItem(KEY));

      console.log("launches", launches);
      console.log("rockets", rockets);

      if (launches && rockets) {
        const resultData = launches.map((launch) => {
          return {
            id: `${launch.flight_number}-${launch.launch_date_unix}`,
            flightNumber: launch.flight_number,
            missionName: launch.mission_name,
            details: launch.details,
            launchDateUnix: launch.launch_date_unix,
            rocket: rockets.find((item) => item.rocket_id === launch.rocket?.rocket_id),
            image: launch.links?.mission_patch,
            smallImage: launch.links?.mission_patch_small,
            favourite: storedFavourites ? storedFavourites.find((item) => item.id === `${launch.flight_number}-${launch.launch_date_unix}`)?.favourite : false
          }
        }).sort((a, b) => b.launch_date_unix - a.launch_date_unix);

        setData(resultData);
      }
      setLoading(false);
    }

    loadData();
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

  const handleTabChange = (text) => {
    setTab(text);
    setCurrentPage(1);
  };

  const handleSearch = (text) => {
    setFilter(text);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterData = () => {
    const term = filter?.trim().toLowerCase();
    const filteredData = data.filter((item) => {
      if (tab === "Favourites") {
        return item.favourite && ((term) ? item.missionName.toLowerCase().includes(term) : true);
      }
      else {
        return (term) ? item.missionName.toLowerCase().includes(term) : true;
      }
    });

    return filteredData;
  };

  return (
    <MainContainer>
      <Header>
        <Logo src={spacex}/>
        <Title>{"Launches"}</Title>
        <Tab onClick={() => handleTabChange("All")} selected={tab === "All"}>{"All"}</Tab>
        <Tab onClick={() => handleTabChange("Favourites")} selected={tab === "Favourites"} style={{marginLeft: "0px"}}>{"Favourites"}</Tab>
      </Header>
      <Body>
        <SearchBar handleSearch={handleSearch}/>
        <Total>{`Total (${filterData().length})`}</Total>
        {
          loading ?
            <Loader>
              <SyncLoader color={"rgba(255, 255, 255, 0.47)"} loading={loading} size={20} />
            </Loader>
          :
          <List>
            {
              filterData().slice((currentPage * pageSize) - pageSize, currentPage * pageSize).map((launch, index) => (
                <LauchCard key={index} launch={launch} toggleFav={toggleFav}/>
              ))
            }
          </List>
        }
      </Body>
      <Footer>
        <Mark>{"SPACEX@2021"}</Mark>
        <Paginator totalItems={filterData().length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange}/>
      </Footer>
    </MainContainer>
  )
}
