import {
  Truck,
  ClipboardList,
  DollarSign,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatsGrid, StatusBadge, SidebarList } from "@/components/dashboard";
import type { StatCardData, SidebarItem } from "@/components/dashboard";

const stats: StatCardData[] = [
  {
    title: "Total Procurement",
    value: "Rp 523.8 Jt",
    change: "+5.7%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Purchase Orders",
    value: "124",
    change: "+15.3%",
    trend: "up",
    icon: ClipboardList,
  },
  {
    title: "Pending Receipts",
    value: "18",
    change: "-8.2%",
    trend: "down",
    icon: Truck,
  },
  {
    title: "Supplier Issues",
    value: "3",
    change: "+1",
    trend: "up",
    icon: AlertCircle,
  },
];

const purchaseOrders = [
  { id: "PO-2026-001", supplier: "PT Elektronik Jaya", items: 5, total: "Rp 45.000.000", status: "Diterima" as const, eta: "Arrived" },
  { id: "PO-2026-002", supplier: "CV Komputer Makmur", items: 12, total: "Rp 128.500.000", status: "Dikirim" as const, eta: "3 Jul 2026" },
  { id: "PO-2026-003", supplier: "UD Sumber Listrik", items: 3, total: "Rp 8.750.000", status: "Diproses" as const, eta: "5 Jul 2026" },
  { id: "PO-2026-004", supplier: "PT Network Solusi", items: 8, total: "Rp 67.200.000", status: "Dikirim" as const, eta: "1 Jul 2026" },
  { id: "PO-2026-005", supplier: "CV Kabel Nusantara", items: 20, total: "Rp 34.600.000", status: "Tertunda" as const, eta: "8 Jul 2026" },
  { id: "PO-2026-006", supplier: "PT Server Utama", items: 2, total: "Rp 92.000.000", status: "Diproses" as const, eta: "10 Jul 2026" },
];

const statusStyles: Record<string, string> = {
  Diterima: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Dikirim: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Diproses: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Tertunda: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const topSuppliers: SidebarItem[] = [
  { name: "PT Elektronik Jaya", count: "28 orders", value: "Rp 342 Jt" },
  { name: "CV Komputer Makmur", count: "22 orders", value: "Rp 289 Jt" },
  { name: "PT Network Solusi", count: "15 orders", value: "Rp 198 Jt" },
  { name: "CV Kabel Nusantara", count: "12 orders", value: "Rp 145 Jt" },
  { name: "PT Server Utama", count: "8 orders", value: "Rp 112 Jt" },
];

export default function PurchasingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Purchasing"
        description="Manage purchase orders, suppliers, and incoming inventory."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Search PO
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New PO
            </Button>
          </>
        }
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* PO Table + Suppliers */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Purchase Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Active and incoming POs</CardDescription>
              </div>
              <Input placeholder="Search PO..." className="h-8 w-[200px]" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.id}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{po.supplier}</TableCell>
                    <TableCell className="text-right font-medium">{po.total}</TableCell>
                    <TableCell>
                      <StatusBadge status={po.status} statusStyles={statusStyles} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{po.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Suppliers */}
        <SidebarList
          items={topSuppliers}
          title="Top Suppliers"
          description="By total procurement volume"
        />
      </div>
    </div>
  );
}
