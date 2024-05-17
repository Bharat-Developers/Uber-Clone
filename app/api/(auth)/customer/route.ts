import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Customer from "@/lib/models/Customer";

export const GET = async (request: NextRequest) => {
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      await connect();
      const customer = await Customer.findById(id);
      if (!customer) {
        return new NextResponse(
          JSON.stringify({ messgae: "Customer Not Found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(customer), { status: 200 });
    } catch (error) {return new NextResponse(JSON.stringify({messgae : "Error in fectching customer"}), {status : 500})}
  }
  try {
    await connect();
    const customer = await Customer.find();
    return new NextResponse(JSON.stringify(customer), { status: 200 });
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
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating Customer",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request : Request) => {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "ID parameter is required" }),
      { status: 400 }
    );
  }
  
  try {
    await connect();
    const deleteCustomer = await Customer.findByIdAndDelete(id);
    if (!deleteCustomer){
      return new NextResponse(
        JSON.stringify({message : 'Customer not Found!'}),
        {status : 404}
      )
    }
    return new NextResponse(
      JSON.stringify({message : 'Customer Deleted Successfully'}),
      {status : 201}
    )
  }catch(error){
    return new NextResponse(
      JSON.stringify({message : 'Error Deleting Customer'}),
      {status : 500}
    )
  }
}