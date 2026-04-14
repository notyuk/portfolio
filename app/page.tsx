// @ts-nocheck
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CloudSun,
  FileText,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  Menu,
  Music,
  RefreshCw,
  Briefcase,
} from "lucide-react";

const DEFAULT_PROFILE = {
  name: "Yüksel Koç",
  title: "Computer Science Student",
  location: "Reading / London",
  bio: "I’m a second-year Computer Science student interested in backend development, frontend design, and building projects that feel useful and personal.",
  about:
    "I enjoy combining technical work with design. Right now, I’m exploring backend systems, APIs, and data while also building cleaner frontend experiences.",
  skills: ["Python", "Java", "C", "Frontend", "Backend", "APIs"],
  email: "ykoch006@gmail.com",
  github: "https://github.com/notyuk",
  website: "https://yukselkoc.com",
  city: "Reading",
  weatherLatitude: 51.4543,
  weatherLongitude: -0.9781,
};

const NAV_ITEMS = [
  { label: "cv", href: "#cv" },
  { label: "projects", href: "#projects" },
  { label: "photos/blog", href: "#photos" },
];

function TopBar() {
  return (
    <header className="border-b border-white/10 bg-[#6b6b6f] text-white">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between px-4 py-5">
        <div>
          <h1 className="text-3xl font-light">yüksel koç</h1>
          <p className="text-sm text-white/60">2026 april</p>
        </div>

        <nav className="hidden gap-10 md:flex text-sm">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white/80">
              {item.label}
            </a>
          ))}
        </nav>

        <Menu className="md:hidden" />
      </div>
    </header>
  );
}

function WeatherCard({ profile }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${profile.weatherLatitude}&longitude=${profile.weatherLongitude}&current=temperature_2m,wind_speed_10m&timezone=auto`
      );
      const data = await res.json();
      setWeather(data.current);
    };
    fetchWeather();
  }, []);

  return (
    <Card className="rounded-xl bg-white/70 backdrop-blur-sm border-none shadow-none p-3">
      <CardContent className="p-2">
        {weather && (
          <div>
            <div className="text-xl font-light">{Math.round(weather.temperature_2m)}°C</div>
            <div className="text-xs text-black/50">{profile.city}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SpotifyCard() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await fetch("/api/spotify/now-playing");
      const data = await res.json();
      setTrack(data);
    };
    fetchNowPlaying();
  }, []);

  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-md p-3">
      <p className="text-xs text-black/60">now listening to</p>
      {track && track.isPlaying ? (
        <div>
          <p className="text-sm">{track.title}</p>
          <p className="text-xs text-black/60">{track.artist}</p>
        </div>
      ) : (
        <p className="text-xs text-black/50">nothing playing</p>
      )}
    </div>
  );
}

function Hero({ profile }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl bg-[#d7d4cf] p-6">
        <p className="text-sm text-black/50">{profile.title}</p>
        <p className="mt-3 text-base text-black/70">{profile.bio}</p>
      </div>

      <div className="flex flex-col gap-3">
        <WeatherCard profile={profile} />
        <SpotifyCard />
      </div>
    </section>
  );
}

export default function PersonalPortfolioDashboard() {
  const [profile] = useState(DEFAULT_PROFILE);

  return (
    <div className="min-h-screen bg-[#efede8] text-black">
      <TopBar />
      <main className="mx-auto max-w-7xl p-6">
        <Hero profile={profile} />
      </main>
    </div>
  );
}
