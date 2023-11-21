"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import { MonitorPlay } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl" isBlurred={false}>
      {/* ---------- LEFT --------- */}
      <NavbarContent>
        {/* ------ Menu Toggle ------ */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        {/* ---------- Logo --------- */}
        <Link href="/" className="hidden sm:block ">
          <NavbarBrand className="flex gap-1 hover:cursor-pointer">
            <MonitorPlay width={25} className="text-red-600" />
            <p className="font-bold text-inherit">Cloud Video Uploader</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* ---------- CENTER --------- */}
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>

      {/* ---------- RIGHT --------- */}
      <NavbarContent justify="end"></NavbarContent>

      {/* ---------- MOBILE MENU --------- */}
      <NavbarMenu>
        <NavbarMenuItem key={"Home"}>
          <Link className="w-full text-3xl" href="/">
            Home
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
