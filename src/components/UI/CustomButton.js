export default function CustomButton(props) {
  return (
    <div className="addContainer">
      <button className="button glow-effect" onClick={() => props.onClick()}>
        新增角色
        <svg class="glow-container">
          <rect
            pathLength="100"
            strokeLinecap="round"
            className="glow-blur"
          ></rect>
          <rect
            pathLength="100"
            strokeLinecap="round"
            className="glow-line"
          ></rect>
        </svg>
      </button>
    </div>
  );
}
