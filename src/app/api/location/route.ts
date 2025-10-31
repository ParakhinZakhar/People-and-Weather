import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Missing latitude or longitude parameters" },
        { status: 400 }
      );
    }
    
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "NextJS-App/1.0 (contact@example.com)",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch location");

    const data = await res.json();

    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      null;
    const state = data.address?.state || null;
    const country = data.address?.country || null;

    const location = {
      displayName: [city, state, country].filter(Boolean).join(", "),
      country,
      city,
      state,
    };

    return NextResponse.json(location);
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
};
