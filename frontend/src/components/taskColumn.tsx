import {
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  Box,
  Button,
} from "@mui/material";
import { status, taskProps } from "../types";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import taskService from "../services/tasks";
import FormDialog from "./dialogForm";
import React from "react";
import { Task } from "../types";

const TaskColumn = ({
  tasks,
  setTasks,
}: taskProps & { setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
  const todoTasks = tasks
    ? tasks.filter((task) => task.status === status.toDo)
    : [];
  const inProgressTasks = tasks
    ? tasks.filter((task) => task.status === status.inProgress)
    : [];
  const finishedTasks = tasks
    ? tasks.filter((task) => task.status === status.finished)
    : [];

  const handleNextButton = async (taskId: string, method: status) => {
    try {
      const result = await taskService.updateTask(taskId, method);
      console.log("Update result: ", result);
      reRender();
      return result;
    } catch (err) {
      console.error("Error with handling button: ", err);
    }
  };

  const reRender = async () => {
    try {
      const newTasks = await taskService.getAll();
      setTasks(newTasks);
    } catch (err) {
      console.error("Error fetching tasks: ", err);
    }
  };

  const handleDeleteButton = async (taskId: string) => {
    try {
      const result = await taskService.deleteTask(taskId);
      console.log("Delete result: ", result);
      reRender();
      return result;
    } catch (err) {
      console.error("Error with handling button: ", err);
    } finally {
      reRender();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              To Do
            </Typography>
            {todoTasks.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No tasks in this column
              </Typography>
            ) : (
              <List dense={false}>
                {todoTasks.map((task) => (
                  <ListItem key={task.id}>
                    <Card variant="outlined" className="task-card">
                      <CardContent>
                        <Typography variant="body1" color="textPrimary">
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          id="inProgressButton"
                          name="inProgressButton"
                          endIcon={<SendIcon />}
                          onClick={() =>
                            handleNextButton(
                              JSON.stringify(task.id),
                              status.inProgress
                            )
                          }
                        >
                          In Progress
                        </Button>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
          <Box display="flex" justifyContent="flex-end" p={2}>
            {/* <IconButton aria-label='add' title='Add task'>
                <AddTaskIcon />
          </IconButton> */}
            <FormDialog setTasks={setTasks} />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              In Progress
            </Typography>
            {inProgressTasks.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No tasks in this column.
              </Typography>
            ) : (
              <List dense={false}>
                {inProgressTasks.map((task) => (
                  <ListItem key={task.id}>
                    <Card variant="outlined" className="task-card">
                      <CardContent>
                        <Typography variant="body1" color="textPrimary">
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          id="finishedButton"
                          name="finishedButton"
                          endIcon={<SendIcon />}
                          onClick={() =>
                            handleNextButton(
                              JSON.stringify(task.id),
                              status.finished
                            )
                          }
                        >
                          Finished
                        </Button>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Finished
            </Typography>
            {finishedTasks.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No tasks in this column.
              </Typography>
            ) : (
              <List dense={false}>
                {finishedTasks.map((task) => (
                  <ListItem key={task.id}>
                    <Card variant="outlined" className="task-card">
                      <CardContent>
                        <Typography variant="body1" color="textPrimary">
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          id="deleteButton"
                          name="deleteButton"
                          endIcon={<DeleteIcon />}
                          onClick={() =>
                            handleDeleteButton(JSON.stringify(task.id))
                          }
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskColumn;
