import {GetAssetExchangeInfoResponse, mapToAssetExchangeInfo} from "../app/types/external/GetAssetExchangeInfoResponse";
import {API_LOCAL_BASE_URL,API_BITRUE_LOCAL_BASE_URL} from "../../src/constants/externalApis";
import {Asset, AssetType} from "../app/types/Asset";
import { InternalAsset } from "../app/types/Asset";
import {EXCHANGES, FIWIND, BUENBIT, BITRUE} from "../constants/exchanges";
import { mock_assets, assetConversions } from "@/data/assetLocalData";
import { CRYPTO } from "@/constants/types";

/**
 * Fetch external API data for the given asset.
 */
async function processElement(asset: InternalAsset): Promise<{
  name: string;
  type: AssetType;
  amount: number;
  value: number;
}> {
  const url = (() => {
    switch (asset.exchange) {
      case FIWIND:
      case BUENBIT:
        return `${API_LOCAL_BASE_URL}/api/${asset.exchange}/${asset.name}/ARS/1`;
      case BITRUE:
        return `${API_BITRUE_LOCAL_BASE_URL}/api/v1/ticker/24hr?symbol=${asset.name}USDT`;
      default: return '';
    }
  })();
        
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();
    const value = EXCHANGES_FUNCTIONS[asset.exchange as keyof typeof EXCHANGES_FUNCTIONS].getValue(apiData);

    return {
      name: asset.name,
      type: asset.type,
      amount: asset.amount,
      value: value
    };
  } catch (error) {
    console.error(`Error fetching data for ${asset.name}:`, error);
    throw error;
  }
}

const USD_API_URLS = {
  [FIWIND]: [
    `${API_LOCAL_BASE_URL}/api/fiwind/BTC/ARS/1`,
    `${API_LOCAL_BASE_URL}/api/fiwind/BTC/USD/1`,
  ],
  [BUENBIT]: [
    `${API_LOCAL_BASE_URL}/api/buenbit/DAI/ARS/1`,
    `${API_LOCAL_BASE_URL}/api/buenbit/DAI/USD/1`,
  ]
};

/**
 * Fetch the USD exchange rate using two external endpoints.
 * Returns the exchange rate as ars_bid / usd_bid.
 */
async function getUsdValue(exchange: keyof typeof USD_API_URLS): Promise<number> {
  const urls = USD_API_URLS[exchange];
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });
    const [arsData, usdData] = await Promise.all(
      responses.map((r) => r.json())
    );
    const arsBid = arsData.bid;
    const usdBid = usdData.bid;
    return arsBid / usdBid;
  } catch (error) {
    console.error("Error fetching USD exchange rate:", error);
    throw error;
  }
}

const EXCHANGES_FUNCTIONS = {
  [FIWIND]: { getUsdValue: () => getUsdValue(FIWIND), getValue: (apiResponse: { bid: number }) => apiResponse.bid },
  [BUENBIT]: { getUsdValue: () => getUsdValue(BUENBIT), getValue: (apiResponse: { bid: number }) => apiResponse.bid },
  [BITRUE]: { getUsdValue: () => 1, getValue: (apiResponse: { askPrice: number }[]) => apiResponse[0].askPrice }
};

export async function localGetAssets(): Promise<Asset[]> {
  // Process crypto assets concurrently
  const cryptoAssets = mock_assets.filter((asset) => asset.type === CRYPTO);
  const processedPromises = cryptoAssets.map((asset) => processElement(asset));
  const assetExchangeInfoObjs = await Promise.all(processedPromises);

  const usdExchangedictionary: { [key: string]: number } = {};

  for (const exchange of EXCHANGES) {
      const usdExchangeRate = await EXCHANGES_FUNCTIONS[exchange as keyof typeof EXCHANGES_FUNCTIONS].getUsdValue();
      usdExchangedictionary[exchange] = usdExchangeRate;
  }

  const assetExchangeInfoRequests: GetAssetExchangeInfoResponse[] = [];

  for (const asset of mock_assets) {
    if (asset.type === CRYPTO) {
      const assetExchangeInfo = assetExchangeInfoObjs.find(
        (a) => a.name === asset.name
      );
      if (assetExchangeInfo) {
        // Get all conversion entries for this asset
        const conversions = assetConversions.filter(
          (conv) => conv.assetName === asset.name
        );

        let avg_bougth_fiat_value = 0;
        if (conversions.length > 0) {
          const total = conversions.reduce((sum, conv) => {
            // If exchangedAssetName is not ARS, use the given unitExchangeValue,
            // otherwise convert it using the USD exchange rate.
            const value =
              conv.exchangedAssetName !== "ARS"
                ? conv.unitExchangeValue
                : conv.unitExchangeValue / usdExchangedictionary[asset.exchange];
            return sum + value;
          }, 0);
          avg_bougth_fiat_value = total / conversions.length;
        }

        // Sum the total quantity of the asset using all conversions
        const assetQuantity = conversions.reduce(
          (sum, conv) => sum + conv.quantity,
          0
        );

        const fiat_value = assetExchangeInfo.value / usdExchangedictionary[asset.exchange];
        const total_fiat_value = fiat_value * assetQuantity;
        const profit_fiat_value =
          total_fiat_value - avg_bougth_fiat_value * assetQuantity;
        const profit_percentage = avg_bougth_fiat_value
          ? (profit_fiat_value / (avg_bougth_fiat_value * assetQuantity)) * 100
          : 0;

        assetExchangeInfoRequests.push({
          name: asset.name,
          type: asset.type,
          amount: assetQuantity,
          fiat_value,
          fiat: "USD",
          total_fiat_value,
          avg_bougth_fiat_value,
          profit_fiat_value,
          profit_percentage,
        });
      }
    } else {
      // For non-crypto (Fiat) assets, return the asset as is
      assetExchangeInfoRequests.push({
        name: asset.name,
        type: asset.type,
        amount: asset.amount,
        fiat_value: asset.amount,
        fiat: "USD",
        total_fiat_value: asset.amount,
        avg_bougth_fiat_value: 0,
        profit_fiat_value: 0,
        profit_percentage: 0,
      });
    }
  }
    return assetExchangeInfoRequests.map((asset) => (mapToAssetExchangeInfo(asset))) ;
}