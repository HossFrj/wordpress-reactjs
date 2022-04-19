import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Divider, Input, Form, Button, Avatar, Typography } from "antd";
import axios from "axios";
import clientConfig from "../../../clientConfig";
import { toast } from "react-toastify";

const success_comment = () => toast.success("نظر شما با موفقیت ثبت شد !")
const error_comment = () => toast.error("مشکلی رخ داده است !")

const { Paragraph } = Typography;

const token = window.localStorage.getItem("token");

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const PostComment = ({ postId }) => {
  const [form] = Form.useForm();

  const [comment, setComment] = useState([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch === true) {
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/comments`)
        .then((comments) => {
          // console.log(comments.data)
          const filterComments = comments.data.filter(
            (comment) => comment.post === postId
          );
          setComment(filterComments);
          setFetch(false);
          
        })
        .catch((err) => {
          error_comment()
          console.log(err)});
    } else {
    }

    console.log(comment);
  });

  const onFinish = (value) => {
    form.resetFields()
    value = {
      ...value,
      post: postId,
      author: 1,
    };
    console.log(value);
    axios
      .post(`${clientConfig.siteUrl}/wp-json/wp/v2/comments`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setFetch(true);
        success_comment()
        // setComment(res.data.content.rendered)
      })
      .catch((err) =>{
        error_comment()
        console.log(err)});
  };
  const onFinishFailed = (err) => {
    console.log(err);
  };

  return (
    <Row>
      <Divider>نظرات شما عزیزان</Divider>
      <Col>
        {comment.length > 0
          ? comment.map((value) => {
              return (
                <Card>
                  <CardBody>
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: `#${Math.floor(
                          Math.random() * 1000000
                        )}`,
                      }}
                    >
                      {value.author_name}
                    </Avatar>{" "}
                    <Divider type="vertical" />{" "}
                    <span>{value.author_name} گفته :</span>
                    <Paragraph
                      style={{ marginRight: "55px" }}
                      ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: <a>ادامه نظر</a>,
                      }}
                    >
                      {(value.content.rendered)}
                    </Paragraph>
                  </CardBody>
                </Card>
              );
            })
          :<p style={{textAlign:"center"}}>نظری وجود ندارد !</p>}
      </Col>
      <Divider>ثبت نظر</Divider>
      <Col>
        <Form
          form={form}
          {...layout}
          name="نوشتن نظرات"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="نام شما :" name="author_name">
            <Input />
          </Form.Item>

          <Form.Item label="ایمیل شما :" name="author_email">
            <Input />
          </Form.Item>
          <Form.Item label="نظر شما :" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="submit" color="primary">
              ثبت نظر
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default PostComment;
