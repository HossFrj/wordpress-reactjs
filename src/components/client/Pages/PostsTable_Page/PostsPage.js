import React, { useState, useEffect } from "react";
import MainLayout from "../../../Layout/mainLayout";
import { Table, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import clientConfig from "../../../../clientConfig";
import "moment/locale/fa";
import { useSelector, useDispatch } from "react-redux";
import { get_tags, change_loader } from "../../../../redux/actions";
import Loader from "../../../../loader.gif";

const PostsPage = () => {
  const loader = useSelector((state) => state.loader);
  const [getData, setGetData] = useState([]);

  const all_tags = useSelector((state) => state.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getData.length === 0) {
      dispatch(change_loader(false));
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts?per_page=100`)
        .then((posts) => {
          console.log(posts.data);
          setGetData(posts.data);
        });
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/tags`)
        .then((tags_list) =>{
          dispatch(change_loader(true))
          dispatch(get_tags(tags_list.data))});
    } else {
    }
  });

  const columns = [
    {
      title: "نام پست",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text.rendered}</p>,
    },
    {
      title: "تاریخ انتشار",
      dataIndex: "date",
      key: "date",

    },
    {
      title: "نام نویسنده",
      dataIndex: "",
      key: "",
      render: (author) => (
        <Link className="none-link" to={`/users/${author.author}`}>
          {author.uagb_author_info.display_name}
        </Link>
      ),
    },
    {
      title: "تگ ها",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => {
        if (tags.length > 0) {
          return tags.map((tag) => {
            let tagId = tag;
            let foundTag = all_tags.find((tag) => tag.id === tagId);
            return foundTag ? (
              <Tag color={`#${Math.floor(Math.random() * 1000000)}`}>
                {foundTag.name}
              </Tag>
            ) : (
              ""
            );
          });
        } else {
          return "تگی وجود ندارد !";
        }
      },
    },
    {
      title: "",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Link className="none-link" to={`/posts/${getData[index].id}`}>
            مشاهده مطلب
          </Link>
        </Space>
      ),
    },
  ];

  return loader === false ? (
    <img className="loader" src={Loader} alt="درحال بارگذاری ..." />
  ) : (
    <MainLayout activePage="postsList" activeRoute={["صفحه پست ها"]}>
      <Table
        pagination={{ pageSize: 200 }}
        dataSource={getData}
        columns={columns}
        style={{ textAlignLast: "center" }}
      />
    </MainLayout>
  );
};

export default PostsPage;
