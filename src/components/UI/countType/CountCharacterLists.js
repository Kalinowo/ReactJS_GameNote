import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function CountCharacterLists(props) {
  const { character, list, type } = props;

  return (
    <>
      <div className="itemInner">
        <div className="itemCountContainer">
          <input
            type="number"
            name={list.term}
            value={character[type][list.term] ? character[type][list.term] : 0}
            readOnly
          />
          <span>{character.id}</span>
          <button
            name="decrement"
            value="true"
            disabled={
              character[type][list.term]
                ? false
                : character[type][list.term] > -1
                ? true
                : true
            }
          >
            <FaArrowDown />
          </button>
          <button
            name="increment"
            value="true"
            disabled={
              character[type][list.term]
                ? character[type][list.term] === 7
                : false
            }
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </>
  );
}
