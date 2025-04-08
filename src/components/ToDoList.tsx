import { useState } from "react";

type ToDo = {
    name: string;
    done: boolean;
};



const TodoList = () => {
    const [toDos, setTodos] = useState<ToDo[]>([]);
    const [input, setInput] = useState<string>("");
    
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        setInput(event.target.value);
    };

    const AddToDo = () => {
        const newTodo: ToDo = {
            name: input,
            done: false,
        };

            setTodos([newTodo, ...toDos])

    }
    
    return (
        <div>
            <div>Todo List</div>
            <input placeholder="Tarefa: " value={input} onChange={onChangeInput}></input>
            <button onClick={AddToDo}>Adicionar</button>
        </div>
    );
};

export default TodoList;