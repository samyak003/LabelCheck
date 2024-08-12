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


export default function IngredientList({ data }) {
    const totalIngredients = data.safeIngredients.length + data.riskyIngredients.length + data.dangerousIngredients.length
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <Tabs defaultValue="safe" >
                    <TabsList className="w-full">
                        <TabsTrigger value="safe" className="w-full" disabled={data.safeIngredients.length === 0}>Safe</TabsTrigger>
                        <TabsTrigger value="risky" className="w-full" disabled={data.riskyIngredients.length === 0}>Risky</TabsTrigger>
                        <TabsTrigger value="dangerous" className="w-full" disabled={data.dangerousIngredients.length === 0}>Dangerous</TabsTrigger>
                    </TabsList>
                    <TabsContent value="safe">
                        <PieChartWText data={{ category: "Safe", count: data.safeIngredients.length, total: totalIngredients }} />
                        <ol className="" >
                            {data.safeIngredients.map((ingredient, index) => (
                                <li className="my-4" key={index}>
                                    <p className="text-sm font-medium leading-none capitalize">{index + 1}. {ingredient}</p>
                                </li>
                            ))}
                        </ol>
                    </TabsContent>
                    <TabsContent value="risky">
                        <PieChartWText data={{ category: "Moderate Risk", count: data.riskyIngredients.length, total: totalIngredients }} />
                        <ol className="" >
                            {data.riskyIngredients.map((ingredient, index) => (
                                <li className="my-4" key={index}>
                                    <p className="text-sm font-medium leading-none capitalize">{index + 1}. {ingredient}</p>
                                </li>
                            ))}
                        </ol></TabsContent>

                    <TabsContent value="dangerous">
                        <PieChartWText data={{ category: "Dangerous", count: data.dangerousIngredients.length, total: totalIngredients }} />
                        <ol className="" >
                            {data.dangerousIngredients.map((ingredient, index) => (
                                <li className="my-4" key={index}>
                                    <p className="text-sm font-medium leading-none capitalize">{index + 1}. {ingredient}</p>
                                </li>
                            ))}
                        </ol>
                    </TabsContent>
                </Tabs>


            </CardContent>
        </Card >
    )
}
