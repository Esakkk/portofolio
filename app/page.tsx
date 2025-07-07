"use client";
import Image from "next/image";
import Link from "next/link";
import Squares from "./plugin/Squares/Squares";
import CircularText from "./plugin/CircularText/CircularText";
import SplashCursor from "./plugin/SplashCursor/SplashCursor";
import Lanyard from "./plugin/Lanyard/Lanyard";
import ScrollVelocity from "./plugin/ScrollVelocity/ScrollVelocity";

export default function Home() {
  return (
    <div className="">
      <SplashCursor />
      <div className="absolute squares-canvas z-0 opacity-20">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#202a2b"
          hoverFillColor="#0245A3"
        />
      </div>
      <div className="absolute overflow-x-hidden w-full">
        <div className="relative left-[520px] z-10">
          <Lanyard position={[0, 0, 19]} gravity={[0, -50, 0]} />
        </div>
      </div>
      <div className="relative navbar z-20">
        <div className="grid grid-cols-6 pt-[38px]">
          <div className="pl-[137px]">
            <Link href="https://github.com/esakkk">
              <Image
                src="/assets/githubb.png"
                width={54}
                height={54}
                alt="Github Icon"
              ></Image>
            </Link>
          </div>
          <div className="col-span-4 flex space-x-[60px] items-center justify-center">
            <Link href="" className="text-[26px]">
              Home
            </Link>
            <Link href="" className="text-[26px]">
              About
            </Link>
            <Link href="" className="text-[26px]">
              Project
            </Link>
            <Link href="" className="text-[26px]">
              Contact
            </Link>
          </div>
          <div className="">
            <button>
              <Image
                src="/assets/togle.png"
                width={54}
                height={54}
                alt="Toggle"
              ></Image>
            </button>
          </div>
        </div>
      </div>
      <div className="relative introduce z-20">
        <div className="grid grid-cols-5">
          <div className="col-span-4 pt-[153px] pl-[137px] text-[120px] font-bold leading-none">
            Hello!
          </div>
          <div className=""></div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-6 pl-[142px] text-[56px]">
            <p className="flex pb-[40px] tracking-[13px]">
              I'm Muhammad Hardian
              <p className="text-[#EAF9FF] ml-[26px] font-semibold">Esa</p>
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <CircularText
          text="I N * C O D E * W E * T R U S T * "
          onHover="goBonkers"
          spinDuration={5}
          className="custom-class flex absolute bottom-[181px] left-[404px] z-0"
        />
      </div>
      <div className="grid pl-[145px]">
        <Link
          href="#"
          className="flex text-[18px] tracking-[4px] font-light z-50 items-center"
        >
          Let's connect and discuss how my skills can benefit your next project.
          <Image
            src="/assets/next.png"
            width={54}
            height={54}
            alt="Toggle"
            className="justify-center pl-[10px]"
          ></Image>
        </Link>
      </div>

      <div className="relative mt-[45px]">
        <div>
          <ScrollVelocity
            texts={["Network  Engineer  ", "Web  Developer   "]}
            velocity={120}
            className="custom-scroll-text"
          />  
        </div>
        <div className="flex relative items-center justify-center w-full h-[500px]">
          <p className='text-5xl'>COMING SOON! dem too lazy to coding lmao :D</p>
        </div>
      </div>
    </div>
  );
}
