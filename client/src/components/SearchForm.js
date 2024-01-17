import React from "react";
import searchIcon from "../assets/images/search.png";

const SearchForm = (props) => {
  return (
    <div className="header-search">
      <input
        type={props?.type}
        placeholder={props?.placeholder}
        style={{
          backgroundImage: `url(${searchIcon})`,
        }}
      />
      <button className="btn" style={{ marginRight: "20px" }}>
        {props?.btnName}
      </button>
    </div>
  );
};

export default SearchForm;
