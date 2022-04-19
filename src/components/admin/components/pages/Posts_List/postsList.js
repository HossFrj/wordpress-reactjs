import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Divider,
  Input,
  Radio,
  Form,
  Modal,
  InputNumber,
  Select,
} from "antd";
import axios from "axios";
import clientConfig from "../../../../../clientConfig";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";

const { Option } = Select;

const token = window.localStorage.getItem("token");

const success_change = () => toast.success("تغییرات شما با موفقیت انجام شد !");
const success_delete = () => toast.warn("پست شما با موفقیت حذف شد !");
const error_toast = () => toast.error("مشکلی رخ داده است!");

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

const PostsList = () => {
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();
  const [fetch, setFetch] = useState(true);
  const [form] = Form.useForm();

  const onFinishFailed = (value) => {
    console.log(value);
  };

  const columns = [
    {
      title: "عنوان مطلب",
      dataIndex: "title",
      key: "title",
      render: (text) => text.rendered,
    },
    {
      title: "نویسنده مطلب",
      dataIndex: "uagb_author_info",
      key: "uagb_author_info",
      render: (text) => text.display_name,
    },
    {
      title: "ID مطلب",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "وضعیت انتشار",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a, b) => a.status - b.status,
      },
    },
    {
      title: "",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Button
              type="link"
              onClick={() => {
                axios
                  .delete(
                    `${clientConfig.siteUrl}/wp-json/wp/v2/posts/${posts[index].id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      params: {
                        force: true,
                        reassign: 1,
                      },
                    }
                  )
                  .then((deletedUser) => {
                    success_delete();
                    setFetch(true);
                    console.log(deletedUser);
                  })
                  .catch((err) => {
                    error_toast();
                    console.log(err);
                  });
                console.log(index);
              }}
            >
              حذف
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              onClick={() => {
                const onFinish = (value) => {
                  console.log(value);
                  form.resetFields();

                  axios
                    .put(
                      `${clientConfig.siteUrl}/wp-json/wp/v2/posts/${posts[index].id}`,
                      value,
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((changeUser) => {
                      success_change();
                      console.log(changeUser);
                      setFetch(true);
                    })
                    .catch((err) => {
                      error_toast();
                      console.log(err);
                    });
                };
                return Modal.info({
                  className: "change-info-modal",
                  title: <h3>پنجره تغییر اطلاعات</h3>,
                  width: 600,
                  content: (
                    <div>
                      <p>
                        در صورتی که از تغییرات خود مطمئن هستید ، آن را تایید
                        کنید.
                      </p>
                      <Form
                        form={form}
                        {...layout}
                        name="ساخت کاربر جدید"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                      >
                        <Form.Item label="عنوان مطلب : " name="title">
                          <Input />
                        </Form.Item>
                        <Form.Item label="متن مطلب : " name="content">
                          <Input.TextArea />
                        </Form.Item>

                        <Form.Item label=" نویسنده مطلب :" name="author">
                          <Select
                            className="text-right"
                           
                            placeholder="نویسنده مطلب را مشخص کنید."
                          >
                            {users.map((user) => {
                              return (
                                <Option className="text-right" value={user.id}>
                                  {user.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          className="text-right"
                          name="status"
                          label="وضعیت انتشار : "
                        >
                          <Radio.Group>
                            <Radio.Button value="publish">انتشار</Radio.Button>
                            <Radio.Button value="draft">متن آماده</Radio.Button>
                            <Radio.Button value="future">
                              متن آینده
                            </Radio.Button>
                            <Radio.Button value="pending">
                              در انتظار تایید
                            </Radio.Button>
                            <Radio.Button value="private">خصوصی</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                        <Divider />
                        <Form.Item {...tailLayout} className="text-center mr-2">
                          <Button
                            htmlType="submit"
                            type="submit"
                            color="primary"
                          >
                            تایید تغییر اطلاعات
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  ),

                  onOk() {},
                  okType: "danger",
                  okText: "بازگشت",
                });
              }}
            >
              تغییر
            </Button>
            <Divider type="vertical" />
            <Button type="link">
              <Link className="none-link" to={`/posts/${posts[index].id}`}>
                مشاهده پست
              </Link>
            </Button>
          </Space>
        );
      },
    },
  ];

  if (fetch === true) {
    axios
      .get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((posts) => {
        console.log(posts.data);
        setPosts(posts.data);
        setFetch(false);
      });
    axios
      .get(`${clientConfig.siteUrl}/wp-json/wp/v2/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((users) => {
        console.log(users.data);
        setUsers(users.data);
        setFetch(false);
      });
  } else {
  }

  return (
    <Table
      pagination={{ pageSize: 5 }}
      className="users-list"
      columns={columns}
      dataSource={posts}
    />
  );
};

export default PostsList;
