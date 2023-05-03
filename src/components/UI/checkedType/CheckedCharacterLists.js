import { FaCheck } from "react-icons/fa";

export default function CheckedCharacterLists(props) {
  const { character, list, type } = props;

  return (
    <>
      <button name="itemCheck" className="itemInner">
        <div className="itemCheckContainer">
          {character[type][list.term] && (
            <div className="checked">
              <FaCheck className="text-white" />
            </div>
          )}
          <input
            type="checkbox"
            checked={
              character[type][list.term] ? character[type][list.term] : false
            }
            readOnly
          />
        </div>
        <div
          style={
            character[type][list.term] ? { textDecoration: "line-through" } : {}
          }
        >
          {character.id}
        </div>
      </button>
    </>
  );
}
