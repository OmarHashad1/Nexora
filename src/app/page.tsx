import Particles from "@/Components/Particals/Particles";
import SplitText from "@/Components/SplitText/SplitText";
import TextType from "@/Components/TextType/TextType";
import { Button } from "@/Components/ui/button";
import canonLogo from "@/../public/Canon.png";
import lenovoLogo from "@/../public/Lenovo.png";
import appleLogo from "@/../public/apple.png";
import nikeLogo from "@/../public/nike.png";
import xiaomiLogo from "@/../public/Xiaomi.png";

import LogoLoop from "@/Components/LogoLoop/LogoLoop";
import Link from "next/link";
export default function Home() {
  const imageLogos = [
    {
      src: canonLogo.src,
      alt: "Canon Logo",
      href: "https://company1.com",
    },
    {
      src: lenovoLogo.src,
      alt: "Lenovo Logo",
      href: "https://company2.com",
    },

    {
      src: xiaomiLogo.src,
      alt: "Xiaomi Logo",
      href: "https://company3.com",
    },
    {
      src: appleLogo.src,
      alt: "apple Logo",
      href: "https://company3.com",
    },
    {
      src: nikeLogo.src,
      alt: "nike Logo",
      href: "https://company3.com",
    },
  ];

  return (
    <>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Particles
          particleColors={["#f54927", "#f54927"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl text-center xsm:w-full">
          <SplitText
            text="Discover Amazing "
            className="inline"
            delay={50}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <br></br>
          <TextType
            className=" relative bottom-2 mx-2 nexora-orange"
            text={["Electronics", "Clothes", "Shoes"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            cursorCharacter=""
          />

          <SplitText
            text=" at Unbeatable Prices. Shop Now!"
            className="inline"
            delay={50}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <div className="flex justify-center items-center gap-5 mt-5 md:flex-row xsm:flex-col">
            <Link href="/products">
              <Button
                variant="default"
                className="bg-(--main) p-6 px-10 uppercase font-bold hover:bg-orange-600 cursor-pointer"
              >
                Explore
              </Button>
            </Link>
            <Link href="/categories">
              <Button className="bg-white text-(--main) p-6 px-10 font-bold uppercase hover:bg-gray-400 cursor-pointer">
                Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center flex-col w-full mx-auto">
        <div className="text-center">
          <h2 className="font-bold uppercase text-4xl relative group p-2 mb-4">
            Our Partners
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main) "></span>
          </h2>
        </div>

        <div className="w-full">
          <LogoLoop
            logos={imageLogos}
            speed={70}
            direction="right"
            logoHeight={100}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="null"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </>
  );
}
