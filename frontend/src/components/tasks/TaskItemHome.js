import React, { useState, useContext } from "react";
import moment from "moment";
import "../../css/Modal.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, MenuItem } from "@material-ui/core";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

//Task item list for home and task page

const TaskItemHome = ({ task, showSideTaskDetails, sideTaskDetails }) => {
  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const [taskState, taskdispatch] = useContext(TaskContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      //---
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      // setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      // setInitialLoad(false);
    }
  };

  const handleTaskDelete = async (e) => {
    // console.log(task.id);
    handleMenuClose();
    await apiServer.delete(`/task/${task.id}`);
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  return (
    <>
      <div className="task-home-item">
        <div className="task-home-item-inner-container">
          <div className="task-home-item-inner-left" onClick={setTaskPopOut}>
            <div className="task-home-item-icon-container">
              {/* {task.completed ? (
                <RiCheckboxCircleLine
                  style={{ color: "green", fontSize: "16px" }}
                />
              ) : (
                <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
              )} */}
              <span className={`dot-task-${task.id}`}></span>
            </div>
            <div className="task-home-item-name-container">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  margin: "0px",
                }}
              >
                {task.name}
              </p>
              <p style={{ color: "grey", margin: "0" }}>
                {date.format("MMM D")}
              </p>
            </div>
          </div>
          <div
            className="task-home-item-more-menu"
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <AiOutlineEllipsis style={{ fontSize: "24px" }} />
          </div>
          <Menu
            style={{}}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      {/* <Modal open={open} onClose={closeModal}>
        {body}
      </Modal> */}
      {/* <TaskDetailsForm task={task} closeModal={closeModal} open={open} /> */}
    </>
  );
};

export default TaskItemHome;
