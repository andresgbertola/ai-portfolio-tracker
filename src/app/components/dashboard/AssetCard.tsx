import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import {Asset} from "@/app/types/Asset"

export const AssetCard = (asset: Asset) => {
  const isProfit = asset.profitPercentage && asset.profitPercentage > 0

  return (
    <Card className="p-4 w-full max-w-sm mx-auto">
    <CardHeader className="p-0">
    <div className="flex justify-between items-center w-full">
        {/* Asset Name (Left) */}
        <CardTitle className="text-2xl font-bold">
        {asset.name}
        </CardTitle>

        {/* Amount (Right) */}
        <p className="text-xl font-semibold">
        {asset.amount?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
        </p>
    </div>
    </CardHeader>
      <CardContent className="p-0 ">
        {/* Amount Held */}

        {/* Current Value & Total */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current Value
            </p>
            <p className="text-lg font-bold">
              ${asset.fiatValue?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total
            </p>
            <p className="text-md font-bold">
              ${asset.totalFiatValue?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </p>
          </div>
        </div>

        {/* Profit/Loss Section */}
        {asset.type === 'Crypto' && asset.profitPercentage !== undefined && (
            <div>            
              <p className="text-sm font-medium text-muted-foreground">Profits</p>
              <div className="grid grid-cols-2 gap-4">
              {/* Percentage */}
              <div className="flex items-center space-x-2">
                {/* Optional arrow icons for up/down */}
                {isProfit ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-rose-600" />
                )}
                <p
                  className={`text-sm font-medium ${
                    isProfit ? "text-green-800" : "text-rose-800"
                  }`}
                >
                  {asset.profitPercentage.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </p>
              </div>

            {/* Profit Fiat Value */}
            <div className="flex items-center space-x-2">
              <p
                className={`text-sm font-medium ${
                  isProfit ? "text-green-800" : "text-rose-800"
                }`}
              >
                ${asset.profitFiatValue?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          </div>          
        )}
      </CardContent>
    </Card>
  )
}
