import React, { useEffect } from "react";
import { Table, Space, Button, Modal, Input , Form} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import clientConfig from "../../../../../clientConfig";
import { get_tags } from "../../../../../redux/actions";
import { toast } from "react-toastify";


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

const token = window.localStorage.getItem("token");

const success_create = () => toast.success("تگ مورد نظر با موفقیت ساخته شد !");
const success_delete = () => toast.warn("تگ مورد نظر با موفقیت حذف شد !");
const error_delete = () => toast.error("مشکلی رخ داده است !");

const TagsList = () => {
  const [form] = Form.useForm();
  const tags_list = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    if(tags_list.length === 0){
        axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/tags`,{
            headers:{
                "Authorization":`Bearer ${token}`
            },
            params:{
              per_page:100
            }
            
        }).then((tags) => {
            dispatch(get_tags(tags.data));
          });
    }else{

    }
    
  });

  const onFinish = (value) => {
    console.log(value);
    form.resetFields();
    axios
      .post(`${clientConfig.siteUrl}/wp-json/wp/v2/tags`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((newTag) => {
        success_create()
        console.log(newTag);
      })
      .catch((err) => {
        error_delete()
        console.log(err);
      });
  };
  const onFinishFailed = (value) => {
    console.log(value);
  };

  const columns = [
    { title: "نام تگ ها", key: "name", dataIndex: "name" },
    { title: "ID تگ ها", key: "id", dataIndex: "id" },
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
                    `${clientConfig.siteUrl}/wp-json/wp/v2/tags/${tags_list[index].id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      params: {
                        force: true,
                      },
                    }
                  )
                  .then((res) => {
                    success_delete();
                    console.log(res);
                  })
                  .catch((err) => {
                    error_delete();
                    console.log(err);
                  });
              }}
            >
              حذف
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="text-right">
      <Button
        type="primary"
        onClick={() => {
          Modal.info({
            title: "ساخت تگ جدید",
            content: (
              <Form
                form={form}
                {...layout}
                name="ساخت پست"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="عنوان تگ : "
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "لطفا عنوان تگ را وارد کنید !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="توضیحات تگ : "
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "لطفا محتویات تگ را وارد کنید !",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item {...tailLayout} className="text-center mr-2">
                  <Button htmlType="submit" type="submit" color="primary">
                    ساخت تگ
                  </Button>
                </Form.Item>
              </Form>
            ),
            onOk() {},
            okText:"بازگشت",
            okType:"danger"
          });
        }}
      >
        ساخت تگ جدید
      </Button>
      <Table
        className="users-list mt-3"
        columns={columns}
        dataSource={tags_list}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default TagsList;
