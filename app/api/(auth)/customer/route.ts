import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Customer from "@/lib/models/Customer";

export const GET = async () => {
  try {
    await connect();
    const users = await Customer.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newCustomer = new Customer(body);
    await newCustomer.save();

    return new NextResponse(
      JSON.stringify({ message: "Customer is Created", customer: newCustomer }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(
        {
            message : "Error in creating Customer",
            error,
        }
    ),{
        status : 500,
    })
  }
};
