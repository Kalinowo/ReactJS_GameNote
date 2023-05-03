import React from "react";
import localforage from "localforage";
import { Form, redirect } from "react-router-dom";

const defaultState = {
  id: "",
  daily: {},
  weekly: {},
};

export async function characterCreate({ request }) {
  const formData = await request.formData();
  const newCharacter = Object.fromEntries(formData).id;

  let character = await localforage.getItem("characterLists");

  if (!character) character = [];
  Object.assign(defaultState, { id: newCharacter });
  localforage.setItem("characterLists", [...character, defaultState]);

  return redirect("/characters");
}

export default function CreateCharacter(props) {
  const modalRef = React.useRef();

  function isModal(e) {
    if (e.target === modalRef.current) {
      props.toggleModal();
    }
  }

  return (
    <>
      <div ref={modalRef} className="modalOuter" onClick={(e) => isModal(e)}>
        <div className="createCharacterContainer">
          <Form method="post" action="/characters/id/add">
            <input
              type="text"
              name="id"
              placeholder="請輸入角色名稱"
              required
            />
            <button type="submit">Enter</button>
          </Form>
        </div>
      </div>
    </>
  );
}
