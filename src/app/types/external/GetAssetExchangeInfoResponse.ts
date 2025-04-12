import {Asset, AssetType} from "../Asset";

export interface GetAssetExchangeInfoResponse {
    name: string;
    type: AssetType;
    amount: number;
    fiat_value: number;
    fiat: string;
    total_fiat_value: number;
    avg_bougth_fiat_value: number;
    profit_fiat_value: number;
    profit_percentage: number;
  }

export const mapToAssetExchangeInfo = (data: GetAssetExchangeInfoResponse): Asset => ({
    name: data.name,
    type: data.type,
    amount: data.amount,
    fiatValue: data.fiat_value,
    fiat: data.fiat,
    totalFiatValue: data.total_fiat_value,
    avgBoughtFiatValue: data.avg_bougth_fiat_value,
    profitFiatValue: data.profit_fiat_value,
    profitPercentage: data.profit_percentage
});