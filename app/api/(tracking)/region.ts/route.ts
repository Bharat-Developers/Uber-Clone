import { NextResponse } from "next/server";
import connect from "@/lib/db";
import S2Cell from "@/lib/models/S2cell";

export const GET = async () => {
  try {
    await connect();
    const users = await S2Cell.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newCell = new S2Cell(body);
    console.log("hello");
    await newCell.save();
    return new NextResponse(
      JSON.stringify({ message: "Cell is Created", cell: newCell }),
      { status: 201 }
    );
  } catch (error) {
    console.log("hello");
    return new NextResponse(JSON.stringify(
        {
            message : "Error in creating Cell",
            error,
        }
    ),{
        status : 500,
    })
  }
};
