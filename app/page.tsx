 // @ts-nocheck
 "use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CloudSun, Globe, GraduationCap, Laptop, MapPin, Music, RefreshCw, User } from "lucide-react";

const DEFAULT_PROFILE = {
  name: "Yüksel Koç",
  title: "Computer Science Student",  
  location: "Reading / London",
  bio: "I’m a second-year Computer Science student interested in backend development, frontend design, and building projects that feel useful and personal.",
  about:
    "I enjoy combining technical work with design. Right now, I’m exploring backend systems, APIs, and data while also building cleaner frontend experiences.",
  skills: ["Python", "Java", "C", "Frontend", "Backend", "APIs"],
  email: "ykoch006@gmail.com",
  website: "https://yukselkoc.com",
  city: "Reading",
  weatherLatitude: 51.4543,
  weatherLongitude: -0.9781,
  spotifyNowPlaying: {
    track: "Add your Spotify integration",
    artist: "Show your current track here",
    album: "Now Playing",
    url: "https://open.spotify.com/",
  },
};

const PROJECTS = [
  {
    title: "Personal Portfolio Dashboard",
    description:
      "A personal site that combines an about page with live widgets like weather and Spotify activity, so it feels more dynamic than a static portfolio.",
    tags: ["React", "Frontend", "APIs"],
    status: "In progress",
  },
  {
    title: "Price Scraping Project",
    description:
      "A Python project idea for collecting price data from websites and turning messy real-world information into something useful.",
    tags: ["Python", "Data", "Automation"],
    status: "Planned",
  },
  {
    title: "Website About Me",
    description:
      "A simple site to present who I am, what I’m interested in, and the projects I’m working on in a cleaner and more personal way.",
    tags: ["Design", "Frontend", "Branding"],
    status: "In progress",
  },
];

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl bg-black/5 p-3">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function WeatherCard({ profile }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${profile.weatherLatitude}&longitude=${profile.weatherLongitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data.current);
    } catch (e) {
      setError("Could not load weather right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <CloudSun className="h-4 w-4" /> Weather
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchWeather} aria-label="Refresh weather">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-muted-foreground">{profile.city}</p>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {weather ? (
          <div className="space-y-2">
            <div className="text-3xl font-semibold">{Math.round(weather.temperature_2m)}°C</div>
            <div className="text-sm text-muted-foreground">Wind: {Math.round(weather.wind_speed_10m)} km/h</div>
            <div className="text-sm text-muted-foreground">Weather code: {weather.weather_code}</div>
          </div>
        ) : !error ? (
          <p className="text-sm text-muted-foreground">Loading current weather…</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function SpotifyCard() {
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchNowPlaying = async () => {
    const res = await fetch("/api/spotify/now-playing");
    const data = await res.json();
    setTrack(data);
    setLoading(false);
  };

  fetchNowPlaying();
  const interval = setInterval(fetchNowPlaying, 20000);

  return () => clearInterval(interval);
}, []);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Music className="h-4 w-4" /> Now Playing
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading Spotify...</p>
        ) : !track || track.error || !track.isPlaying ? (
          <p className="text-sm text-muted-foreground">Nothing playing right now.</p>
        ) : (
          <div className="space-y-3">
            {track.albumImageUrl ? (
              <img
                src={track.albumImageUrl}
                alt={track.album}
                className="h-20 w-20 rounded-xl object-cover"
              />
            ) : null}

            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
              <p className="text-sm text-muted-foreground">{track.album}</p>
            </div>

            <a
              href={track.songUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-medium underline underline-offset-4"
            >
              Open on Spotify
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Hero({ profile }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
      <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="p-8">
          <div className="mb-4 inline-flex rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
            Personal Portfolio Dashboard
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>

          <p className="mt-2 text-lg text-muted-foreground">{profile.title}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> University of Reading
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl">
              <a href={`mailto:${profile.email}`}>Contact Me</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <WeatherCard profile={profile} />
        <SpotifyCard profile={profile} />
      </div>
    </section>
  );
}

function AboutSection({ profile }) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="p-8">
        <SectionHeading
          icon={User}
          title="About Me"
          subtitle="A quick overview of who I am and what I’m exploring right now."
        />
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">{profile.about}</p>
      </CardContent>
    </Card>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="rounded-3xl shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
          </div>
          <Badge variant="outline" className="rounded-full whitespace-nowrap">
            {project.status}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsSection() {
  return (
    <section className="space-y-6">
      <SectionHeading
        icon={Laptop}
        title="Projects"
        subtitle="Some of the things I’m building and exploring."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ContactSection({ profile }) {
  const [copied, setCopied] = useState(false);
  const contactText = useMemo(() => profile.email, [profile.email]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            icon={Globe}
            title="Get in Touch"
            subtitle="Open to internships, learning opportunities, and interesting conversations."
          />
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            I’m currently building my skills through projects and coursework, and I’m looking for ways to gain more real-world experience.
          </p>
        </div>
        <div className="rounded-3xl border bg-black/[0.03] p-5">
          <label className="mb-2 block text-sm font-medium">Email</label>
          <div className="flex gap-2">
            <Input value={profile.email} readOnly className="rounded-2xl" />
            <Button onClick={copyEmail} className="rounded-2xl">{copied ? "Copied" : "Copy"}</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-2xl">
              <a href={profile.website} target="_blank" rel="noreferrer">Website</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PersonalPortfolioDashboard() {
  const [profile] = useState(DEFAULT_PROFILE);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-black/[0.03] text-black">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-4 pb-8 sm:px-6 lg:px-8">
        <Hero profile={profile} />
        <AboutSection profile={profile} />
        <ProjectsSection />
        <ContactSection profile={profile} />
      </main>
    </div>
  );
}
