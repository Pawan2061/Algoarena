"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavbarComponent() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <div className="flex items-center space-x-4">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="Logo"
          className="w-10 h-10"
        />
      </div>
      <div className="hidden md:block text-xl font-bold">My Awesome App</div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <Button onClick={() => setTheme("light")}>Light</Button> */}
            {/* <Button onClick={() => setTheme("dark")}>Dark</Button> */}
            {/* <Button onClick={() => setTheme("system")}>System</Button> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Join</Button>
      </div>
    </nav>
  );
}
