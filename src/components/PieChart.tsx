import { Label, Pie, PieChart } from "recharts"
import * as React from "react"

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

export function PieChartWText({ data }) {
    const [chartData, setChartData] = React.useState([])
    React.useEffect(() => {
        let category = {}
        if (data.category === "Dangerous") {
            category = { ingredientype: "Dangerous", fill: "var(--color-dangerous)" }
        }
        else if (data.category === "Moderate Risk") {
            category = { ingredientype: "Moderate Risk", fill: "var(--color-moderateRisk)" }
        }
        else {
            category = { ingredientype: "Safe", fill: "var(--color-safe)" }

        }
        setChartData([
            { ...category, count: Number(data.count) },
            {
                count: Number(data.total) - Number(data.count),
            },
        ])
    }, [data])
    return (
        <div className="flex flex-col">

            <div className="flex-1 pb-0">
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
                                                    {data.count} / {data.total}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Ingredients
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
        </div>
    )
}
