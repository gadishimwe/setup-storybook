import { useSelector } from "react-redux";
import TaskItem from "./Task";
import {
  selectStatus,
  selectTasks,
  updateTaskState,
  useAppDispatch,
} from "./store";

const TaskList = () => {
  const dispatch = useAppDispatch();

  const tasks = useSelector(selectTasks);

  const status = useSelector(selectStatus);

  const pinTask = (taskId: string) => {
    dispatch(updateTaskState({ id: taskId, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (taskId: string) => {
    dispatch(updateTaskState({ id: taskId, newTaskState: "TASK_ARCHIVED" }));
  };
  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        Loading...
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onPinTask={(taskId) => pinTask(taskId)}
          onArchiveTask={(taskId) => archiveTask(taskId)}
        />
      ))}
    </div>
  );
};

export default TaskList;
