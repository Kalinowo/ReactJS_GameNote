import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import CountIndex from "../UI/countType/CountIndex";
import CheckedIndex from "../UI/checkedType/CheckedIndex";

export function dailyAction() {}

export default function DailyQuest() {
  const { items } = useLoaderData();
  // const dailyQuestChecked = [
  //   {
  //     title: "主題活動（10墨晶）",
  //     term: "themeActivity",
  //     type: "daily",
  //   },
  // ];
  return (
    <>
      <div className="dailyQuestOuter" data-title="每日任務">
        {items.daily.map(
          (list) =>
            list.type === "count" && (
              <Fragment key={list.term}>
                <CountIndex list={list} type="daily" />
              </Fragment>
            )
        )}
        {items.daily.map(
          (list) =>
            list.type === "checked" && (
              <Fragment key={list.term}>
                <CheckedIndex list={list} type="daily" />
              </Fragment>
            )
        )}
      </div>
    </>
  );
}
