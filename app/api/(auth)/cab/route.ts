import connect from "@/lib/db";
import Cab from "@/lib/models/cab";
import { NextResponse } from "next/server";

// creating a cab
export const POST = async (request: Request) => {
    try {
      const body = await request.json();
      await connect();
      const newCab = new Cab(body);
      await newCab.save();
      return new NextResponse(
        JSON.stringify({ message: "Cab is Created", Cab : newCab }),
        {
          status: 201,
        }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          message: "Error in creating Driver",
          error,
        }),
        {
          status: 500,
        }
      );
    }
  };

  //Todo
  //delete a cab 
  //Get Cab form id (for fetching cab type from driverId)