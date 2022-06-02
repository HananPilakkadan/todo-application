import React, { useEffect, useState } from "react";
import "./ToDo.css";
import revertIcon from "../assets/revert.svg";

function ToDo() {
  const [data, setData] = useState([
    {
      id: 1,
      items: "go to shop",
    },
    {
      id: 2,
      items: "pay bills",
    },
  ]);
  const [completedList, setCompletedList] = useState([
    {
      id: 3,
      items: "renew insurence",
    },
    {
      id: 4,
      items: "buy fruits",
    },
  ]);
  const [inputValue, setInputValue] = useState();
  const [count, setCount] = useState(0);

  const addList = (e) => {
    e.preventDefault();
    
    let newList = {
        id: count + 1,
        items: inputValue,
    };
    setData([...data, newList]);

    setCount((prev)=> (prev+1));

    setInputValue("");
  };

  const deleteitem = (a) => {
    let deletedList = data.filter((d) => d.id !== a);
    setData(deletedList);
  };
  const deleteDone = (id) => {
    let deletedDoneitems = completedList.filter((d) => d.id !== id);
    setCompletedList(deletedDoneitems);
  };
  const toDone = (a) => {
    let done = data.find((c) => c.id === a);
    setCompletedList([...completedList, done]);

    let newData = data.filter((d) => d.id !== a);
    setData(newData);
  };
  const undoItem = (a) => {
    let revertItem = completedList.find((d) => d.id === a);
    setData([...data, revertItem]);

    let doneItemDelete = completedList.filter((c) => c.id !== a);
    setCompletedList(doneItemDelete);
  };

  useEffect(()=>(
    setCount(parseInt(data.length + completedList.length))
  ),[])

  return (
    <>
      <div className="container">
        <h1>My ToDo</h1>
        <div className="submit">
          <form action="#">
            <input
              type="text"
              name="things"
              id="things"
              placeholder="Add new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" onClick={(e) => addList(e)}>
              Add Items
            </button>
          </form>
        </div>
        <div className="content">
          <h2>Upcoming</h2>
          <ul>
            {data.map((items) => (
              <>
                <li>
                  <div className="items">
                    <input
                      type="radio"
                      name="radio"
                      onClick={() => toDone(items.id)}
                    />
                    <label htmlFor="radio">
                      {items.id}: {items.items}
                    </label>
                  </div>
                  <h3 onClick={() => deleteitem(items.id)}>X</h3>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="content done">
          <h2>Done</h2>
          <ul>
            {completedList.map((item) => (
              <>
                <li>
                  <div className="items">
                    <label htmlFor="radio">
                      {item.id}: {item.items}
                    </label>
                  </div>
                  <div className="actions">
                    <h4>
                      <img
                        src={revertIcon}
                        alt="Undo-icon"
                        onClick={() => undoItem(item.id)}
                      />
                    </h4>
                    <h3 onClick={() => deleteDone(item.id)}>X</h3>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ToDo;
