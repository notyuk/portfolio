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
  User,
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

const PHOTOS = [
  {
    title: "City Notes",
    description: "A place for photos, visual ideas, and moments I want to keep on the site.",
  },
  {
    title: "Behind the Work",
    description: "Small updates on projects, learning, design choices, and whatever I’m building.",
  },
  {
    title: "Music / Blog",
    description: "A section for writing, playlists, music thoughts, or short posts.",
  },
];

const NAV_ITEMS = [
  { label: "cv", href: "#cv", icon: FileText },
  { label: "projects", href: "#projects", icon: Briefcase },
  { label: "photos/blog", href: "#photos", icon: ImageIcon },
];

function TopBar() {
  return (
    <header className="border-b border-white/10 bg-[#6b6b6f] text-white">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="mt-2 text-3xl font-light leading-none sm:text-4xl">2026 april</h1>
        </div>

        <nav className="hidden items-start gap-12 md:flex">
          <div>
            <p className="text-2xl font-light lowercase">main</p>
            <div className="mt-3 space-y-1 text-sm text-white/75">
              <p>about</p>
            </div>
          </div>

          <div>
            <p className="text-2xl font-light lowercase">pages</p>
            <div className="mt-3 space-y-1 text-sm text-white/75">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="block transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-2xl font-light lowercase">contact</p>
            <div className="mt-3 space-y-1 text-sm text-white/75">
              <a href="mailto:ykoch006@gmail.com" className="block transition hover:text-white">
                email
              </a>
              <a href="https://github.com/notyuk" target="_blank" rel="noreferrer" className="block transition hover:text-white">
                github
              </a>
              <a href="https://yukselkoc.com" target="_blank" rel="noreferrer" className="block transition hover:text-white">
                home page
              </a>
            </div>
          </div>
        </nav>

        <button className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>
    </header>
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
  <div className="text-sm">
    {weather && (
      <>
        <div className="text-2xl font-light">
          {Math.round(weather.temperature_2m)}°C
        </div>
        <div className="text-xs text-black/50">
          {profile.city}
        </div>
      </>
    )}
  </div>
);
}

function SpotifyCard() {
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        setTrack(data);
      } catch (error) {
        setTrack({ error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {track?.albumImageUrl && track?.isPlaying ? (
        <img
          src={track.albumImageUrl}
          alt={track.album}
          className="h-12 w-12 rounded-md object-cover"
        />
      ) : null}

      <div className="text-sm">
        <p className="mb-1 flex items-center gap-2 text-xs font-medium text-black/60">
          <Music className="h-4 w-4" /> now listening to
        </p>

        {loading ? (
          <p className="text-xs text-black/50">Loading Spotify...</p>
        ) : !track || track.error || !track.isPlaying ? (
          <p className="text-xs text-black/50">Nothing playing right now.</p>
        ) : (
          <div className="space-y-1">
            <p className="text-sm font-medium">{track.title}</p>
            <p className="text-xs text-black/60">{track.artist}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero({ profile }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden rounded-[2.5rem] border-0 bg-[#f5f5f5] shadow-none">
        <CardContent className="p-8 sm:p-10">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="mt-3 text-5xl font-light tracking-tight text-black sm:text-6xl">
                {profile.name}
              </h2>
              <p className="mt-3 text-lg text-black/60">{profile.title}</p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/35 px-4 py-3 text-sm text-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {profile.location}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> University of Reading
              </div>
            </div>
          </div>

          <div className="max-w-3xl space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">bio</p>
            <p className="text-lg leading-8 text-black/75">{profile.bio}</p>
            <p className="max-w-2xl leading-7 text-black/65">{profile.about}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full border-0 bg-white/65 px-4 py-1.5 text-black">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex items-start gap-8">
        <SpotifyCard />
        <WeatherCard profile={profile} />
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.28em] text-black/40">{eyebrow}</p>
      <h2 className="text-3xl font-light tracking-tight text-black">{title}</h2>
    </div>
  );
}

function CVSection({ profile }) {
  return (
    <section id="cv" className="space-y-6">
      <SectionTitle eyebrow="cv" title="curriculum vitae" />
      <Card className="rounded-[2.5rem] border border-black/10 bg-white/80 shadow-none">
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-lg leading-8 text-black/70">
              A second-year Computer Science student focused on frontend, backend, and building practical projects with a cleaner visual style.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-black text-white hover:bg-black/90">
              <a href="/cv.pdf" target="_blank" rel="noreferrer">Open CV</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-black/15 bg-transparent">
              <a href={`mailto:${profile.email}`}>Contact</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="rounded-[2rem] border border-black/10 bg-white/80 shadow-none transition-transform duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-black">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-black/60">{project.description}</p>
          </div>
          <Badge variant="outline" className="rounded-full border-black/10 whitespace-nowrap text-black/65">
            {project.status}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full bg-black/5 text-black/75">
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
    <section id="projects" className="space-y-6">
      <SectionTitle eyebrow="projects" title="selected work" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function PhotosBlogSection() {
  return (
    <section id="photos" className="space-y-6">
      <SectionTitle eyebrow="photos / blog" title="visuals and notes" />
      <div className="grid gap-6 md:grid-cols-3">
        {PHOTOS.map((item) => (
          <Card key={item.title} className="rounded-[2rem] border border-black/10 bg-[#d9d7d3] shadow-none">
            <CardContent className="p-6">
              <div className="mb-10 aspect-[4/3] rounded-[1.5rem] border border-black/10 bg-white/30" />
              <h3 className="text-lg font-medium text-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/60">{item.description}</p>
            </CardContent>
          </Card>
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
    <Card className="rounded-[2.5rem] border border-black/10 bg-white/80 shadow-none">
      <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionTitle eyebrow="contact" title="get in touch" />
          <p className="mt-4 max-w-2xl leading-8 text-black/65">
            Open to internships, learning opportunities, creative work, and interesting conversations.
          </p>
        </div>
        <div className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-5">
          <label className="mb-2 block text-sm font-medium text-black/70">Email</label>
          <div className="flex gap-2">
            <Input value={profile.email} readOnly className="rounded-full border-black/10 bg-white" />
            <Button onClick={copyEmail} className="rounded-full bg-black text-white hover:bg-black/90">
              {copied ? "Copied" : "Copy"}
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
    <div className="min-h-screen bg-[#efede8] text-black">
      <TopBar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <Hero profile={profile} />
        <CVSection profile={profile} />
        <ProjectsSection />
        <PhotosBlogSection />
        <ContactSection profile={profile} />
      </main>
    </div>
  );
}
