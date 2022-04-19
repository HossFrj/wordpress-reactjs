import React, { useState } from "react";
import { Table, Space, Button, Divider, Modal, Input, Form, Radio } from "antd";
import axios from "axios";
import clientConfig from "../../../../../clientConfig";
import { toast } from "react-toastify";

const token = window.localStorage.getItem("token");

const success_change = () => toast.success("تغییرات شما با موفقیت انجام شد !")
const success_delete = () => toast.warn("کاربر شما با موفقیت حذف شد !")
const error_toast = () => toast.error("مشکلی رخ داده است!")

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

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(true);
  

  const [form] = Form.useForm();

  const onFinishFailed = (value) => {
    console.log(value);
  };

  const columns = [
    {
      title: "نام کاربر",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "نام کاربری",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "ID کاربر",
      dataIndex: "id",
      key: "id",
      sorter:{
        compare: (a , b) => a.id - b.id
      }
      
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
                    `${clientConfig.siteUrl}/wp-json/wp/v2/users/${users[index].id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      params: {
                        "force": true,
                        "reassign":1,
                      },
                    }
                  )
                  .then((deletedUser) => {
                    success_delete()
                    setFetch(true);
                    console.log(deletedUser);
                  }).catch(err=>{
                    error_toast()
                    console.log(err)
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
                      `${clientConfig.siteUrl}/wp-json/wp/v2/users/${users[index].id}`,
                      value,
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((changeUser) =>{
                      success_change()
                      console.log(changeUser)})
                    .catch((err) => {
                      error_toast()
                      console.log(err)});
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
                      
                        <Form.Item
                          label="پست الکترونیکی : "
                          name="email"
                          
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="نام کاربر : "
                          name="first_name"
                          
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="نام خانوادگی کاربر : "
                          name="last_name"
                          
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="نام مستعار : "
                          name="nickname"
                          
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="رمزعبور : "
                          name="password"
                          
                        >
                          <Input.Password />
                        </Form.Item>
                        <Form.Item
                          label="معرفی کاربر : "
                          name="description"
                          
                        >
                          <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                          className="text-right"
                          name="roles"
                          label="مسئولیت : "
                          
                        >
                          <Radio.Group>
                            <Radio.Button value="administrator">
                              ادمین
                            </Radio.Button>
                            <Radio.Button value="editor">ویرایشگر</Radio.Button>
                            <Radio.Button value="author">نویسنده</Radio.Button>
                            <Radio.Button value="contributor">
                              توسعه دهنده
                            </Radio.Button>
                            <Radio.Button value="subscriber">
                              دنبال کننده
                            </Radio.Button>
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
          </Space>
        );
      },
    },
  ];

  if (fetch === true) {
    axios
      .get(`${clientConfig.siteUrl}/wp-json/wp/v2/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((getusers) => setUsers(getusers.data));
    setFetch(false);
  } else {
  }

  console.log(users);
  return <Table pagination={{pageSize:5}} className="users-list" columns={columns} dataSource={users} />;
};

export default UsersList;
