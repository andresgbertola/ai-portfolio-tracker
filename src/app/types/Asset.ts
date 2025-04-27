export type AssetType = "Stock" | "Crypto" | "Fiat" | "CEDEAR";

export interface Asset
{
    name: string;
    type: AssetType;
    amount: number;
    fiatValue: number;
    fiat: string;
    totalFiatValue: number;
    avgBoughtFiatValue: number;
    profitFiatValue: number;
    profitPercentage: number;
}

export type InternalAsset = {
    name: string;
    type: AssetType;
    amount: number;
    exchange: string;
};