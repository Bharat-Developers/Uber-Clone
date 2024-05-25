import Image from "next/image";
import LoginCustomer from "./(components)/loginCustomer";
import LoginDriver from "./(components)/loginDriver";
import { getS2Id } from "./actions/getCell_Ids";
import MapWithRouting from "./(components)/Driver/MapWithRouting";
import TestMap from "./(components)/Driver/TestMap";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      {/* <LoginCustomer/> */}
      {/* <MapWithRouting/> */}
      {/* <GetARideForm/> */}
      <TestMap/>
      {/* <LoginDriver/> */}
    </main>
  );
}
