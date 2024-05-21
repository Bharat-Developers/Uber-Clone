import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Trip from "@/lib/models/Trip";

export const GET = async () => {
  try {
    await connect();
    const trip = await Trip.find();
    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newTrip = new Trip(body);
    await newTrip.save();
    return new NextResponse(
      JSON.stringify({ message: "Trip is Created", Trip: newTrip }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating Trip",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

//Todo:
// get Trip with object id
// get Trip with customer and driver id
// post trip status
// 