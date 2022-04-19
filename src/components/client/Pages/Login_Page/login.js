import React, { useState } from "react";
import MainLayout from "../../../Layout/mainLayout";
import { Input, Button } from "antd";
import { Row, Col } from "reactstrap";
import axios from "axios";
import clientConfig from "../../../../clientConfig";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { check_login, user_role } from "../../../../redux/actions";
import { toast } from "react-toastify";

const success_login = () => toast.success("ورود شما با موفقیت انجام شد !")
const error_login = () => toast.error("ورود شما ناموفق است!")

const Login = () => {

  

  const login = useSelector((state) => state.login);
  const role = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (value) => {
    console.log(value.target.value);
    setUsername(value.target.value);
  };

  const handlePassChange = (value) => {
    setPassword(value.target.value);
  };

  const handleSubmit = () => {
    console.log("clicked !");
    const validate = {
      username: username,
      password: password,
    };
    axios
      .post(`${clientConfig.siteUrl}/wp-json/jwt-auth/v1/token`, validate, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.localStorage.setItem("nice_name", res.data.user_nicename);
        window.localStorage.setItem("token", res.data.token);
        console.log(res, "is login response !");
        setPassword("");
        setUsername("");
        dispatch(check_login(true));
        dispatch(user_role(res.data.user_nicename));
        success_login()
        
      })
      .catch((err) => {
        error_login()
        console.error(err, "is login error !")});
  };
  if (
    window.localStorage.getItem("token") &&
    window.localStorage.getItem("nice_name") &&
    login === true
  ) {
    return <Redirect to="/" />;
  } else {
    return (
      <MainLayout activePage="" activeRoute={["صفحه ورود"]}>
      
        <Row className="text-center" style={{ marginTop: "70px" }}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-5">
            <h1 className="text-center">صفحه ورود</h1>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              className="login-input"
              placeholder="نام کاربری"
              onChange={handleUserChange}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input.Password
              className="login-input"
              placeholder="رمز عبور"
              onChange={handlePassChange}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              ورود
            </Button>
          </Col>
        </Row>
      </MainLayout>
    );
  }
};

export default Login;
