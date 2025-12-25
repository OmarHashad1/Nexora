import React from "react";
import logo from "../../../public/NexoraLogo.png";
import Image from "next/image";
import {
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="p-5 container">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex xsm:pb-4 md:justify-center items-center">
            <div>
              <Image src={logo} width={50} alt="Website Logo"></Image>
            </div>
            <h2 className="text-2xl font-bold uppercase -m-px">exora</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            

            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full flex justify-between">
          <FooterCopyright href="#" by="Omar Hashad™" year={2025} />
          <div className="flex justify-center items-center">
            <Twitter className="w-5 h-5" />
            <Facebook className="w-5 h-5 mx-4" />
            <Instagram className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
