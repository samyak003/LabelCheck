import {
    ChevronLeft,
    Pizza,
    PlusCircle,
    Trash,
    Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Header } from "@/components/Header"
import { Pie, PieChartWText } from "@/components/PieChart"
import IngredientList from "@/components/IngredientList"

export default function Check() {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <h1 className="text-4xl  text-center mt-6 font-semibold">Check</h1>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button onClick={() => { navigate(-1) }} variant="outline" size="icon" className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Pro Controller
                        </h1>
                        <Badge variant="secondary" className="ml-auto sm:ml-0 ">
                            Food
                        </Badge>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button variant="destructive" size="sm">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                defaultValue="Gamer Gear Pro Controller"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="type">Type</Label>
                                            <Select>
                                                <SelectTrigger id="type" aria-label="Select type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Active</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="items-center gap-2 md:ml-auto md:flex">
                                            <Button variant="outline" size="sm">
                                                Discard
                                            </Button>
                                            <Button size="sm">Save</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <PieChartWText />
                            </Card>
                        </div>
                    </div>
                    <IngredientList />
                </div>
            </main>
        </>
    )
}