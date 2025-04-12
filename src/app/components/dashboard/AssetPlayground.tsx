import React, { useState } from "react";
import { Asset } from "@/app/types/Asset";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function AssetPlayground({ assets, overrideAssets }: { assets: Asset[]; overrideAssets: (assets: Asset[]) => void }) {
// Initialize state for the edited values (from the inputs)
const [editedValues, setEditedValues] = useState<Asset[]>(() =>
    assets.map((asset) => ({ ...asset }))
);
// Update the edited values as the user types
const handleInputChange = (assetName: string, newValue: number) => {
    setEditedValues((prev) =>
        prev.map((asset) =>
            asset.name === assetName ? 
            { ...asset, fiatValue: newValue, totalFiatValue: newValue * asset.amount,  
                profitFiatValue: (newValue - asset.avgBoughtFiatValue) * asset.amount,
                profitPercentage: ((newValue - asset.avgBoughtFiatValue) / asset.avgBoughtFiatValue) * 100
            } : asset
        )
    );
};

// Apply all changes at once when the button is clicked
const handleUpdateAll = () => {
    overrideAssets(editedValues);
    // Optionally, you can perform further actions such as updating a global state or calling an API
};

  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold mb-4">Asset Playground</CardTitle>
      <CardDescription>Play by changing the values at will</CardDescription>
    </CardHeader>
  <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Asset Name</TableHead>
              <TableHead className="text-left">Fiat Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.filter(x=> x.type === 'Crypto').map((asset) => (
              <TableRow key={asset.name}>
                <TableCell className="text-left">{asset.name}</TableCell>
                <TableCell className="text-left">
                  <Input
                    type="number"
                    value={editedValues.find((editedAsset) => editedAsset.name === asset.name)?.fiatValue || ""}
                    onChange={(e) => handleInputChange(asset.name, parseFloat(e.target.value))}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={handleUpdateAll}
          className="mt-4 px-4 py-2"
        >
          Update
        </Button>     
        </CardContent>
      </Card>
  );
};
