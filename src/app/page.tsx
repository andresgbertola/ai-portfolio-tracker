"use client"

import AssetsTable from "./components/dashboard/AssetsTable";
import { AssetCard } from "./components/dashboard/AssetCard";
import { AssetsPieChart } from "./components/dashboard/AssetsPieChart";
import { AssetPlayground } from "./components/dashboard/AssetPlayground";
import { Loader2 } from "lucide-react";
import { useAssets } from '@/app/hooks/useAssets'
import { useAssetsInfo } from "./hooks/useAssetsInfo";
import { AssetMinimalCard } from "./components/dashboard/AssetMinimalCard";

const forceLocal = true;

export default function Dashboard() {
  const { assets, loading, setAssets } = useAssets(forceLocal);
  const { assetsInfo, loading : loadingInfo } = useAssetsInfo();

  return loading || loadingInfo ? (
    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
  ) : (
    <div>
      <div className="flex flex-row gap-4 py-4">
        {assetsInfo.map((assetInfo, index) => (
          <AssetMinimalCard key={index} {...assetInfo}></AssetMinimalCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Asset Cards in a grid with 2 columns max */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((asset, index) => (
              <AssetCard key={index} {...asset} />
            ))}
          </div>
        </div>
        {/* Middle Column: AssetsPieChart */}
        <div className="lg:col-span-1">
          <AssetsPieChart assets={assets} />
        </div>
        {/* Right Column: AssetsTable */}
        <div className="lg:col-span-1">
          <AssetsTable assets={assets} />
        </div>
      </div>
      <br></br>
      <div>
        <AssetPlayground assets={assets} overrideAssets={setAssets} ></AssetPlayground>
      </div>
    </div>
  );
}
