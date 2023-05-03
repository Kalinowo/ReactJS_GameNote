import React, { Suspense } from "react";
import localforage from "localforage";
import { defer, useLoaderData, Await } from "react-router-dom";

import CreateCharacter from "../components/charactersPage/CreateCharacter";
import Character from "../components/charactersPage/Characters";
import Items from "../components/charactersPage/Items";

export async function characterLoader() {
  async function getItems() {
    let items = await localforage.getItem("itemLists");
    if (!items) {
      items = { daily: [], weekly: [] };
      localforage.setItem("itemLists", {
        daily: [],
        weekly: [],
      });
    }
    return items;
  }

  async function getCharacters() {
    let characters = await localforage.getItem("characterLists");
    if (!characters) characters = [];
    return characters;
  }

  return defer({ getCharacters: getCharacters(), getItems: getItems() });
}

export default function CharactersAndItems() {
  const { getCharacters, getItems } = useLoaderData();

  return (
    <>
      <Items getItems={getItems} />
      <Character getCharacters={getCharacters} />
    </>
  );
}
