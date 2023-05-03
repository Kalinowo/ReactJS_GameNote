import React from "react";
import localforage from "localforage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";

import DailyQuest from "../components/homePage/DailyQuest";
import WeeklyQuest from "../components/homePage/WeeklyQuest";
import CurrentTime from "../components/CurrentTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);

let date = dayjs(new Date()).tz("Asia/Taipei");

const resetDefault = {
  dailyReset: false,
  weeklyReset: "",
};

const dailyDefault = {
  themeActivity: false,
};

let weeklyDefault = {
  building: false,
  dreamMachine: 0,
  pelican: false,
  security: false,
};

export async function homeLoader() {
  let resets = await localforage.getItem("resets");

  if (!resets) {
    resets = resetDefault;
    localforage.setItem("resets", resetDefault);
  }

  let characters = await localforage.getItem("characterLists");
  let items = await localforage.getItem("itemLists");

  //還沒創建角色時放一個空的array
  if (!characters) characters = [];

  //當每週的禮拜一日期不同時 &&過了5點時重置每週任務
  if (
    dayjs().weekday(1).format("YYYY-MM-DD") !== resets.weeklyReset &&
    date.hour() > 4
  ) {
    resets.weeklyReset = dayjs().weekday(1).format("YYYY-MM-DD");
    localforage.setItem("resets", resets);
    characters.forEach((element) =>
      Object.keys(element.weekly).forEach((v) =>
        typeof element.weekly[v] === "boolean"
          ? (element.weekly[v] = false)
          : (element.weekly[v] = 0)
      )
    );
    localforage.setItem("characterLists", characters);
  }

  //當dailyReset不等於現在的時間&&大於5點時重置每日
  if (date.format("YYYY-MM-DD") !== resets.dailyReset && date.hour() > 4) {
    characters.forEach((element) =>
      Object.keys(element.daily).forEach((v) =>
        typeof element.daily[v] === "boolean"
          ? (element.daily[v] = false)
          : (element.daily[v] = 0)
      )
    );
    localforage.setItem("characterLists", characters);

    resets.dailyReset = date.format("YYYY-MM-DD");
    localforage.setItem("resets", resets);
  }

  return { characters, items };
}

export default function Home() {
  return (
    <>
      <div className="homeOuter">
        <CurrentTime />
        <DailyQuest />
        <WeeklyQuest />
      </div>
    </>
  );
}
