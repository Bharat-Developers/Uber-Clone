import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Driver from "@/lib/models/Driver";

export const GET = async (request : Request) => {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');
  if (id){
    try{
    await connect();
    const driver = await Driver.findById(id);
    if (!driver){
      return new NextResponse(JSON.stringify({message:'Driver not found'}), {status: 404})
    }
    return new NextResponse(JSON.stringify(driver), {status : 201})
  }catch(error){
    return new NextResponse(JSON.stringify({message:'Error Getting Driver'}), {status: 500})
  }
  }

  try {
    await connect();
    const users = await Driver.find();
    return new Response(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new NextResponse("Error in fetching data", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newDriver = new Driver(body);
    await newDriver.save();
    return new NextResponse(
      JSON.stringify({ message: "Driver is Created", Driver: newDriver }),
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

export const DELETE = async (request : Request) => {
  try{
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    if (!id){
      return new NextResponse(JSON.stringify({message : 'ID needed to Delete Driver'}), {status : 404})
    }
    await connect();
    const driver = await Driver.findByIdAndDelete(id);
    if(!driver){
      return new NextResponse(JSON.stringify({message : 'Driver not found'}), {status : 404})
    }
    return new NextResponse(JSON.stringify({message : 'Driver Deleted Successfully'}), {status : 201})
  }catch(error){
    return new NextResponse(JSON.stringify({message : 'Error in Deleting Driver'}), {status : 500})
  }
}