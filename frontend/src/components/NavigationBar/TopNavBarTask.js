import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Navbar.css";
import UserAvatar from "./UserAvatar";
import { Menu, MenuItem } from "@material-ui/core";
import Search from "../../assets/search";
import messageIcon from "../../assets/message.png";
import Alert from "../../assets/alert";

const TopNavBarTask = () => {
  const { logout } = useContext(AuthContext);
  const [userState, userdispatch] = useContext(UserContext);
  const { name } = userState.user;
  const [taskState, taskdispatch] = useContext(TaskContext);
  const numTask = taskState.tasks.filter((task) => task.completed === true);

  const [anchorEle, setAnchorEle] = useState(null);


  const handleProfClick = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleProfClose = () => {
    setAnchorEle(null);
  };

  return (
    <div className="top-nav-bar-container" style={{}}>
      <div
        className="top-nav-bar-left"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ fontSize: "20px" }}>{name}'s Tasks</div>
        <p style={{}}>{numTask.length} completed tasks</p>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        <div
          className="top-nav-icons"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <Alert />
          </div>
          <div>
            <Search />
          </div>

          <div>
            <img className="logo" style={{}} src={messageIcon} alt="logo" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "0" }}>
            <UserAvatar id={localStorage.getItem("userId")} />
          </div>
          <div>{userState.user.name}</div>
          <div
            onClick={handleProfClick}
            style={{ padding: "0", cursor: "pointer" }}
          >
            <i className="arrow"></i>
          </div>
        </div>

        <Menu
          style={{ marginTop: "40px" }}
          anchorEl={anchorEle}
          keepMounted
          open={Boolean(anchorEle)}
          onClose={handleProfClose}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TopNavBarTask;
