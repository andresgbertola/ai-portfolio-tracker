import { Card, CardContent } from "@/components/ui/card"
import { AssetInfo } from "@/app/types/AssetInfo"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

export const AssetMinimalCard = (assetInfo : AssetInfo) => {
    const isProfit = assetInfo.percentage && assetInfo.percentage > 0

    return <Card>
        <CardContent className="flex flex-row gap-x-2">
            <p className="font-bold">{assetInfo.name}</p>            
            <p className={`font-bold ${
                    isProfit ? "text-green-800" : "text-rose-800"
                  }`}>{assetInfo.percentage.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p> 
            <p>{isProfit ? (
                <ArrowUpIcon className="h-4 w-4 text-green-600" />
                ) : (
                <ArrowDownIcon className="h-4 w-4 text-rose-600" />
                )}
            </p>
        </CardContent>
    </Card>
}