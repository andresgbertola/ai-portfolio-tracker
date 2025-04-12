import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, } from "@/components/ui/table";
import { assetConversions } from "@/lib/localAssetService";

export default function Portfolio()
{
    return <Card>
        <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Assets</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead className="text-left">Amount</TableHead>
                        <TableHead className="text-left">Fiat Asset</TableHead>
                        <TableHead className="text-left">Fiat Unit Exchanged Value</TableHead>
                        <TableHead className="text-left">Total Fiat Value exchanged</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        (assetConversions.length > 0 ?
                            (assetConversions.map((asset, index) => (
                                <TableRow key={asset.assetName + index}>
                                    <TableCell className="font-bold">{asset.date}</TableCell>
                                    <TableCell className="font-bold">{asset.assetName}</TableCell>
                                    <TableCell>{asset.quantity}</TableCell>
                                    <TableCell className="text-left">{asset.exchangedAssetName}</TableCell>
                                    <TableCell className="text-left">{asset.unitExchangeValue.toFixed(4)}</TableCell>
                                    <TableCell className="text-left">{asset.exchangedQuantity.toFixed(4)}</TableCell>
                                </TableRow>)))
                            :
                            <TableCell colSpan={5} className="text-center text-gray-500">
                                No hay activos en la cartera.
                            </TableCell>)
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>;
}