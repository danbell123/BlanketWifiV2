import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface MenuItem {
  label: string;
  path: string;
}

interface CustomDropdownMenuProps {
  menuItems: MenuItem[];
}

function CustomDropdownMenu({ menuItems }: CustomDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <span className="material-icons select-none cursor-default">
            more_horiz
        </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item, index) => (
          <div key={index}>
            {index !== 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem asChild>
              <Link href={item.path} passHref>
                {item.label}
              </Link>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropdownMenu;
