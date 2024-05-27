import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import AvaliableDriver from "@/lib/models/AvaliableDrivers";
// import connect from "@/lib/db";
import connect from "@/lib/db";
import mongoose from "mongoose";

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const id = new URL(request.url).searchParams.get('id');
    if (id) {
      const avaliableDriver = await AvaliableDriver.findById(id);
      if (!avaliableDriver) {
        return new NextResponse(
          JSON.stringify({ message: "No data found for this ID" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify({ avaliableDriver }), {
        status: 200,
      });
    } else {
      const avaliableDrivers = await AvaliableDriver.find();
      return new NextResponse(JSON.stringify({ avaliableDrivers }), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error getting data" }),
      { status: 500 }
    );
  }
};

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const PUT = async (request: NextRequest) => {
  try {
    const { cell_id, driver_id, action } = await request.json();

    if (!cell_id || !driver_id || !action) {
      return new NextResponse(
        JSON.stringify({ message: "Missing parameters" }),
        { status: 400 }
      );
    }

    // Validate if driver_id is a valid ObjectId
    if (!isValidObjectId(driver_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid driver_id format" }),
        { status: 400 }
      );
    }

    await connect();
    let existingDriver = await AvaliableDriver.findOne({ cell_id });

    if (!existingDriver) {
      // If no existing entry, create a new one
      if (action === "push") {
        const newEntry = new AvaliableDriver({
          cell_id: cell_id,
          drivers: [driver_id],
        });
        await newEntry.save();
        return new NextResponse(
          JSON.stringify({ message: "New entry created", newEntry }),
          { status: 201 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Cell not found" }),
          { status: 404 }
        );
      }
    } else {
      // If entry exists, update it
      if (action === "push") {
        if (!existingDriver.drivers.includes(driver_id)) {
          existingDriver.drivers.push(driver_id);
          await existingDriver.save();
        }
        return new NextResponse(
          JSON.stringify({ message: "Driver added to existing cell", existingDriver }),
          { status: 200 }
        );
      } else if (action === "pull") {
        await AvaliableDriver.updateOne(
          { cell_id },
          { $pull: { drivers: driver_id } }
        );
        return new NextResponse(
          JSON.stringify({ message: "Driver removed from existing cell" }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Invalid action" }),
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error updating driver location:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating cell" }),
      { status: 500 }
    );
  }
};
