import React, { useEffect, useState, useContext } from "react";
import "../../css/Task.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Modal } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const SeeUserForm = ({ clickClose, open }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState({ name: "", email: "", password: "", roles: "" });

  const getAllUsers = async () => {
    const res = await apiServer.get("/users");
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleDelete = async (userId) => {
    try {
      await apiServer.delete(`/user/${userId}`);
      // Kada obrisem korisnika zelim ga ukloniti iz user state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };
  
  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditChange = (event) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await apiServer.put(`/user/${editUser.id}`, editUser);
      setUsers(users.map(user => user.id === editUser.id ? editUser : user));
      handleEditClose();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };
  

  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="tasklist-modal-container" style={{ minWidth: "auto" }}>
            <div className="card-container">
                {users.map((user) => (
            <Card key={user.id} style={{ margin: "10px" }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography color="textSecondary">
                  {user.email}
                </Typography>
                <IconButton aria-label="edit" onClick={() => handleEditOpen(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
            </div>
          
        </div>
      </Modal>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            value={editUser.name}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            value={editUser.email}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            value={editUser.password}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="roles"
            label="Roles"
            type="text"
            value={editUser.roles}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
};

export default SeeUserForm;
