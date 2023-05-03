import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function CurrentTime() {
  const [time, setTime] = React.useState(
    dayjs(new Date()).tz("Asia/Taipei").format("hh:mm:ss")
  );

  React.useEffect(() => {
    let timer = setInterval(
      () => setTime(dayjs(new Date()).tz("Asia/Taipei").format("hh:mm:ss")),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div>台灣時區時間：{time}</div>
    </>
  );
}
