import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default async function ProfileMenu() {
  return (
    <div className="lg:flex lg:items-center lg:gap-2 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="lg:rounded-[5px] lg:border-transparent"
          align="end"
        >
          <DropdownMenuItem className="lg:text-[18px] lg:font-medium">
            <Link href="#">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="lg:text-[18px] lg:font-medium">
            <Link href="/logout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
