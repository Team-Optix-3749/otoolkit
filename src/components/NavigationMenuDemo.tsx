"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  // single Info menu: left card + one kickoff link
  const isMobile = useIsMobile()

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Info</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link href="/info" className="block h-full w-full rounded-md bg-card/80 p-4 no-underline">
                    <div className="mb-2 text-lg font-medium">Info</div>
                    <p className="text-sm text-muted-foreground leading-tight">Helpful guides and resources for teams (kickoff, scouting, strategy).</p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link href="/info/kickoff-guide" className="block rounded-md px-2 py-2 hover:bg-muted/30 transition-colors">Kickoff Guide</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md px-2 py-2 hover:bg-muted/30 transition-colors">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default NavigationMenuDemo
