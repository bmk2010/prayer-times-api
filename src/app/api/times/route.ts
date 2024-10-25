// app/api/prayer-times/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type ResponseData = {
  timings?: PrayerTimes;
  date?: string;
  error?: string;
};

const cities = [
  "Garasha",
  "Jizzakh",
  "Samarqand",
  "Buxoro",
  "Namangan",
  "Andijon",
  "Nukus",
  "Xorazm",
  "Karshi",
  "Navoiy",
  "Gulistan",
  "Termiz",
  "Farg‘ona",
  "Toshkent",
  "Bukhara",
];

export async function GET(req: Request) {
  const token = req.headers.get("token");

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city || typeof city !== "string" || !cities.includes(city)) {
    return NextResponse.json(
      { error: "Valid city is required" },
      { status: 400 }
    );
  }

  const cityName = city === "Garasha" ? "Jizzakh" : city;

  try {
    const response = await axios.get(
      `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Uzbekistan&method=2`
    );
    if (response.status === 200) {
      const data = response.data.data;
      const timings = data.timings;

      if (city === "Garasha") {
        // Adjust Garasha times
        for (const prayer in timings) {
          const time = new Date(`1970-01-01T${timings[prayer]}:00Z`);
          time.setMinutes(time.getMinutes() - 2);
          timings[prayer] = time.toISOString().substr(11, 5); // Get 'HH:mm' format
        }
      }

      return NextResponse.json({ timings, date: data.date.gregorian.date });
    } else {
      return NextResponse.json(
        { error: "Error fetching prayer times" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
