"use client";

import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Asset } from "@/app/types/Asset"

const colors = ['#2662d9','#e23670','#ffa245','#2eb88a','#af57db']

// Function to generate evenly spaced HSL colors
const generateColor = (index: number, total: number) => {
    if (colors.length > index )
        return colors[index];

  // Desplazamiento para no iniciar en hue = 0 (rojo)
  const offset = 130; 
  const hue = (offset + index * (360 / total)) % 360;
  
  return `hsl(${hue}, 50%, 40%)`;
};

export const AssetsPieChart = ({ assets }: { assets: Asset[] }) => 
{
    // Include a "fill" property for each data item.
    const chartData = assets.map((asset, index) => ({
        assetName: asset.name,
        total: asset.totalFiatValue,
        fill: generateColor(index, assets.length),
    }));

    const totalValue = assets.reduce((sum, asset) => sum + asset.totalFiatValue, 0);

    const totalProfitValue = assets.reduce((sum, asset) => sum + asset.profitFiatValue, 0);

    // Define ChartConfig dynamically following the expected type.
    // The key names here should match the asset names (or a unique identifier)
    const chartConfig: ChartConfig = Object.fromEntries(
        chartData.map((asset) => [
        asset.assetName,
        {
            label: asset.assetName,
            color: asset.fill, // use the "fill" value generated above
        },
        ])
    );

    return <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
            <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
            >
            <PieChart>
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                data={chartData}
                dataKey="total"
                nameKey="assetName"
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
                            className="fill-foreground text-2xl font-bold"
                            >
                            {Math.round(totalValue).toLocaleString()}
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                            >
                            USD
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
            <div className={`flex items-center gap-2 text-lg font-bold leading-none ${totalProfitValue > 0 ? 'text-green-800' : 'text-rose-800'}`}>
                {Math.round(totalProfitValue).toLocaleString()} USD {totalProfitValue > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
        </CardFooter>
    </Card>
}