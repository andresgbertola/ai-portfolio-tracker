import { useState, useEffect } from 'react';
import { Asset } from '@/app/types/Asset';
import { getAssests } from "@/lib/assetService";
import { localGetAssets } from "@/lib/localAssetService";

export const useAssets = (useLocal: boolean) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            const fetchFunc = useLocal ? localGetAssets() : getAssests();
            const data = await fetchFunc;
            setAssets(data.sort((a, b) => b.totalFiatValue - a.totalFiatValue));
            setLoading(false);
        };
        fetchAssets();
    }, [useLocal]);

    return { assets, loading, setAssets };
};
