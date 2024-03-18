import React, { useState } from "react";
import "../../css/Navbar.css";
import { FiPlus } from "react-icons/fi";
import { Modal } from "@material-ui/core";
import AddUserForm from "../Forms/AddUserForm";

const NewUserIcon = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const modalBody = (
    <div className="modal-container">
      <AddUserForm
        clickClose={closeModal}
        open={open}
      ></AddUserForm>
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
          <div className="new-team-member-name">Add New User</div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default NewUserIcon;
