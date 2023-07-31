import { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Container, Box, Typography } from "@mui/material";
import { getTaskById, updateTaskById } from "../utils/tasksUtility";

const EditTaskForm = ({ taskId }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "", // Change the initial value of dueDate to an empty string
    status: "pending",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the task using the utility function
      await updateTaskById(taskId, taskData);
      // Redirect to the home page (replace this with the correct route for your home page)
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch the current task when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Get the task using the utility function
        const task = await getTaskById(taskId);
        // Set the form fields with the task values
        setTaskData(task);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  // Function to format the date from the backend to a valid date string for the input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle the case when dateString is empty or null
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Edit Task
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              padding: "16px 8px",
              borderRadius: "8px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                label="Description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="date"
                InputProps={{
                  placeholder: "Due date",
                }}
                value={formatDateForInput(taskData.dueDate)} // Format the date for the input field
                onChange={handleChange}
                name="dueDate" // Add the name attribute for the input field
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Button variant="contained" color="primary" type="submit">
                Update Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditTaskForm;
