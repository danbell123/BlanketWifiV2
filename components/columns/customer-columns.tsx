import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomDropdownMenu from "@/components/actionDropdowns/dropdownMenu"; // Adjust the import path based on where you save the component
import { Customer } from "@/types/index";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "profilePictureURL",
    header: "",
    cell: (info) => {
      const imageUrl: string = info.getValue() as string;
      const fallbackText: string = `${info.row.original.firstname[0]}${info.row.original.lastname[0]}`;
      return (
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "tel",
    header: "Telephone",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,

  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Assuming the customer ID is stored in the row under the key 'customerID'
      const customerId = row.original.wifi_user_id;
      const menuItems = [
        { label: "View customer", path: `/customers/${customerId}` },
        { label: "Edit customer", path: `/customers/edit/${customerId}` },
        {
          label: "Add customer to segment",
          path: `/customers/segments/add/${customerId}`,
        },
        { label: "Delete customer", path: `/customers/delete/${customerId}` },
      ];
      return <CustomDropdownMenu menuItems={menuItems} />;
    },
  },
];
