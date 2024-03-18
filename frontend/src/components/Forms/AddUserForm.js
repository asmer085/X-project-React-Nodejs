import React, { useEffect, useState, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import AuthContext from "../../context/AuthContext";

const AddUserForm = ({ clickClose, open }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);


    const onSubmit = async ({ name, email, password }) => {
        setLoading(true);
        clickClose();
        try {
          const res = await apiServer.post("/register", { name, email, password });

          setErrorMessage("");
          setUser(res.data);
          setAuth(res.data.token);
          setEmail(res.data.email);
          setUserId(res.data.id);
        } catch (err) {
            setLoading(false);
            console.log(err.status);
            setErrorMessage("Something went wrong with registering");
          }
        };


  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="tasklist-modal-container" style={{ minWidth: "350px" }}>
        <form className="register-page--form" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            ref={register({ required: true })}
          ></input>
          {errors.name?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter your full name
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="email"
            ref={register({ required: true })}
          ></input>
          {errors.email?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter an email address
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
          ></input>
          {errors.password?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter a password
            </p>
          )}
        </div>
        <button type="submit">{loading ? "Adding User..." : "Add User"}</button>
        {errorMessage ? (
          <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
        ) : null}
      </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserForm;
