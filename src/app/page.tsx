"use client";

import React, { useState } from "react";

function Page() {
  const [tab, setTab] = useState<number>(0);
  const prayerTimesData = {
    timings: {
      Fajr: "05:34",
      Sunrise: "06:49",
      Dhuhr: "12:13",
      Asr: "15:12",
      Sunset: "17:36",
      Maghrib: "17:36",
      Isha: "18:51",
      Imsak: "05:24",
      Midnight: "00:12",
      Firstthird: "22:00",
      Lastthird: "02:25",
    },
    date: "24-10-2024",
  };

  function handleTabClick() {
    setTab(1);
  }

  return (
    <>
      <h1
        style={{
          background: "linear-gradient(to right, #6e6e6e, #fff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-[48px] text-center font-black"
      >
        Namoz vaqtlari
      </h1>
      <h2 className="text-center mt-5 font-medium text-white text-[34px]">
        Dasturchilar uchun
      </h2>
      <p className="mt-[150px] text-white opacity-35 w-[250px] mx-auto text-center">
        Bu API dan asosan dasturchilar foydalanishadi. API sizga namoz
        vaqtlarini tezda bilib olish uchun yordam beradi.
      </p>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleTabClick}
          style={{
            background: "linear-gradient(to right, #dbdbdb, #fff)",
          }}
          className="px-5 py-3 font-medium rounded-xl"
        >
          Foydalanish
        </button>
      </div>

      {tab === 1 && (
        <div className="mt-10 text-center text-white">
          <h3>Tab 1 ochildi!</h3>
          <p>API qanday ishlatiladi ?</p>
          <p>APIni ishlatish uchun unga so'rov yuborishiniz lozim</p>
          <div className="bg-gray-500 w-[450px] mx-auto">
            http://localhost:3000/api/times/?city=Jizzakh
          </div>
          <p>
            Bu yerda ?city=Jizzakh Jizzakh o'rniga o'zingizga kerakli shahar
            nomini qo'ysangiz bo'ladi
          </p>
          <p>Bu API ning javobi</p>
          <div className="bg-black w-[450px] mx-auto">
            <pre className="whitespace-pre-wrap text-start">
              {JSON.stringify(prayerTimesData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
