import { useState, useEffect } from 'react';
import { API_BITRUE_LOCAL_BASE_URL } from '@/constants/externalApis';
import { AssetInfo } from '../types/AssetInfo';
import { mock_assets } from '@/data/assetLocalData';
import { CRYPTO } from '@/constants/types';


const getCryptoData = async (cryptoName: string) : Promise<AssetInfo> => {
    const response = await fetch(`${API_BITRUE_LOCAL_BASE_URL}/api/v1/ticker/24hr?symbol=${cryptoName}USDT`);
    const data = await response.json();
    return {
        name: cryptoName,
        currentVale: data[0].askPrice,
        percentage: data[0].priceChangePercent
    }
}

export const useAssetsInfo = () => {
    const [assetsInfo, setAssetsInfo] = useState<AssetInfo[]>([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        const fetchAssetsInfo = async () => {
            try {
                const cryptoCalls = mock_assets.filter((x=> x.type === CRYPTO))
                    .map((x => getCryptoData(x.name)));

                const values = await Promise.all(cryptoCalls);
                setAssetsInfo(values);                
            } catch (error) {
                console.error('Error fetching assets info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssetsInfo();
    }, []);

    return { assetsInfo, loading };
}