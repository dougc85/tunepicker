import React from 'react';
import styled from 'styled-components';
import { fonts } from '../../partials/variables.styled';

const SortByStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: 1rem;
  margin-top: ${props => {
    console.log(props.marginTop);
    return props.marginTop
  }};

  label {
    font-weight: bold;
    font-size: 1.2rem;
  }

  select {
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
  }
`



function SortBy(props) {

  const { dispatch, sortedBy, songList, marginTop } = props;

  const sortOptions = [
    "Title - Ascending",
    "Title - Descending",
    "Knowledge",
    "Date Created - Old To New",
    "Date Created - New To Old",
  ]

  function handleSelectChange(e) {
    if (e.target.value === "Title - Ascending") {
      dispatch({ sortMethod: "Title - Ascending", payload: songList });
    } else if (e.target.value === "Title - Descending") {
      dispatch({ sortMethod: "Title - Descending", payload: songList });
    } else if (e.target.value === "Date Created - Old To New") {
      dispatch({ sortMethod: "Date Created - Old To New", payload: songList });
    } else if (e.target.value === "Date Created - New To Old") {
      dispatch({ sortMethod: "Date Created - New To Old", payload: songList });
    } else if (e.target.value === "Knowledge") {
      dispatch({ sortMethod: "Knowledge", payload: songList });
    }
  }

  return (
    <SortByStyled marginTop={marginTop}>
      <label htmlFor="sorting">Sort By:</label>
      <select id="sorting" onChange={handleSelectChange} value={sortedBy}>
        {sortOptions.map((key) => {
          return (
            <option value={key} key={key}>{key}</option>
          )
        })}
      </select>
    </SortByStyled>
  )
}

export default SortBy;