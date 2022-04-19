import React from "react";
import { Form, Input, Radio } from "antd";
import { Button } from "reactstrap";
import axios from "axios";
import clientConfig from "../../../../../clientConfig";
import { toast } from "react-toastify";

const success_create = () => toast.success("کاربر شما با موفقیت ساخته شد!")
const error_create = (err) => toast.error(err)

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

const CreateUser = () => {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log(value);
    form.resetFields();
    axios
      .post(`${clientConfig.siteUrl}/wp-json/wp/v2/users`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((newUser) => {
        success_create()
        console.log(newUser)})
      .catch((err) => {
        switch(err.response.data.code){
          case "existing_user_login":
            error_create("نام کاربری وارد شده تکراری است !")
          case "existing_user_email":
            error_create("ایمیل وارد شده تکراری است !")
          default :
            error_create("مشکلی رخ داده است !")
        }
        // این قسمت تکمیل نشده است !
        console.log(err.response.data.code)
        console.log(err)});
  };
  const onFinishFailed = (value) => {
    console.log(value);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="ساخت کاربر جدید"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="نام کاربری : "
        name="username"
        rules={[
          {
            required: true,
            message: "لطفا نام کاربری را وارد کنید !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="پست الکترونیکی : "
        name="email"
        rules={[
          {
            required: true,
            message: "لطفا پست الکترونیکی را وارد کنید !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="نام کاربر : "
        name="first_name"
        rules={[
          {
            required: true,
            message: "لطفا نام کاربر را وارد کنید !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      label="نام خانوادگی کاربر : "
      name="last_name"
      rules={[
        {
          required: true,
          message: "لطفا نام خانوادگی را وارد کنید !",
        },
      ]}
    >
      <Input />
    </Form.Item>
    
      <Form.Item
        label="نام مستعار : "
        name="nickname"
        rules={[
          {
            required: true,
            message: "لطفا نام مستعار را وارد کنید !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="رمزعبور : "
        name="password"
        rules={[
          {
            required: true,
            message: "لطفا رمز عبور را وارد کنید !",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="معرفی کاربر : "
        name="description"
        rules={[
          {
            required: true,
            message: "لطفا  را وارد کنید !",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        className="text-right"
        name="roles"
        label="مسئولیت : "
        rules={[
          {
            required: true,
            message: "لطفا مسئولیت کاربر را مشخص کنید !",
          },
        ]}
      >
        <Radio.Group>
          <Radio.Button value="administrator">ادمین</Radio.Button>
          <Radio.Button value="editor">ویرایشگر</Radio.Button>
          <Radio.Button value="author">نویسنده</Radio.Button>
          <Radio.Button value="contributor">توسعه دهنده</Radio.Button>
          <Radio.Button value="subscriber">دنبال کننده</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item {...tailLayout} className="text-center mr-2">
        <Button htmlType="submit" type="submit" color="primary">
          ساخت کاربر
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
