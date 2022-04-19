import React from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { check_login } from "../../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const randomColor = Math.floor(Math.random() * 1000000);

const exit_toast = () => toast.warn("شما با موفقیت خارج شدید !")

const AvatarDropdown = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch()
  const menu = (
    <Menu className="text-right">
      <Menu.Item key="0">
        <Link  className="none-link" to="/dashboard">صفحه داشبورد</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a className="none-link" href="https://toplearn.com/courses/4445/%D8%A2%D9%85%D9%88%D8%B2%D8%B4react-js-wordpress-(%D9%BE%D8%B1%D9%88%DA%98%D9%87-%D9%85%D8%AD%D9%88%D8%B1)">در انتظار ایده ...</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="text-right" key="3" style={{color:"red"}}
      onClick={()=>{
         dispatch(check_login(false))
         window.localStorage.clear()
         exit_toast()
      }}
      >خروج</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar
        className="login-avatar"
        size={46}
        style={{
          backgroundColor: `#${randomColor}`,
          color: randomColor === "#000000" ? "black" : "white",
        }}
      >
        {role}
      </Avatar>
    </Dropdown>
  );
};

export default AvatarDropdown;
