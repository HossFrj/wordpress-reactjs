import React from "react";
import { Row, Col } from "reactstrap";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import clientConfig from "../../../clientConfig";
import { useState } from "react";

const MainDashboard = () => {
    const [getPosts , setPosts] = useState(0)
  const users_list = useSelector((state) => state.users);
  useEffect(()=>{
      axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`).then(
          posts => setPosts(posts.data.length)
      )
  })
  return (
    <Row>
      <Col
        className="dashboard-card  text-right"
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
      >
        <div className="danger-card bg-danger">
          <h4>تعداد کاربران</h4>
          <Divider />
          <p className="h3 text-center" style={{color:"white"}}>{users_list.length} کاربر</p>
        </div>
      </Col>
      <Col
        className="dashboard-card  text-right"
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
      >
        <div className="success-card bg-success">
          <h4>تعداد پست ها</h4>
          <Divider />
          <p className="text-center h3 " style={{color:"white"}}>{getPosts} پست</p>
        </div>
      </Col>
      <Col
        className="dashboard-card  text-right"
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
      >
        <div className="warning-card bg-warning">
          <h4>به زودی ...</h4>
          <Divider />
          <p>منتظر ایده از شماست</p>
        </div>
      </Col>
      <Col
        className="dashboard-card  text-right"
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
      >
        <div className="primary-card bg-primary">
          <h4>به زودی ...</h4>
          <Divider />
          <p>منتظر ایده از شماست</p>
        </div>
      </Col>
    </Row>
  );
};

export default MainDashboard;
