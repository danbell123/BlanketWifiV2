import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Segment } from "@/types/segment";
import CustomDropdownMenu from "@/components/actionDropdowns/dropdownMenu";
import { Badge } from "@/components/ui/badge";
import AvatarList from "@/components/AvatarList";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Segment>[] = [
  {
    accessorKey: "name", // The key from the data
    header: () => null, // Renders nothing for the header
    cell: () => null, // Renders nothing for the cell
    enableSorting: true, // Allows sorting on this hidden column if necessary
    enableColumnFilter: true, // Enables filtering if you decide to filter on this hidden column
  },
  {
    id: "nameAndDescription",
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-start items-center">
          Segment Name
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="material-icons">sort</span>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row gap-1">
          <span className="text-foreground text-lg font-semibold">
            <span
              className="size-3 rounded-full inline-block mr-2"
              style={{ backgroundColor: row.original.colour }}
            />
            {row.original.name}
          </span>
        </div>
        <span className="text-sm text-card-foreground">
          {row.original.description || "No description"}
        </span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-start items-center">
          Last Updated
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="material-icons">sort</span>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return new Date(row.original.updated_at).toLocaleDateString();
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 w-min capitalize">
        <Badge variant="outline">{row.original.type}</Badge>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: "customerIDs",
    header: "Customer IDs",
    cell: ({ row }) => {
      return (
        <div>
          <AvatarList segmentId={row.original.segment_id} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const segmentId = row.original.segment_id;
      const menuItems = [
        { label: "View segment", path: `/segments/${segmentId}` },
        { label: "Edit segment", path: `/segments/edit/${segmentId}` },
        { label: "Delete segment", path: `/segments/delete/${segmentId}` },
      ];
      return <CustomDropdownMenu menuItems={menuItems} />;
    },
  },
];
