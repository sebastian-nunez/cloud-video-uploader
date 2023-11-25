"use client";

import { signInWithGoogle, signOut } from "@/firebase/firebase";
import useAuth from "@/hooks/useAuth";
import {
  Button,
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
import UploadButton from "./upload-button";
import UserDropdown from "./user-dropdown-menu";

const NavBar: React.FC = () => {
  // state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

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
      <NavbarContent justify="end">
        {user && (
          <NavbarMenuItem>
            <UploadButton />
          </NavbarMenuItem>
        )}

        {/* ----------- Sign In / Sign Out ---------- */}
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <NavbarMenuItem>
            <Button
              radius="full"
              variant="ghost"
              color="primary"
              onClick={signInWithGoogle}
            >
              Sign In
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarContent>

      {/* ---------- MOBILE MENU --------- */}
      <NavbarMenu className="flex flex-col gap-3">
        <NavbarMenuItem>
          <Link className="w-full text-xl" href="/">
            Home
          </Link>
        </NavbarMenuItem>

        {/* ----------- Sign In / Sign Out ---------- */}
        {user ? (
          <NavbarMenuItem>
            <Link className="w-full text-xl" href="/" onClick={signOut}>
              Sign Out
            </Link>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Link
              className="w-full text-xl"
              href="/"
              onClick={signInWithGoogle}
            >
              Sign In
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
