import React, { useState } from "react";
import "../../css/Navbar.css";
import { Modal } from "@material-ui/core";
import AddUserForm from "../Forms/AddUserForm";
import SeeUserForm from "../Forms/SeeUserForm";

const AllUsersIcon = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const modalBody = (
    <div className="modal-container">
      <SeeUserForm
        clickClose={closeModal}
        open={open}
      ></SeeUserForm>
    </div>
  );
  return (
    <div>
      <div
        className="team-member-container"
        onClick={openModal}
        style={{ cursor: "pointer" }}
      >
        <div className="team-member-name-container" style={{marginTop: "15px"}}>
          <div className="new-team-member-name">See All Users</div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default AllUsersIcon;
