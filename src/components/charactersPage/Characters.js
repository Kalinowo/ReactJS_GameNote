import React, { Suspense } from "react";
import localforage from "localforage";
import { Await, Form, redirect } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import CreateCharacter from "./CreateCharacter";
import CustomButton from "../UI/CustomButton";

export async function characterDelete({ params }) {
  let characters = await localforage.getItem("characterLists");
  let index = characters.findIndex((character) => character.id === params.id);
  if (index > -1) {
    characters.splice(index, 1);
    await localforage.setItem("characterLists", characters);
  }
  return redirect("/characters");
}

export default function Character(props) {
  const { getCharacters } = props;
  const [modal, setModal] = React.useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  return (
    <>
      {modal && <CreateCharacter toggleModal={toggleModal} />}
      <div className="charactersOuter">
        <div className="charactersContainer">
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={getCharacters}>
              {(loadedCharacters) => (
                <>
                  <div className="characterLists">
                    {loadedCharacters.map((character, index) => (
                      <span className="characterOuter" key={character.id}>
                        <div className="characterContainer">
                          <div className="characterName">{character.id}</div>
                          <Form
                            method="post"
                            action={`/characters/${character.id}/delete`}
                            className="deleteButton"
                          >
                            <button>
                              <FaTimes />
                            </button>
                          </Form>
                        </div>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </Await>
          </Suspense>
          <CustomButton onClick={toggleModal} />
        </div>
      </div>
    </>
  );
}
