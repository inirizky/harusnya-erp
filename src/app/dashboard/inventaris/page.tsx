import {
  Package,
  Warehouse,
  AlertTriangle,
  TrendingUp,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatsGrid, StatusBadge, SidebarList } from "@/components/dashboard";
import type { StatCardData, SidebarItem } from "@/components/dashboard";

const stats: StatCardData[] = [
  {
    title: "Total Products",
    value: "2,847",
    change: "+124",
    trend: "up",
    icon: Package,
  },
  {
    title: "Warehouses",
    value: "4",
    change: "0",
    trend: "up",
    icon: Warehouse,
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "+5",
    trend: "up",
    icon: AlertTriangle,
  },
  {
    title: "Stock Turnover",
    value: "4.8x",
    change: "+0.6x",
    trend: "up",
    icon: TrendingUp,
  },
];

const inventory = [
  { sku: "LPT-DELL-001", name: "Laptop Dell XPS 13", category: "Elektronik", stock: 45, minStock: 10, warehouse: "Gudang Utama", status: "Aman" as const },
  { sku: "SRV-HPE-002", name: "Server HPE ProLiant DL380", category: "Server", stock: 8, minStock: 3, warehouse: "Gudang Utama", status: "Aman" as const },
  { sku: "SWT-CSC-003", name: "Switch Cisco Catalyst 9200", category: "Jaringan", stock: 3, minStock: 5, warehouse: "Gudang 2", status: "Menipis" as const },
  { sku: "UPS-APC-004", name: "UPS APC Smart 3000VA", category: "Elektronik", stock: 12, minStock: 5, warehouse: "Gudang Utama", status: "Aman" as const },
  { sku: "KBL-FO-005", name: "Kabel Fiber Optik 50m", category: "Jaringan", stock: 2, minStock: 10, warehouse: "Gudang 3", status: "Kritis" as const },
  { sku: "ACC-MSE-006", name: "Mouse Wireless Logitech", category: "Aksesoris", stock: 150, minStock: 20, warehouse: "Gudang 2", status: "Aman" as const },
  { sku: "MON-SAM-007", name: "Monitor Samsung 27\" 4K", category: "Elektronik", stock: 18, minStock: 8, warehouse: "Gudang Utama", status: "Aman" as const },
  { sku: "HDD-WD-008", name: "HDD External WD 2TB", category: "Penyimpanan", stock: 4, minStock: 15, warehouse: "Gudang 3", status: "Kritis" as const },
];

const statusStyles: Record<string, string> = {
  Aman: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Menipis: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Kritis: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const stockLevel = (stock: number, minStock: number) => {
  if (minStock === 0) return 100;
  return Math.min(Math.round((stock / (minStock * 3)) * 100), 100);
};

const categories: SidebarItem[] = [
  { name: "Elektronik", count: 845, value: "Rp 2.1 M" },
  { name: "Jaringan", count: 523, value: "Rp 1.4 M" },
  { name: "Server", count: 167, value: "Rp 3.2 M" },
  { name: "Aksesoris", count: 912, value: "Rp 890 Jt" },
  { name: "Penyimpanan", count: 400, value: "Rp 567 Jt" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Inventory"
        description="Track stock levels, manage warehouses, and monitor inventory movements."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Scan Barcode
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </>
        }
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Inventory Table + Categories */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inventory List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Stock List</CardTitle>
                <CardDescription>Real-time inventory across all warehouses</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search product..." className="h-8 w-[180px]" />
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Warehouse</SelectItem>
                    <SelectItem value="utama">Gudang Utama</SelectItem>
                    <SelectItem value="gudang2">Gudang 2</SelectItem>
                    <SelectItem value="gudang3">Gudang 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-medium">{item.stock}</span>
                        <Progress
                          value={stockLevel(item.stock, item.minStock)}
                          className="w-16 h-1.5"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.warehouse}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} statusStyles={statusStyles} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Categories */}
        <SidebarList
          items={categories}
          title="Categories"
          description="Products grouped by category"
        />
      </div>
    </div>
  );
}
