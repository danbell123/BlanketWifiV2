"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomDropdownMenu from '@/components/actionDropdowns/dropdownMenu'; // Adjust the import path based on where you save the component
import { Customer } from "@/types/index";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "profilePicture",
    header: "",
    cell: info => {
      const imageUrl: string = info.getValue() as string;
      return (
        <Avatar>
          <AvatarImage src={imageUrl} />
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
    header: "Actions",
    cell: ({ row }) => {
      // Assuming the customer ID is stored in the row under the key 'customerID'
      const customerId = row.original.wifi_user_id;
      const menuItems = [
        { label: 'View customer', path: `/customers/${customerId}` },
        { label: 'Edit customer', path: `/customers/edit/${customerId}` },
        { label: 'Add customer to segment', path: `/customers/segments/add/${customerId}` },
        { label: 'Delete customer', path: `/customers/delete/${customerId}` },
      ];
      return <CustomDropdownMenu menuItems={menuItems} />;
    },
  },
];
