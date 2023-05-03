import { Form, redirect, useLoaderData } from "react-router-dom";
import localforage from "localforage";
import CountCharacterLists from "./CountCharacterLists";

export async function countAction({ request, params }) {
  const { id, type, term } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let characters = await localforage.getItem("characterLists");
  let character = characters.find((character) => character.id === id);

  if (data.increment) {
    if (!character[type][term]) character[type][term] = 0;
    character[type][term] += 1;
  } else {
    if (!character[type][term]) character[type][term] = 0;
    character[type][term] -= 1;
  }

  localforage.setItem("characterLists", characters);

  return redirect("/");
}

export default function CountFormAction(props) {
  return (
    <Form
      method="post"
      action={
        `/count/${props.character.id}` +
        `/${props.type}` +
        `/${props.list.term}`
      }
    >
      <CountCharacterLists {...props} />
    </Form>
  );
}
