import { Form, redirect } from "react-router-dom";
import localforage from "localforage";
import CheckedCharacterLists from "./CheckedCharacterLists";

export async function checkedAction({ params }) {
  const { id, type, term } = params;
  let characters = await localforage.getItem("characterLists");
  let character = characters.find((character) => character.id === id);

  if (character[type][term]) {
    character[type][term] = false;
  } else {
    character[type][term] = true;
  }

  localforage.setItem("characterLists", characters);
  return redirect("/");
}

export default function CheckedFormAction(props) {
  return (
    <Form
      method="post"
      action={
        `/check/${props.character.id}` +
        `/${props.type}` +
        `/${props.list.term}`
      }
    >
      <CheckedCharacterLists {...props} />
    </Form>
  );
}
