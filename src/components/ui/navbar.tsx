"use client";
 
import * as React from "react"
 
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { useAuth } from '@pangeacyber/react-auth'
import Image from "next/image";

  export function NavBar(){
    const { logout } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
      "Demo",
      "Raffle",
      "Learn More",
      "Log Out",
    ];

    const ref = [
        "/demo",
        "/raffle",
        "https://pangea.cloud/docs/",
        "Log Out",
      ];
  
    return (
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>
  
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Image alt= "" src='/pangea-logomark.png' width={180} height={180}></Image>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand className="float-right">
            <Image alt= "" src='/pangea-logomark.png' width={180} height={180}></Image>
          </NavbarBrand>
          {/* <NavbarItem>
            <Link color="foreground" href="/demo">
              Demo ⚡️
            </Link>
          </NavbarItem> */}
          {/* <NavbarItem>
            <Link color="foreground" href="/raffle">
              Raffle 🎁
            </Link>
          </NavbarItem> */}
          <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                <Button
                    className="p-2 bg-transparent data-[hover=true]:bg-transparent text-base"
                    radius="md"
                    variant="light"
                >
                    Learn More 💡
                </Button>
                </DropdownTrigger>
            </NavbarItem>
                <DropdownMenu
                    aria-label="ACME features"
                    className="w-[380px] text-purple-700 font-normal text-base"
                    itemClasses={{
                    base: "gap-4",
                    }}
                >
                    <DropdownItem
                        key="authN"
                        description="Use Pangea's hosted AuthN Flow. Code it once. Configure whenever."
                        href="https://pangea.cloud/services/authn/"
                    >
                    Authentication
                    </DropdownItem>
                    <DropdownItem
                        key="intel"
                        description="Partnered with the best rep providers in security. Get access through an API instantly."
                        href="https://pangea.cloud/services/ip-intel/reputation/"
                    >
                        Intel
                    </DropdownItem>
                    <DropdownItem
                        key="sal"
                        description="Partnered with the best rep providers in security. Get access through an API instantly."
                        href="https://pangea.cloud/services/secure-audit-log/"
                    >
                        Secure Audit Log
                    </DropdownItem>
                    <DropdownItem
                        key="docs"
                        description="Partnered with the best rep providers in security. Get access through an API instantly."
                        href="https://pangea.cloud/docs/"
                    >
                        Docs
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <NavbarItem>
            <Link className="font-bold text-large" color="foreground" href="https://thatconf.vercel.app/">
              thatconf.vercel.app
            </Link>
          </NavbarItem>
        </NavbarContent>
  
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="default" href="#" variant="flat" onClick={logout}>
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
  
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                   index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href={ref[index]}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
}
