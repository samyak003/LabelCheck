"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChartWText } from "./PieChart"


export default function IngredientList() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <Tabs defaultValue="safe" >
                    <TabsList className="w-full">
                        <TabsTrigger value="safe" className="w-full">Safe</TabsTrigger>
                        <TabsTrigger value="risky" className="w-full">Risky</TabsTrigger>
                        <TabsTrigger value="dangerous" className="w-full">Dangerous</TabsTrigger>
                    </TabsList>
                    <TabsContent value="safe"><PieChartWText /></TabsContent>
                    <TabsContent value="risky"><PieChartWText /></TabsContent>
                    <TabsContent value="dangerous"><PieChartWText /></TabsContent>
                </Tabs>

                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                        <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/02.png" alt="Avatar" />
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Jackson Lee</p>
                        <p className="text-sm text-muted-foreground">
                            jackson.lee@email.com
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/03.png" alt="Avatar" />
                        <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                        <p className="text-sm text-muted-foreground">
                            isabella.nguyen@email.com
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+$299.00</div>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/04.png" alt="Avatar" />
                        <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">William Kim</p>
                        <p className="text-sm text-muted-foreground">will@email.com</p>
                    </div>
                    <div className="ml-auto font-medium">+$99.00</div>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/05.png" alt="Avatar" />
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Sofia Davis</p>
                        <p className="text-sm text-muted-foreground">
                            sofia.davis@email.com
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                </div>
            </CardContent>
        </Card>
    )
}
