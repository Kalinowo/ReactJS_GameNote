import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import CountFormAction from "./CountFormAction";

export default function CountIndex(props) {
  const { characters } = useLoaderData();

  return (
    <>
      <div className="countItemOuter" data-title={props.list.title}>
        {characters.map((character, index) => (
          <Fragment key={character.id}>
            <CountFormAction character={character} {...props} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
