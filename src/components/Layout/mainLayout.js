import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { change_loader } from "../../redux/actions";
import AvatarDropdown from "./dropdown";
import { ToastContainer } from "react-toastify";

const { Header, Content, Footer } = Layout;


const MainLayout = (props) => {
  const login = useSelector((state) => state.login);

  const dispatch = useDispatch();

  return (
    <Layout className="layout">
      <ToastContainer rtl={true} />
      <Header>
        <div className="logo" />
        <Menu
          className="text-right"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[props.activePage]}
        >
          <Menu.Item
            key="main"
            onClick={() => {
              dispatch(change_loader(false));
            }}
          >
            <Link className="none-link" to="/">
              صفحه اصلی
            </Link>
          </Menu.Item>
          <Menu.Item key="postsList">
            <Link className="none-link" to="/posts">
              لیست پست ها
            </Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link className="none-link" to="/categories">
              دسته بندی مطالب
            </Link>
          </Menu.Item>
          <Menu.Item key="usersList">
            <Link className="none-link" to="/users">
              کاربران سایت
            </Link>
          </Menu.Item>
          

          {login === true ? (
            <Menu.Item key="dashboard">
              <Link
                className="none-link"
                to="/dashboard"
                style={{ color: "deepskyblue" }}
              >
                صفحه داشبورد
              </Link>
            </Menu.Item>
          ) : (
            ""
          )}

          {login === true ? (
            <AvatarDropdown />
          ) : (
            <Link className="none-link" to="/login">
              <Button className="login-btn" color="primary" type="submit">
                صفحه ورود
              </Button>
            </Link>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb className="text-right" style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/" className="none-link">
              صفحه اصلی
            </Link>
          </Breadcrumb.Item>
          {props.activeRoute && props.activeRoute.length > 0
            ? props.activeRoute.map((route) => (
                <Breadcrumb.Item>{route}</Breadcrumb.Item>
              ))
            : ""}
        </Breadcrumb>
        <div className="site-layout-content text-right">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>@ساخته شده توسط Sm.S1382</Footer>
    </Layout>
  );
};

export default MainLayout;
