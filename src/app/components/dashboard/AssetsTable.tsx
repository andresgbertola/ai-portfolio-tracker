import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Asset } from "@/app/types/Asset";

const AssetsTable = ({ assets }: { assets: Asset[] }) => {
    const total = assets.reduce((sum, asset) => sum + asset.totalFiatValue, 0);
    return <Card>
        <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Assets</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Asset</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-left">Amount</TableHead>                        
                        <TableHead className="text-left">Value</TableHead>
                        <TableHead className="text-left">Avg buy $</TableHead>
                        <TableHead className="text-left">Total</TableHead>
                        <TableHead className="text-left">Portolio (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    (assets.length > 0 ?
                        ([...assets]
                            .sort((a, b) => b.totalFiatValue - a.totalFiatValue)
                            .map((asset) => (
                                <TableRow key={asset.name}>
                                    <TableCell className="font-bold">{asset.name}</TableCell>
                                    <TableCell>{asset.type}</TableCell>
                                    <TableCell className="text-left">{asset.amount.toFixed(4)}</TableCell>                                    
                                    <TableCell className="text-left">{asset.fiatValue.toFixed(4)}</TableCell>
                                    <TableCell className="text-left">{asset.avgBoughtFiatValue.toFixed(4)}</TableCell>
                                    <TableCell className="text-left">{asset.totalFiatValue.toFixed(4)}</TableCell>
                                    <TableCell className="text-left">{(asset.totalFiatValue * 100 / total).toFixed(2)}%</TableCell>
                                </TableRow>
                            )))
                        :
                        <TableCell colSpan={5} className="text-center text-gray-500">
                            No hay activos en la cartera.
                        </TableCell>
                    )
                }
                </TableBody>
            </Table>
        </CardContent>
    </Card>;
}

export default AssetsTable;