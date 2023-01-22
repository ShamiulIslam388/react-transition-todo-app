import React, { useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const TodoForm = ({ addTodo, onChange, name }) => {
  return (
    <form>
      <input placeholder="add todo" value={name} onChange={onChange} />
      <button onClick={addTodo}>Add Todo</button>
    </form>
  );
};

export const TodoItem = ({ item, nodeRef }) => {
  return <div ref={nodeRef}>Item: {item.name}</div>;
};

export const TodoItems = ({ items }) => {
  const nodeRef = useRef(null);
  return (
    <TransitionGroup>
      {items.map((item) => (
        <CSSTransition
          key={item.id}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade"
        >
          <TodoItem item={item} nodeRef={nodeRef} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
export default function Transition1() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const addTodo = (e) => {
    e.preventDefault();
    setItems([...items, { id: Math.random(), name: name }]);
    setName("");
  };
  return (
    <div>
      <TodoForm addTodo={addTodo} onChange={onChange} name={name} />
      <TodoItems items={items} />
    </div>
  );
}
