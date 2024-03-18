import React, { useContext } from "react";
import moment from "moment";
import "../../css/Modal.css";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

//Task item list for home and task page

const TaskItemTask = ({
  task,
  showSideTaskDetails,
  sideTaskDetails,
  setInitialLoad,
}) => {
  const [taskState, taskdispatch] = useContext(TaskContext);

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      //---
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      setInitialLoad(false);
    }
  };


  return (
    <>
      <li className="task-task-item" onClick={setTaskPopOut}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {task.completed ? (
            <RiCheckboxCircleLine
              style={{ color: "green", fontSize: "16px" }}
            />
          ) : (
            <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
          )}
          <p
            style={{
              paddingLeft: "5px",
              color: "gray",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            {task.name}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={`task-project-home-name-container task-project-${task.Project.id}`}
          >
            <p
              style={{
                margin: "0px",
                padding: "5px",
                fontSize: "12px",
                fontWeight: "500",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {task.Project.name}
            </p>
          </div>
          <div
            style={{
              width: "73px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                color: "gray",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {date.format("MMM D YYYY")}
            </p>
          </div>
        </div>
      </li>
      {/* <Modal open={open} onClose={closeModal}>
        {body}
      </Modal> */}
    </>
  );
};

export default TaskItemTask;
