import React, { useContext, useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";

import Loader from "../Loader";

import { Context as TeamContext } from "../../context/store/TeamStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import "../../css/Forms.css";
const ProjectForm = ({
  handleNewClose,
  clickClose,
  open,
  setTeamProjects,
  showSideProjectForm,
}) => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [projectName, setProjectName] = useState();
  const [teamState, teamdispatch] = useContext(TeamContext);
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [users, setUsers] = useState();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const roles = localStorage.getItem("roles");
  const [error, setError] = useState();


  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const getAllUsers = async () => {
    const res = await apiServer.get("/users");
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  const onSubmit = async ({ name, teamId }) => {
    await apiServer.post(`/team/${teamId}/project/`, {
      name,
      userId,
    });

    //REFER TO THIS WHEN CHECKING FOR RERENDERING
    const res = await apiServer.get(`/project/user/${userId}`);
    await projectdispatch({ type: "get_user_projects", payload: res.data });
    const projectResponse = await apiServer.get(`/team/${teamId}`);
    // NOTE: One way this could work is if we recreate form for just team page add project form button
    // Will not work with top nav bar form
    // setTeamProjects(projectResponse.data.Projects);
    await teamdispatch({
      type: `get_team_projects${teamId}`,
      payload: projectResponse.data,
    });
    if (setTeamProjects) {
      const teamResponse = await apiServer.get(`/team/${teamId}`);
      setTeamProjects(teamResponse.data.Projects);
    }
    // window.location.reload();

    // clickClose();
    showSideProjectForm();
  };

  const clearError = () => {
    var teamSelect = document.getElementById("team-select");
    clearErrors(teamSelect.name);
  };
  const renderedTeams = teamState.teams.map((team, i) => {
    return (
      <option key={i} id={team.id} value={team.id}>
        {team.name}
      </option>
    );
  });

  if (loading) {
    return <Loader />;
  }
  console.log(users);
  const renderedUsers = users.map((user, i) => {
    return (
      <option key={i} id={user.id} value={user.id}>
        {user.name} - {user.email}
      </option>
    );
  });

  return (
    <>
      {/* <Modal open={open} onClose={clickClose}>
        <div className="modal-container"> */}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Project</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Project Name</label>
            </div>
            <div className="input-container">
              <input
                name="name"
                type="text"
                placeholder={"Project Name"}
                className="form-input"
                // onChange={clearError}
                onChange={handleNameChange}
                onKeyPress={handleUserKeyPress}
                ref={register({ required: true })}
              ></input>
              {errors.name?.type === "required" && (
                <p className="error-message">Please fill out project name</p>
              )}
            </div>
            <div className="label-container">
              <label className="form-label">Team</label>
            </div>
            <div className="input-container">
              <select
                id="team-select"
                name="teamId"
                className="form-input"
                ref={register({ required: true })}
              >
                {renderedTeams}
              </select>
              {errors.teamId?.type === "required" && (
                <p className="error-message">Please choose a team</p>
              )}
            </div>
            {(roles && roles == "Admin") && (
              <div>
              <div className="label-container">
                  <label className="form-label">Manager</label>
                </div>
              <div className="form-top-container">
                <div className="form-top-left">
                  <label className="form-label">
                    <select
                      id="user-select"
                      name="userId"
                      className="form-input"
                      onChange={() => setError("")}
                      ref={register({ required: true })}
                    >
                      <option value={0}>{"<---Choose user--->"}</option>
                      {renderedUsers}
                    </select>
                    <div className="error-message">{error}</div>
                    {errors.projectId?.type === "required" && (
                      <p className="error-message">Please choose a user to add</p>
                    )}
                  </label>
                </div>
                <div className="form-top-middle"></div>
                <div className="form-top-right"></div>
              </div>
              </div>
                    )}
          </div>
        </div>

        <div className="form-button-container">
          {/* marginLeft: "400px" */}
          <button
            className="cancel-button"
            onClick={showSideProjectForm}
            color="primary"
          >
            Cancel
          </button>
          <button
            className={
              projectName ? "submit-button enabled" : "submit-button disabled"
            }
            disabled={projectName ? false : true}
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </>
    //   </Modal>
    // </div>
  );
};

export default ProjectForm;
