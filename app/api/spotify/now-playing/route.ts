// @ts-nocheck

import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify env variables");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${text}`);
  }

  return JSON.parse(text);
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    const text = await res.text();

    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!res.ok) {
      throw new Error(`Now playing failed: ${res.status} ${text}`);
    }

    const data = JSON.parse(text);

    if (!data?.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images?.[0]?.url ?? "",
      songUrl: data.item.external_urls?.spotify ?? "",
    });
  } catch (error) {
    console.error("SPOTIFY ERROR:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}