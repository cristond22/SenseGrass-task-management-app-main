import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { deleteTaskById, getAllTasks } from "../utils/tasksUtility";

const statuses = ["pending", "ongoing", "complete"];

const TaskDetails = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    // Fetch all tasks from the backend when the component mounts
    const fetchTasks = async () => {
      const tasksData = await getAllTasks(sortByDate ? "dueDate" : null, filterStatus);
      // You can add error handling here if required

      setTasks(tasksData);
    };

    fetchTasks();
  }, [filterStatus, sortByDate]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortByDate(event.target.checked);
  };

  const handleTaskDeletion = async (taskId) => {
    await deleteTaskById(taskId);

    // After a task is deleted, we can update the tasks state by refetching all tasks
    const updatedTasks = await getAllTasks(sortByDate ? "dueDate" : null, filterStatus);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />
      <Box
        mt={10}
        sx={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Link to="/newtask">
            <Button variant="outlined">Create New Task</Button>
          </Link>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <FormControlLabel
            control={<Checkbox color="primary" checked={sortByDate} onChange={handleSortChange} />}
            label="Sort by Date"
          />
          <Box ml={2}>
            <TextField
              sx={{ minWidth: "180px" }}
              fullWidth
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>

      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            taskId={task._id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            status={task.status}
            onDelete = {handleTaskDeletion}
          />
        ))}
      </Box>
    </>
  );
};

export default TaskDetails;
