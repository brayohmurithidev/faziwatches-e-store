import React, { useState } from "react";
import { Button } from "@mui/material";

const CountdownSale = () => {
  const [count, setCount] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const countDownDate = new Date("Feb 14, 2024 15:37:25").getTime();

  const interval = setInterval(() => {
    //   time now
    const now = new Date().getTime();
    //   distance between now and count date
    const distance = countDownDate - now;

    // calculate for days
    setCount({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    });

    //   IF COUNT DOWN IS FINISHED RESET
    if (distance < 0) {
      clearInterval(interval);
      setCount({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    }
  }, 1000);

  return (
    <div className="countdown-sale section">
      <div className="countdown-sale-content">
        <div>
          <h1>PLATINUM DESIGN</h1>
          <p>
            <span style={{ fontSize: "12px", color: "var(--primary-color)" }}>
              SALE UP TO 15% OFF
            </span>
          </p>
          <p>Give yourself a more vibrant look </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <h3>
                {count.days}
                <span>Days</span>
              </h3>
              <h3>
                {count.hours}
                <span>Hours</span>
              </h3>
              <h3>
                {count.minutes}
                <span>Minutes</span>
              </h3>
              <h3>
                {count.seconds}
                <span>Seconds</span>
              </h3>
            </div>
          </div>
          <Button
            className="btn"
            sx={{
              marginTop: " 20px",
            }}
            variant="contained"
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/*<img src={elegance} height="40vh" alt="elegance" />*/}
    </div>
  );
};

export default CountdownSale;
