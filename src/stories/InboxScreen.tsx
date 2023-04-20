import { useEffect } from "react";
import { fetchTasks, selectError, useAppDispatch } from "./store";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";

const InboxScreen = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  );
};

export default InboxScreen;
