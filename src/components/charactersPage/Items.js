import React, { Suspense } from "react";
import localforage from "localforage";
import { Await, Form, redirect } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import CreateItem from "./CreateItem";

export async function itemDelete({ params }) {
  const { type, term } = params;
  let items = await localforage.getItem("itemLists");
  let itemIndex = items[type].findIndex((item) => item.term === params.term);
  let characters = await localforage.getItem("characterLists");

  if (itemIndex > -1) {
    items[type].splice(itemIndex, 1);
    localforage.setItem("itemLists", items);
    characters.forEach((element) => delete element[type][term]);
    localforage.setItem("characterLists", characters);
  }

  return redirect("/characters");
}

export default function Items(props) {
  const { getItems } = props;
  const [modal, setModal] = React.useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  return (
    <>
      {modal && <CreateItem toggleModal={toggleModal} />}
      <div className="itemsOuter">
        <div className="itemsContainer">
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={getItems}>
              {(loadedItems) => (
                <>
                  <div>每日任務</div>
                  <div className="daily">
                    {loadedItems.daily.map((item) => (
                      <ItemContainer item={item} type="daily" />
                    ))}
                  </div>
                  <div>每週任務</div>
                  <div className="weekly">
                    {loadedItems.weekly.map((item) => (
                      <ItemContainer item={item} type="weekly" />
                    ))}
                  </div>
                </>
              )}
            </Await>
          </Suspense>
          <div className="addItemContainer">
            <button onClick={() => toggleModal()}>新增項目</button>
          </div>
        </div>
      </div>
    </>
  );
}

function ItemContainer(props) {
  const { item, type } = props;
  return (
    <>
      <div
        className="itemOuter"
        data-type={item.type === "checked" ? "勾選" : "計算"}
      >
        <div className="itemContainer">
          <div className="itemTitle">{item.title}</div>
        </div>
        <Form
          method="post"
          action={`/characters/${type}/${item.term}/delete`}
          className="deleteButton"
        >
          <button>
            <FaTimes />
          </button>
        </Form>
      </div>
    </>
  );
}
