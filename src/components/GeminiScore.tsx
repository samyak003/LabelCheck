import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"


const chartConfig = {
    count: {
        label: "Count",
    },
    safe: {
        label: "Safe",
        color: "hsl(var(--safe))",
    },
    moderateRisk: {
        label: "Moderate Risk",
        color: "hsl(var(--moderate-risk))",
    },
    dangerous: {
        label: "Dangerous",
        color: "hsl(var(--dangerous))",
    },
} satisfies ChartConfig

export function GeminiScore({ data }) {
    const [chartData, setChartData] = React.useState([])
    React.useEffect(() => {
        let category = {}
        if (data.score <= 3) {
            category = { ingredientype: "Dangerous", fill: "var(--color-dangerous)" }
        }
        else if (data.score > 3 && data.score <= 7) {
            category = { ingredientype: "Moderate Risk", fill: "var(--color-moderateRisk)" }
        }
        else {
            category = { ingredientype: "Safe", fill: "var(--color-safe)" }

        }
        setChartData([
            { ...category, count: Number(data.score) },
            {
                count: Number(data.maxScore) - Number(data.score),
            },
        ])
    }, [data])
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Gemini Score</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="ingredientType"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {data.score} / {data.maxScore}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">

                <div className="flex-1  text-center leading-none text-muted-foreground">

                    Conclusion - {data.shortMessage}
                </div>
            </CardFooter>
        </Card>
    )
}
