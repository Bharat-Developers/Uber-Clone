import Image from "next/image";
import LoginCustomer from "./(components)/loginCustomer";
import LoginDriver from "./(components)/loginDriver";
import MapWithRouting from "./(components)/Driver/MapWithRouting";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <LoginCustomer/> */}
      <MapWithRouting/>
      {/* <GetARideForm/> */}
      {/* <LoginDriver/> */}
    </main>
  );
}
