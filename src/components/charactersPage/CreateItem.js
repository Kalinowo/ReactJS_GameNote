import React from "react";
import localforage from "localforage";
import { Form, redirect } from "react-router-dom";

export async function itemCreate({ request }) {
  const formData = await request.formData();
  const newItem = Object.fromEntries(formData);

  let item = await localforage.getItem("itemLists");

  //有重複的term就不執行
  let condition = item[newItem.type].find(
    (element) => element.term === newItem.term
  );

  if (!condition) {
    item[newItem.type].push({
      title: newItem.title,
      term: newItem.term,
      type: newItem.option,
    });
    localforage.setItem("itemLists", item);
  } else {
    console.log("term已存在");
  }

  return redirect("/characters");
}

export default function CreateItem(props) {
  const modalRef = React.useRef();

  function isModal(e) {
    if (e.target === modalRef.current) {
      props.toggleModal();
    }
  }

  return (
    <>
      <div ref={modalRef} className="modalOuter" onClick={(e) => isModal(e)}>
        <div className="createItemContainer">
          <Form method="post" action="/characters/item/add">
            <div className="itemOptionContainer">
              <div className="itemTypeContainer">
                <div>項目類型：</div>
                <div className="radioContainer">
                  <input
                    type="radio"
                    id="checked"
                    value="checked"
                    name="option"
                    required
                  />
                  <label htmlFor="checked">勾選項目</label>
                </div>
                <div className="radioContainer">
                  <input type="radio" id="count" value="count" name="option" />
                  <label htmlFor="count">計算項目</label>
                </div>
              </div>
              <div className="itemTypeContainer">
                <div>任務種類：</div>
                <div className="radioContainer">
                  <input
                    type="radio"
                    id="daily"
                    value="daily"
                    name="type"
                    required
                  />
                  <label htmlFor="daily">每日任務</label>
                </div>
                <div className="radioContainer">
                  <input type="radio" id="weekly" value="weekly" name="type" />
                  <label htmlFor="weekly">每週任務</label>
                </div>
              </div>
              <input
                type="text"
                name="title"
                placeholder="請輸入項目標題"
                required
              />
              <input
                type="text"
                name="term"
                placeholder="請輸入項目代碼"
                required
              />
            </div>
            <button type="submit">Enter</button>
          </Form>
        </div>
      </div>
    </>
  );
}
