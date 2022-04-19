import React from "react";
import { Form, Input, Radio, Select } from "antd";
import { Button } from "reactstrap";
import axios from "axios";
import clientConfig from "../../../../../clientConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const { Option } = Select;

const success_create = (text) => toast.success(text);
const error_create = () => toast.error("مشکلی رخ داده است !");

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

const CreatePost = () => {
  const tags_list = useSelector((state) => state.tags);
  const users_list = useSelector((state) => state.users);

  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (cats.length === 0) {
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/categories`)
        .then((cats) => {
          setCats(cats.data);
          console.log(cats);
        });
    }
  });

  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log(value);
    form.resetFields();
    axios
      .post(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((newPost) => {
        success_create(
          `پست ${newPost.data.title.rendered} با موفقیت انجام شد !`
        );
        console.log(newPost);
      })
      .catch((err) => {
        error_create();
        console.log(err);
      });
  };
  const onFinishFailed = (value) => {
    console.log(value);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="ساخت پست"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="عنوان مطلب : "
        name="title"
        rules={[
          {
            required: true,
            message: "لطفا عنوان مطلب را وارد کنید !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="محتویات مطلب : "
        name="content"
        rules={[
          {
            required: true,
            message: "لطفا محتویات مطلب را وارد کنید !",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="نویسنده مطلب :" name="author">
        <Select className="text-right" placeholder="نویسنده مطلب را مشخص کنید.">
          {users_list.map((user) => {
            return (
              <Option className="text-right" value={user.id}>
                {user.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="تگ های مطلب :" name="tags">
        <Select
          className="text-right"
          mode="multiple"
          placeholder="تگ های مورد نظر را انتخاب کنید."
        >
          {tags_list.map((tag) => {
            return (
              <Option className="text-right" value={tag.id}>
                {tag.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="دسته بندی های مطلب :" name="categories">
        <Select
          className="text-right"
          
          placeholder="دسته بندی های مورد نظر را انتخاب کنید."
        >
          {cats.length > 0
            ? cats.map((cat) => {
                return (
                  <Option className="text-right" value={cat.id}>
                    {cat.name}
                  </Option>
                );
              })
            : ""}
        </Select>
      </Form.Item>

      <Form.Item
        className="text-right"
        name="status"
        label="وضعیت انتشار : "
        rules={[
          {
            required: true,
            message: "لطفا وضعیت انتشار را مشخص کنید !",
          },
        ]}
      >
        <Radio.Group>
          <Radio.Button value="publish">انتشار</Radio.Button>
          <Radio.Button value="draft">متن آماده</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item {...tailLayout} className="text-center mr-2">
        <Button htmlType="submit" type="submit" color="primary">
          ساخت پست
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;
