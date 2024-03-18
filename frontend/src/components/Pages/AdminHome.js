import React, { useContext, useState, useEffect } from "react";

import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import apiServer from "../../config/apiServer";
import AddProjectPopOut from "../PopOutMenu/AddProjectPopOut";
import AddTaskPopOutTaskPage from "../PopOutMenu/AddTaskPopOutTaskPage";
import PopOutTaskDetailsHome from "../PopOutMenu/PopOutTaskDetailsHome";
import { List, ListItem, ListItemText } from '@mui/material';

const AdminPage = () => {
  const [userState] = useContext(UserContext);
  const [taskState] = useContext(TaskContext);
  const [sideTaskForm, setSideTaskForm] = useState(false);
  const [sideProjectForm, setSideProjectForm] = useState(false);
  const [sideTaskDetails, setSideTaskDetails] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await apiServer.get('/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs', error);
      }
    };
    fetchLogs();
  }, []);

  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideProjectForm(false);
    setSideTaskForm(!sideTaskForm);
  };

  const showSideProjectForm = () => {
    setSideTaskDetails(false);
    setSideTaskForm(false);
    setSideProjectForm(!sideProjectForm);
  };

  const showSideTaskDetails = () => {
    setSideTaskForm(false);
    setSideProjectForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  const uncompletedTasklist = taskState.tasks.filter(
    (task) => task.completed === false
  );

  const sortedTaskList = uncompletedTasklist.sort(function (a, b) {
    return new Date(b.due_date) - new Date(a.due_date);
  });

  const upcomingTasklist = sortedTaskList.slice(0, 9);

  const [projectLists, setProjectLists] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiServer.get(`/projects`);
        setProjectLists(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);
  const projectTiles = projectLists.map((project, i) => {
    return <ProjectTile project={project} key={i} id={project.id} />;
  });
  

  return (
    <>
      <TopNavBarHome />
      <div className="home-container">
        <div className="home-main-container">
          <div
            className="home-main-content-container"
            style={{ display: "flex" }}
          >
            <div
              className="home-inner-container"
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="home-welcome-header" style={{marginBottom: "20px"}}>
                <p className="home-welcome-message">
                  Hi, {userState.user.name}!
                </p>
                <p
                  style={{ display: "flex", margin: "0", alignSelf: "center" }}
                >
                  Welcome to your dashboard.
                </p>
              </div>
              <div className="home-task-project-container">
                <div className="home-logs-container" style={{marginTop: "70px", marginRight: "50px", maxHeight: "500px", overflowY: "scroll" }}>
                  <List>
                    {logs.map((log, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={log.message}
                          secondary={new Date(log.createdAt).toLocaleString()}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
                <div
                  className={
                    upcomingTasklist.length < 5
                      ? "home-projects-container--smaller"
                      : sideTaskForm || sideProjectForm || sideTaskDetails
                      ? "home-projects-container--small"
                      : "home-projects-container"
                  }
                  style={{ marginRight: "500px" }}
                >
                  <div className="home-projects-header" style={{marginTop: "300px"}}>
                    <div className="project-tiles-container">
                      {projectTiles}
                      <div onClick={showSideProjectForm} style={{ height: "60%" }}>
                        <NewProjectTile />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sideTaskForm ? (
              <AddTaskPopOutTaskPage
                showSideTaskForm={showSideTaskForm}
                title={"Add a Task"}
              />
            ) : null}
            {sideProjectForm ? (
              <AddProjectPopOut
                showSideProjectForm={showSideProjectForm}
                // setTeamProjects={setTeamProjects}
                title={"Add Project"}
              />
            ) : null}
            {sideTaskDetails && taskState.selectedTask ? (
              <PopOutTaskDetailsHome
                showSideTaskDetails={showSideTaskDetails}
                sideTaskDetails={sideTaskDetails}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
  
};

export default AdminPage;
