import React from "react";
import styles from "./TasksList.module.css";
import {
  privateAxiosInstance,
  TASKSURLS,
} from "../../../../constants/api/URLS";
import { motion } from "framer-motion";

type Status = "ToDo" | "InProgress" | "Done";
type Task = {
  id: number;
  title: string;
  description: string;
  status: Status;
};
type UserTasksResponse = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: Task[];
};

export default function TasksList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const tasksTodo = tasks.filter(({ status }) => status == "ToDo");
  const tasksInProgress = tasks.filter(({ status }) => status == "InProgress");
  const tasksDone = tasks.filter(({ status }) => status == "Done");
  const getAllAssignedTasks = async () => {
    try {
      const response = await privateAxiosInstance.get<UserTasksResponse>(
        TASKSURLS.GET_ASSIGNED_TASKS
      );
      setTasks(response.data?.data);
      console.log(response);
    } catch (error) {
      // toast message
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllAssignedTasks();
  }, []);
  return (
    <>
      <h1 className={styles.title}>Task Board</h1>
      <main className={styles["tasks-board"]}>
        <Column
          setTasks={setTasks}
          refetchTasks={getAllAssignedTasks}
          title="ToDo"
          tasks={tasksTodo}
        />
        <Column
          setTasks={setTasks}
          refetchTasks={getAllAssignedTasks}
          title="InProgress"
          tasks={tasksInProgress}
        />
        <Column
          setTasks={setTasks}
          refetchTasks={getAllAssignedTasks}
          title="Done"
          tasks={tasksDone}
        />
      </main>
    </>
  );
}

const Column = ({
  title,
  tasks,
  refetchTasks,
  setTasks,
}: {
  title: Status;
  tasks: Task[];
  refetchTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const changeStatus = async (id: string, status: string) => {
    try {
      await privateAxiosInstance.put(TASKSURLS.CHANGE_STATUS(id), {
        status,
      });
      await refetchTasks();
    } catch (error) {
      // toast
      console.log(error);
    }
  };
  return (
    <div className={styles.column}>
      <div className={styles["column-title"]}>{title}</div>
      <motion.div
        layout={true}
        layoutId={title}
        key={title}
        onDrop={async (e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("id");
          const prevStatus = e.dataTransfer.getData("prevStatus");
          if (prevStatus != title) {
            setTasks((prevTasks) => {
              const newTasks = prevTasks.map((task) => {
                if (task.id == +id) {
                  task.status = title;
                  return task;
                } else {
                  return task;
                }
              });
              return newTasks;
            });
            await changeStatus(id, title);
            await refetchTasks();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          console.log("onDragOver");
        }}
        className={styles["cards"]}
      >
        {tasks.map(({ title: taskTitle, id }) => (
          <motion.div
            layout={true}
            layoutId={id.toString()}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("id", id.toString());
              e.dataTransfer.setData("prevStatus", title);
            }}
            key={id}
            className={styles["card"]}
          >
            {taskTitle}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
