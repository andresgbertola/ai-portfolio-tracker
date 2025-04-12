import { Asset } from "../app/types/Asset";
import { GetAssetExchangeInfoResponse, mapToAssetExchangeInfo } from "../app/types/external/GetAssetExchangeInfoResponse";
import axios from "axios";
import { API_URLS } from "../../src/constants/externalApis";

export const getAssests = async (): Promise<Asset[]> => {
    // Create an AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;
  
    try {
      // Make the GET request using axios with the abort signal
    console.log(API_URLS.ASSETS);
    const response = await axios.get<GetAssetExchangeInfoResponse[]>(API_URLS.ASSETS, { signal });
      return response.data.map((asset) => (mapToAssetExchangeInfo(asset))) ;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request was aborted");
      } else {
        console.error("Axios error:", error);
      }
      throw error;
    }
  };