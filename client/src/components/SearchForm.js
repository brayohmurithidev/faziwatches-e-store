import React, { useState } from "react";
import searchIcon from "../assets/images/search.png";
import { useNavigate } from "react-router-dom";

const SearchForm = (props) => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  return (
    <div className="header-search">
      <input
        type={props?.type}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props?.placeholder}
        style={{
          backgroundImage: `url(${searchIcon})`,
        }}
      />
      <button
        className="btn"
        style={{ marginRight: "20px" }}
        onClick={() => navigate(`/products?search=${value}`)}
      >
        {props?.btnName}
      </button>
    </div>
  );
};

export default SearchForm;
