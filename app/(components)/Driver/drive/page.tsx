import Image from "next/image";
import Drive from "./Drive";
import WhyDrive from "./WhyDrive";
import FAQ from "./FAQ";
import WhatNeed from "./WhatNeed";
import Footer from "./Footer";

export default function Home() {
  return (
   <>
<Drive/>
<WhyDrive/>
<WhatNeed/>
<FAQ/>
<Footer/>
</>
  );
}