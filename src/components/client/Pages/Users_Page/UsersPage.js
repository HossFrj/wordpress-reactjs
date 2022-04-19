import React, { useEffect, useState } from "react";
import MainLayout from "../../../Layout/mainLayout";
import axios from "axios";
import clientConfig from "../../../../clientConfig";
import { Row, Col } from "reactstrap";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../loader.gif";
import { change_loader } from "../../../../redux/actions";

const { Meta } = Card;

const UsersPage = () => {
  const loader = useSelector((state) => state.loader);
  const [getUsers, setGetUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUsers.length === 0) {
      dispatch(change_loader(false));
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/users`)
        .then((users) => {
          console.log(users);
          setGetUsers(users.data);
          dispatch(change_loader(true));
        })
        .catch((err) => console.log(err));
    }
  });

  console.log(getUsers);

  return loader === false ? (
    <img className="loader" src={Loader} alt="درحال بارگذاری ..." />
  ) : (
    <MainLayout activePage="usersList" activeRoute={["صفحه کاربران"]}>
      <Row>
        {getUsers.length > 0
          ? getUsers.map((user) => {
              return (
                <Col className="mt-3" xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Link className="none-link" to={`/users/${user.id}`}>
                    <Card
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt="عکس کاربران"
                          src="https://image.freepik.com/free-vector/pink-yellow-polygonal-background_1048-4944.jpg"
                        />
                      }
                    >
                      <Meta title={user.name} />
                    </Card>
                  </Link>
                </Col>
              );
            })
          : ""}
      </Row>
    </MainLayout>
  );
};

export default UsersPage;
