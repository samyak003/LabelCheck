import { Header } from "@/components/Header";
import { Plus } from "lucide-react";

import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";

const history = [[]]
export default function Home() {
    return (
        <>
            <Header />
            {history.length <= 0 ? (
                <>
                    <div className="w-full grid place-content-center h-screen text-center">
                        <h1 className="text-4xl">You haven't checked any product yet!</h1>
                        <p>Tap on the + button to check your first product</p>
                    </div>

                </>
            ) : (<>
                <div className="">
                    <h1 className="text-4xl  text-center mt-6 font-semibold">Product History</h1>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                            <Link to="/check/gerg">
                                <Card x-chunk="dashboard-01-chunk-0" className="bg-dangerous">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Lays Chips
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">5/10</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link to="/check/gerg">
                                <Card x-chunk="dashboard-01-chunk-1" className="bg-moderateRisk">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Subscriptions
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+2350</div>
                                        <p className="text-xs text-muted-foreground">
                                            +180.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link to="/check/gerg">
                                <Card x-chunk="dashboard-01-chunk-2" className="bg-safe">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground">
                                            +19% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link to="/check/gerg">
                                <Card x-chunk="dashboard-01-chunk-3">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+573</div>
                                        <p className="text-xs text-muted-foreground">
                                            +201 since last hour
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </main>
                </div>
            </>)}
            <div className="fixed bottom-8 right-8">
                <Button variant="default" size="icon">
                    <Plus className="h-6 w-6" />
                </Button>
            </div>
        </>
    );
}
