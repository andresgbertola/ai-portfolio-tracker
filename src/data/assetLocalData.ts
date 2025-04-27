import { FIWIND, BUENBIT, BITRUE } from "../constants/exchanges";
import { AssetConversion } from "../app/types/AssetConversion";
import { InternalAsset } from "../app/types/Asset";

// These are our mock data arrays.
export const assetConversions: AssetConversion[] = [
  {
    assetName: "BTC",
    quantity: 0.1,
    exchangedQuantity: 8500,
    exchangedAssetName: "USD",
    unitExchangeValue: 85000,
    date: "2025-03-01"
  },
  {
    assetName: "SOL",
    quantity: 10,
    exchangedQuantity: 1500.0,
    exchangedAssetName: "USD",
    unitExchangeValue: 150,
    date: "2025-02-01"
  },
  {
    assetName: "XRP",
    quantity: 1000.0,
    exchangedQuantity: 25000,
    exchangedAssetName: "USD",
    unitExchangeValue: 2.5,
    date: "2025-01-01"
  }
];

export const mock_assets : InternalAsset[] = [
  { name: "USD", type: "Fiat", amount: 1000, exchange: "none" },
  { name: "SOL", type: "Crypto", amount: 0, exchange: FIWIND },
  { name: "BTC", type: "Crypto", amount: 0, exchange: BUENBIT },
  { name: "XRP", type: "Crypto", amount: 0, exchange: BITRUE },
];
