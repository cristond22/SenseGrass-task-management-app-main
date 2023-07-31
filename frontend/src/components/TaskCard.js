import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { deleteTaskById, updateTaskById } from "../utils/tasksUtility";

function TaskCard({ taskId, title, description, dueDate, status, onDelete }) {
  const [selectedStatus, setSelectedStatus] = useState(status);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    // Prepare the updated task data with the new status and other fields
    const updatedTaskData = {
      title,
      description,
      dueDate,
      status: newStatus,
    };

    // Update the status in the backend
    const updatedTask = await updateTaskById(taskId, updatedTaskData);
    // You can add error handling here if required

    console.log("Task status updated:", updatedTask);
  };

  return (
    <Card sx={{ maxWidth: 420, padding: "4px 8px", margin: "16px" }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Divider />
        <Typography variant="subtitle2" color="text.secondary" margin={"16px 0"}>
          {description}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.primary" margin={"16px 0"}>
          Due Date: {formatDate(dueDate)}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0px",
        }}
      >
        <RadioGroup row value={selectedStatus} onChange={handleStatusChange}>
          <FormControlLabel
            value="pending"
            control={<Radio size="small" />}
            label="pending"
          />
          <FormControlLabel
            value="ongoing"
            control={<Radio size="small" />}
            label="ongoing"
          />
          <FormControlLabel
            value="complete"
            control={<Radio size="small" />}
            label="complete"
          />
        </RadioGroup>
        <IconButton sx={{ color: "red", padding: "8px 0" }} onClick={()=>onDelete(taskId)}>
          <DeleteIcon />
        </IconButton>
        <Link to={`/edittask/${taskId}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TaskCard;