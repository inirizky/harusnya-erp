import {
  Truck,
  ClipboardList,
  DollarSign,
  AlertCircle,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const stats = [
  {
    title: "Total Procurement",
    value: "Rp 523.8 Jt",
    change: "+5.7%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Purchase Orders",
    value: "124",
    change: "+15.3%",
    trend: "up" as const,
    icon: ClipboardList,
  },
  {
    title: "Pending Receipts",
    value: "18",
    change: "-8.2%",
    trend: "down" as const,
    icon: Truck,
  },
  {
    title: "Supplier Issues",
    value: "3",
    change: "+1",
    trend: "up" as const,
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

const statusStyle = (status: string) => {
  const styles: Record<string, string> = {
    Diterima: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Dikirim: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Diproses: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Tertunda: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return styles[status] || "";
};

const topSuppliers = [
  { name: "PT Elektronik Jaya", orders: 28, total: "Rp 342 Jt", satisfaction: 95 },
  { name: "CV Komputer Makmur", orders: 22, total: "Rp 289 Jt", satisfaction: 88 },
  { name: "PT Network Solusi", orders: 15, total: "Rp 198 Jt", satisfaction: 92 },
  { name: "CV Kabel Nusantara", orders: 12, total: "Rp 145 Jt", satisfaction: 78 },
  { name: "PT Server Utama", orders: 8, total: "Rp 112 Jt", satisfaction: 85 },
];

export default function PurchasingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Purchasing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage purchase orders, suppliers, and incoming inventory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search PO
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New PO
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {s.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={s.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {s.change}
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                      <Badge variant="secondary" className={`text-xs font-medium ${statusStyle(po.status)}`}>
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{po.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Suppliers */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Top Suppliers</CardTitle>
            <CardDescription>By total procurement volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {topSuppliers.map((supplier, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{supplier.name}</p>
                    <span className="text-xs text-muted-foreground">{supplier.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span>{supplier.orders} orders</span>
                    <span>{supplier.satisfaction}% satisfaction</span>
                  </div>
                  <Progress value={supplier.satisfaction} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
