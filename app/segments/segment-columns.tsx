// segment-columns.tsx
import React, { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Segment } from "@/types/segment";
import CustomDropdownMenu from '@/components/actionDropdowns/dropdownMenu';
import { Badge } from '@/components/ui/badge';
import AvatarList from '@/components/AvatarList';

export const columns: ColumnDef<Segment>[] = [
  {
    id: 'nameAndDescription',
    header: 'Segment Info',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <span className="text-foreground text-lg font-semibold">{row.original.name}</span>
        <span className="text-sm text-card-foreground">{row.original.description || "No description"}</span>
      </div>
    ),
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
          <AvatarList segmentId={row.original.segment_id}/>
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
        { label: 'View segment', path: `/segments/${segmentId}` },
        { label: 'Edit segment', path: `/segments/edit/${segmentId}` },
        { label: 'Delete segment', path: `/segments/delete/${segmentId}` },
      ];
      return <CustomDropdownMenu menuItems={menuItems} />;
    },
  },
];

