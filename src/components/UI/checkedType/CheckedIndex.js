import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import CheckedFormAction from "./CheckedFormAction";

export default function CheckedIndex(props) {
  const { characters } = useLoaderData();

  return (
    <>
      <div className="checkItemOuter" data-title={props.list.title}>
        {characters.map((character, index) => (
          <Fragment key={character.id}>
            <CheckedFormAction character={character} {...props} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
