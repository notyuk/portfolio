"use client";

import { useEffect, useState } from "react";

type Weather = { tempC: number; condition: string } | null;

function formatLondon(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return {
    date: `${get("year")}.${get("month")}.${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export default function Vitals() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) setWeather(null);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!now) return <> · syncing</>;

  const { date, time } = formatLondon(now);

  return (
    <>
      {" · "}
      {date} · {time} london
      {weather ? ` · ${weather.tempC}° ${weather.condition}` : ""}
    </>
  );
}
