"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomerFullData } from "@/types/customer";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<CustomerFullData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "profilePictureURL",
    header: "",
    cell: (info) => {
      const imageUrl: string = info.getValue() as string;
      const fallbackText: string = `${info.row.original.customer.firstname[0]}${info.row.original.customer.lastname[0]}`;
      return (
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorFn: (row) => `${row.customer.firstname} ${row.customer.lastname}`,
    id: "name",
    header: "Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "customer.email",
    header: "Email",
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "visits.total_visits",
    header: "Total Visits",
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "visits.last_30_days_visits",
    header: "Visits Last 30 Days",
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorFn: (row) =>
      row.visits?.last_visit ? row.visits.last_visit.toISOString() : "",
    id: "last_visit",
    header: "Last Visit",
    cell: (info) => {
      const value = info.getValue() as string;
      return value ? new Date(value).toLocaleString() : "N/A";
    },
    enableSorting: true,
  },
];
