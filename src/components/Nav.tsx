"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentHorizontal,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuTriggerHorizontal,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavSubItem = {
  title: string;
  href: string;
  description: string;
};

type NavItem =
  | {
      title: string;
      href: string;
      subItems?: never;
    }
  | {
      title: string;
      href?: never;
      subItems: NavSubItem[];
    };

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const NavItems: NavItem[] = [
  {
    title: "Components",
    subItems: components,
  },
  {
    title: "Protected",
    href: "/protectedroute",
  },
];

export default function Nav() {
  return (
    <div className="justify-center">
      <NavTest />
    </div>
  );
}

function NavTest() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NavItems.map((navItem) => {
          //Menu items with links (no dropdown)
          if (!!navItem.href) {
            return (
              <Link
                href={navItem.href}
                legacyBehavior
                passHref
                key={navItem.title}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {navItem.title}
                </NavigationMenuLink>
              </Link>
            );
          }
          if (!!navItem.subItems) {
            //Drop down menu items
            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {navItem.subItems.map((component: NavSubItem) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// function NavDesktop() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     <Logo />
//                     <div className="mb-2 mt-4 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Beautifully designed components built with Radix UI and
//                       Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

function NavMobile() {
  return (
    <DropdownMenu p-2>
      <DropdownMenuTrigger className="p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
        <HamburgerIcon />
        <span className="sr-only">Menu Icon</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="overflow-visible">
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="flex-col align-start ">
            {NavItems.map((navItem) => {
              //Menu items with links (no dropdown)
              if (!!navItem.href) {
                return (
                  <Link
                    href={navItem.href}
                    legacyBehavior
                    passHref
                    key={navItem.title}
                  >
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start"
                      )}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </Link>
                );
              }
              if (!!navItem.subItems) {
                //Drop down menu items
                return (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuTriggerHorizontal className="w-full justify-start">
                      {navItem.title}
                    </NavigationMenuTriggerHorizontal>
                    <NavigationMenuContentHorizontal>
                      <ul className="grid w-[200px] gap-3 p-2">
                        {navItem.subItems.map((component: NavSubItem) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            className="max-w-full"
                          >
                            {/* {component.description} */}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContentHorizontal>
                  </NavigationMenuItem>
                );
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h8m-8 6h16"
    />
  </svg>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
