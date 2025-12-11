"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { useIsMounted } from "@/hooks/useIsHydrated";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavbar } from "@/hooks/useNavbar";
import { logout } from "@/lib/supabase/auth";

import {
  User as UserIcon,
  Clock,
  Menu,
  SearchCode,
  LogOut,
  BookOpen
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import { Separator } from "@/components/ui/separator";
import type { FullUserData } from "@/lib/types/db";
import { getProfileImageUrl } from "@/lib/supabase/supabase";
import { cn } from "@/lib/utils";

type NavItem = {
  showInMinimal?: boolean;
  icon?: React.ReactNode;
  label: string;
  url: string;
  msg?: string;
  func?: () => boolean;
  children?: {
    title: string;
    href: string;
    description: string;
  }[];
};

const USER_ITEM: NavItem = {
  showInMinimal: true,
  label: "Settings",
  url: "/settings",
  msg: "Going to Settings",
  func: () => {
    toast.warning("Under Construction");
    return false;
  }
};

const LOGIN_ITEM: NavItem = {
  icon: <UserIcon className="h-5 w-5" />,
  label: "Log In",
  url: "/auth/login",
  msg: "Going to Login"
};

const NAV_ITEMS: NavItem[] = [
  {
    showInMinimal: true,
    icon: <UserIcon className="h-5 w-5" />,
    label: "Home",
    url: "/",
    msg: ""
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Info",
    url: "/info",
    msg: "Open Info",
    children: [
      {
        title: "Kickoff Guide",
        href: "/info/kickoff-guide",
        description: "What to expect at kickoff."
      },
      {
        title: "Strategy Home",
        href: "/info/strategy",
        description: "Guide to strategy"
      }
    ]
  },
  {
    icon: <SearchCode className="h-5 w-5" />,
    label: "Scouting",
    url: "/api/redirects/scouting",
    msg: "Under Construction",
    func: () => {
      toast.warning("Under Construction");
      return false;
    }
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Outreach",
    url: "/outreach",
    msg: "Going to the Outreach Sheet"
  }
];

const AUTHED_ITEMS: NavItem[] = [
  {
    showInMinimal: true,
    icon: <LogOut className="h-5 w-5" />,
    label: "Sign Out",
    url: "/",
    msg: "Signing Out",
    func: () => {
      logout();
      return false;
    }
  }
];

export type NavItems = typeof NAV_ITEMS;

type ChildProps = {
  user: FullUserData | null;
  navItems: typeof NAV_ITEMS;
  onNavigate: (url: { url: string; msg?: string }) => void;
} & ReturnType<typeof useNavbar>;

export default function Navbar({}) {
  const router = useRouter();

  const { isSmallScreen } = useIsMobile(true);
  const state = useNavbar();
  const isHydrated = useIsMounted();

  const { user } = useUser();

  if (!isHydrated) return null;

  const navItems = state.renderMinimal
    ? NAV_ITEMS.filter((item) => item.showInMinimal)
    : NAV_ITEMS;

  const onNavigate = function ({
    url,
    msg,
    func = () => true
  }: {
    url: string;
    msg?: string;
    func?: () => boolean;
  }) {
    if (!func()) return;

    if (msg) toast(`${msg}`);
    router.replace(url);
  };

  if (state.isDisabled) return;

  return isSmallScreen ? (
    <Mobile {...state} {...{ navItems, user, onNavigate }} />
  ) : (
    <Desktop {...state} {...{ navItems, user, onNavigate }} />
  );
}

function Mobile({
  navItems,
  user,
  mobileNavbarSide,
  onNavigate,
  setExpanded
}: ChildProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen, setExpanded]);

  const handleNavigation = (item: {
    url: string;
    msg?: string;
    func?: () => boolean;
  }) => {
    setIsOpen(false);
    onNavigate(item);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={
            `fixed top-4 z-50 h-10 w-10 rounded-lg shadow-lg bg-card/95 backdrop-blur-xl border border-border hover:bg-muted` +
            (mobileNavbarSide === "left" ? " left-4" : " right-4")
          }>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle hidden>Navigation</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-4">
          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={getProfileImageUrl(user)}
                  alt={user?.name || "Unknown Name"}
                  className="rounded-full"
                />
                <AvatarFallback className="bg-muted text-muted-foreground text-base rounded-full flex items-center justify-center h-full w-full">
                  {(user?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-base font-medium text-foreground">
                  {user?.user_metadata?.name || "Unknown User"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "? Role ?"}
                </span>
              </div>
            </div>
          ) : null}

          {/* Navigation Items */}
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() =>
                  handleNavigation({
                    url: item.url,
                    msg: item.msg,
                    func: item.func
                  })
                }>
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Button>
            ))}

            <Separator className="my-4" />

            {user ? (
              AUTHED_ITEMS.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  onClick={() =>
                    handleNavigation({
                      url: item.url,
                      msg: item?.msg,
                      func: item?.func
                    })
                  }>
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Button>
              ))
            ) : (
              <Button
                variant="default"
                className="w-full justify-start text-left h-12"
                onClick={() => handleNavigation(LOGIN_ITEM)}>
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Log In</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Desktop({
  navItems,
  user,
  onNavigate,
  setExpanded,
  defaultExpanded: defaultToShown
}: ChildProps) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpanded(isVisible);
  }, [isVisible, setExpanded]);

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.onmouseenter = () => setHovered(true);
      navbarRef.current.onmouseleave = () => setHovered(false);

      const scrollHandler = () => {
        const belowScrollThreshold = window.scrollY >= 100;

        if (hovered) {
          setIsVisible(true);
          return;
        }

        if (belowScrollThreshold) {
          setIsVisible(false);
          return;
        }

        if (defaultToShown) {
          setIsVisible(true);
          return;
        }

        setIsVisible(false);
      };

      window.addEventListener("scroll", scrollHandler);

      scrollHandler();
    }
  }, [hovered, defaultToShown, setHovered, setIsVisible, navbarRef]);

  return (
    <div
      ref={navbarRef}
      data-navbar-root
      className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out w-max ${
        isVisible ? "translate-y-0" : "-translate-y-[calc(100%-1rem)]"
      }`}>
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl px-6 py-3 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between space-x-8 transition-all duration-300 ease-in-out">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <div className="flex items-center space-x-2">
                        <div className="size-5">{item.icon}</div>
                        <span className="ml-1 text-foreground">
                          {item.label}
                        </span>
                      </div>
                    </NavigationMenuTrigger>
                    {item.children && item.children.length > 0 && (
                      <NavigationMenuContent>
                        <NavigationMenuList className="px-3">
                          <ul className="grid w-[300px] gap-4 p-2">
                            {item.children.map((child, childIndex) => (
                              <ListItem
                                key={childIndex}
                                href={child.href}
                                title={child.title}>
                                {child.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuList>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                );
              })}

              {user &&
                AUTHED_ITEMS.map((item, index) => (
                  <NavigationMenuItem key={`auth-${index}`}>
                    <NavigationMenuLink
                      href={item.url}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      )}
                      onClick={(e) => {
                        if (item.func && !item.func()) {
                          e.preventDefault();
                          return;
                        }
                        if (item.msg) toast(item.msg);
                      }}>
                      <div className="flex items-center space-x-2">
                        <div className="size-4">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
            <div className="flex items-center space-x-3 pl-6 ml-2 border-l border-border">
              <Link
                href={USER_ITEM.url}
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out opacity-100 group">
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-sm font-medium text-foreground underline transition-all duration-200 ease-in-out decoration-transparent group-hover:decoration-current">
                    {user?.name || "Unknown Name"}
                  </span>
                  <span className="text-sm font-sm text-muted-foreground">
                    {user?.role
                      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      : "? Role ?"}
                  </span>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={getProfileImageUrl(user)}
                    alt={user?.name || "Unknown Name"}
                    className="rounded-full"
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs rounded-full flex items-center justify-center h-full w-full">
                    {(user?.name || "U").charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-3 pl-7 ml-2 border-l border-border">
              <Button
                variant="default"
                size="sm"
                className="flex items-center space-x-3"
                onClick={onNavigate.bind(null, LOGIN_ITEM)}>
                <UserIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Log In</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="h-4 w-full"></div>
    </div>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & {
  title: string;
}) => {
  return (
    <li>
      <NavigationMenuLink
        href={href!}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
};
