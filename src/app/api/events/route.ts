import { NextResponse } from "next/server";
import events from "@/data/events.json";

export async function GET() {
  try {
    // Sort events by year
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);

    return NextResponse.json(sortedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
