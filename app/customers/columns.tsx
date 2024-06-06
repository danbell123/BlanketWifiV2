"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Customer } from "@/types/index";

export const columns: ColumnDef<Customer>[] = [
      {
        accessorKey: "profilePicture",
        header: "",
        cell: info => {
          const imageUrl = info.getValue();
          return (
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          );
        },
      },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: info => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: info => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: info => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "tel",
    header: "Telephone",
    cell: info => info.getValue(),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
];
