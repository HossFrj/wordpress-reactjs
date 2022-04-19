import React from "react";
import MainLayout from "../../Layout/mainLayout";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Divider, Avatar } from "antd";

const User = ({ getUser }) => {
  console.log(getUser);
  return (
    <MainLayout activeRoute={["کاربران سایت",getUser.name]}>
      <Row>
        <Col>
          <h4>{getUser.name}</h4>
          <Card>
            <CardBody>
              <Row>
                <Col xs={4} sm={4} md={3} lg={2} xl={2}>
                  <Avatar src="http://0.gravatar.com/avatar/0207f4280f6c1bd45e1a2ed7cb1cca3d?s=96&d=mm&r=g" size={84} className="ml-3" />
                </Col>
                <Col xs={8} sm={8} md={9} lg={10} xl={10}>
                  <h4> پروفایل {getUser.name}</h4>
                  <p className="mt-5">{getUser.description}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default User;
