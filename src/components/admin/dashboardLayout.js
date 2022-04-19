import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  FormOutlined,
  CopyOutlined,
  UserAddOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainDashboard from "./components/main";
import CreatePost from "./components/pages/Create_Post/createPost";
import CreateUser from "./components/pages/Create_User/createUser";
import UsersList from "./components/pages/Users_List/usersList";
import { ToastContainer } from "react-toastify";
import PostsList from "./components/pages/Posts_List/postsList";
import TagsList from "./components/pages/Tags_List/tagsList";
import axios from "axios";
import clientConfig from "../../clientConfig";
import { get_users } from "../../redux/actions";

const token = window.localStorage.getItem("token");

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const D_Layout = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const users_list = useSelector((state) => state.users);
  const [key, setKey] = useState("main");

  useEffect(() => {
    if (users_list.length === 0) {
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((users) => {
          dispatch(get_users(users.data));
        });
    } else {
    }
  });

  if (login === true) {
    const checkMenu = () => {
      switch (key) {
        case "main":
          return <MainDashboard />;
        case "createPost":
          return <CreatePost />;
        case "createUser":
          return <CreateUser />;
        case "usersList":
          return <UsersList />;
        case "postsList":
          return <PostsList />;
        case "tagsList":
          return <TagsList />;
        default:
          return <p></p>;
      }
    };

    return (
      <Layout className="layout">
        <ToastContainer rtl={true} />
        <Header className="header">
          <div className="logo" />
          <Menu className="text-right" theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link className="none-link" to="/">
                صفحه اصلی
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: "20px" }}>
          <Layout
            className="site-layout-background2"
            style={{ padding: "24px 0" }}
          >
            <Sider
              className="site-layout-background2"
              width={200}
              style={{ borderLeft: "solid 1px black", paddingLeft: "1px" }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={[key]}
                // defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item
                  className="text-right"
                  key="main"
                  icon={<DashboardOutlined />}
                  onClick={() => {
                    setKey("main");
                  }}
                >
                  {""} اطلاعات کلی
                </Menu.Item>
                <SubMenu
                  className="text-right"
                  key="sub1"
                  icon={<CopyOutlined />}
                  title="تنظیمات پست ها"
                >
                  <Menu.Item
                    className="text-right"
                    key="createPost"
                    icon={<FormOutlined />}
                    onClick={() => setKey("createPost")}
                  >
                    ساخت پست
                  </Menu.Item>
                  <Menu.Item
                    className="text-right"
                    key="postsList"
                    icon={<FormOutlined />}
                    onClick={() => setKey("postsList")}
                  >
                    لیست پست ها
                  </Menu.Item>
                  <Menu.Item
                    className="text-right"
                    key="tagsList"
                    icon={<TagsOutlined />}
                    onClick={() => setKey("tagsList")}
                  >
                    لیست تگ ها
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="text-right"
                  key="sub2"
                  icon={<UserOutlined />}
                  title="تنظیمات کاربر ها"
                >
                  <Menu.Item
                    className="text-right"
                    key="createUser"
                    icon={<UserAddOutlined />}
                    onClick={() => setKey("createUser")}
                  >
                    ساخت کاربر
                  </Menu.Item>
                  <Menu.Item
                    className="text-right"
                    key="usersList"
                    icon={<UserAddOutlined />}
                    onClick={() => setKey("usersList")}
                  >
                    لیست کاربرها
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {checkMenu()}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  } else {
    return <Redirect to="/404" />;
  }
};

export default D_Layout;
