import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

import styles from "./TaskForm.module.css";

import { ITask } from "../interfaces/Task";

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>; //alterar o state de uma lista
  task?: ITask | null;
  handleUpdDate?(id:number, title:string, difficulty: number): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdDate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdDate) {
      handleUpdDate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000); //criar o id e facilmente poder deletar a task
      const newTask: ITask = { id, title, difficulty };

      setTaskList!([...taskList, newTask]); //a exclamação força o TS a entender que a informação vai vir

      setTitle("");
      setDifficulty(0);
    }
  }; //inclusão das tarefas no sistema

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  }; //vai manusear as alterações do input

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título: </label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Título da tarefa"
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade: </label>
        <input
          type="text"
          name="difficulty"
          value={difficulty}
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
