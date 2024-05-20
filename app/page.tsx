import Image from "next/image";
import LoginCustomer from "./(components)/loginCustomer";
import LoginDriver from "./(components)/loginDriver";
import Homepage from './(components)/homepage/page'

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="w-full h-full">
      {/* <LoginCustomer/> */}
      <Homepage />
    </main>
  );
}
