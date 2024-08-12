import { Link } from "react-router-dom";
import {
    CircleUser,
    Package2,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./mode-toggle";
import { auth } from "@/firebase";
import { useStateValue } from "@/StateProvider";

export function Header() {
    const [{ user }, dispatch] = useStateValue()
    return (
        <header className="z-10 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="">Label Check</span>
                </Link>

            </nav>

            <div className="ml-auto flex gap-2 sm:flex-initial">
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar>
                                <AvatarImage src={user.photoURL} />
                                <AvatarFallback>

                                    <CircleUser className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <Link to="https://github.com/samyak003/LabelCheck">
                                Github Repo
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { auth.signOut() }}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

    )
}
