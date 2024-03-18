import React from "react";
import { FiPlus } from "react-icons/fi";
import "../../css/Project.css";
const NewProjectTile = ({ showSideProjectForm }) => {
  // const openModal = () => {
  //   setOpen(true);
  // };

  // const closeModal = () => {
  //   setOpen(false);
  // };
  // const modalBody = (
  //   <div className="modal-container">
  //     <ProjectForm clickClose={closeModal} open={open}></ProjectForm>
  //   </div>
  // );
  return (
    <div className="project-tile-container" onClick={showSideProjectForm}>
      <div className="project-tile-box">
        <div className="new-project-tile-icon-container">
          <FiPlus className="new-project-tile-icon" />
        </div>
      </div>
      <div className="project-tile-name">New Project</div>
    </div>
  );
};

export default NewProjectTile;
