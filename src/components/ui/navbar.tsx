import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu";
  import Link from "next/link"
  import { useAuth } from '@pangeacyber/react-auth'

  export function NavBar(){
    const { logout } = useAuth();

    return(
        <NavigationMenu className="fixed max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/raffle" legacyBehavior passHref>
                        <NavigationMenuLink >
                        raffle
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem >
                <NavigationMenuItem>
                    <Link href="/map" legacyBehavior passHref>
                        <NavigationMenuLink>
                        map
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink onClick={logout}>
                        logout
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )

}