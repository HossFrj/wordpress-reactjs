import React, { Component, useEffect } from "react";
import "../styles/App.css";
import Posts from "./client/main";
import axios from "axios";
import clientConfig from "../clientConfig";
import { useDispatch } from "react-redux";
import { get_tags } from "../redux/actions";

// const data={
//   "username":"toplearnadmin",
//   "password":"1234"
// }

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${clientConfig.siteUrl}/wp-json/wp/v2/tags`)
      .then((tags_list) => dispatch(get_tags(tags_list.data)));
  });

  return (
    <div className="App">
      <Posts />
    </div>
  );
};

export default Main;
