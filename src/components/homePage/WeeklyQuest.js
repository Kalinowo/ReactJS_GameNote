import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import CountIndex from "../UI/countType/CountIndex";
import CheckedIndex from "../UI/checkedType/CheckedIndex";

export default function WeeklyQuest() {
  const { items } = useLoaderData();

  // const weeklyQuestCount = [
  //   {
  //     title: "夢境製造機",
  //     term: "dreamMachine",
  //     type: "weekly",
  //   },
  // ];

  // const weeklyQuestChecked = [
  //   {
  //     title: "家園（人工島）",
  //     term: "building",
  //     type: "weekly",
  //   },
  //   {
  //     title: "鏡都 安全部",
  //     term: "security",
  //     type: "weekly",
  //   },
  //   { title: "小鵜鶘 兌換（茵納斯）", term: "pelican", type: "weekly" },
  // ];

  return (
    <>
      <div className="weeklyQuestOuter" data-title="每週任務">
        {items.weekly.map(
          (list) =>
            list.type === "count" && (
              <Fragment key={list.term}>
                <CountIndex list={list} type="weekly" />
              </Fragment>
            )
        )}
        {items.weekly.map(
          (list) =>
            list.type === "checked" && (
              <Fragment key={list.term}>
                <CheckedIndex list={list} type="weekly" />
              </Fragment>
            )
        )}
      </div>
    </>
  );
}
