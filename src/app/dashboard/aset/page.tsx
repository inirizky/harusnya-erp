import {
  Building2,
  DollarSign,
  TrendingDown,
  LayoutGrid,
  Search,
  Download,
  Plus,
  CalendarDays,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, StatsGrid, StatusBadge, ActivityFeed, SidebarList } from "@/components/dashboard";
import type { StatCardData, Activity, SidebarItem } from "@/components/dashboard";

const stats: StatCardData[] = [
  {
    title: "Total Assets",
    value: "156",
    change: "+4",
    trend: "up",
    icon: Building2,
  },
  {
    title: "Total Value",
    value: "Rp 48.2 M",
    change: "+Rp 1.8 M",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Monthly Depreciation",
    value: "Rp 2.1 M",
    change: "-Rp 0.3 M",
    trend: "down",
    icon: TrendingDown,
  },
  {
    title: "Asset Categories",
    value: "9",
    change: "0",
    trend: "up",
    icon: LayoutGrid,
  },
];

const assets = [
  { id: "AST-001", name: "Dell PowerEdge R740 Server", category: "Server", purchaseDate: "12 Mar 2024", purchaseValue: "Rp 18.500.000", currentValue: "Rp 14.800.000", depreciation: "20%", status: "Active" as const, location: "Data Center" },
  { id: "AST-002", name: "Toyota Innova 2023", category: "Vehicle", purchaseDate: "5 Jan 2023", purchaseValue: "Rp 520.000.000", currentValue: "Rp 416.000.000", depreciation: "20%", status: "Active" as const, location: "Parking" },
  { id: "AST-003", name: "HP LaserJet M608 Printer", category: "Office Equipment", purchaseDate: "20 Jun 2024", purchaseValue: "Rp 4.200.000", currentValue: "Rp 3.780.000", depreciation: "10%", status: "Active" as const, location: "Floor 2" },
  { id: "AST-004", name: "Cisco Meraki MX100", category: "Network", purchaseDate: "8 Sep 2023", purchaseValue: "Rp 12.800.000", currentValue: "Rp 8.960.000", depreciation: "30%", status: "Active" as const, location: "Server Room" },
  { id: "AST-005", name: "Forklift Toyota 8FBN15", category: "Heavy Equipment", purchaseDate: "15 Feb 2022", purchaseValue: "Rp 245.000.000", currentValue: "Rp 147.000.000", depreciation: "40%", status: "Active" as const, location: "Warehouse" },
  { id: "AST-006", name: "MacBook Pro M3 2024", category: "Electronics", purchaseDate: "3 Apr 2024", purchaseValue: "Rp 32.000.000", currentValue: "Rp 28.800.000", depreciation: "10%", status: "Active" as const, location: "IT Dept" },
  { id: "AST-007", name: "AC Central Daikin 5PK", category: "Building", purchaseDate: "10 Nov 2023", purchaseValue: "Rp 28.500.000", currentValue: "Rp 23.940.000", depreciation: "16%", status: "Maintenance" as const, location: "Floor 1" },
  { id: "AST-008", name: "Canon EOS R6 Camera", category: "Office Equipment", purchaseDate: "22 Jul 2024", purchaseValue: "Rp 38.000.000", currentValue: "Rp 34.200.000", depreciation: "10%", status: "Active" as const, location: "Marketing" },
  { id: "AST-009", name: "UPS APC Symmetra 8kW", category: "Electrical", purchaseDate: "1 Dec 2022", purchaseValue: "Rp 15.200.000", currentValue: "Rp 9.880.000", depreciation: "35%", status: "Active" as const, location: "Server Room" },
  { id: "AST-010", name: "Honda Vario 160", category: "Vehicle", purchaseDate: "18 May 2024", purchaseValue: "Rp 24.000.000", currentValue: "Rp 21.600.000", depreciation: "10%", status: "Active" as const, location: "Parking" },
  { id: "AST-011", name: "Meja Kantor Ergonomic", category: "Furniture", purchaseDate: "5 Jan 2024", purchaseValue: "Rp 3.500.000", currentValue: "Rp 2.975.000", depreciation: "15%", status: "Disposed" as const, location: "-" },
  { id: "AST-012", name: "VMware vSphere License", category: "Software", purchaseDate: "15 Jan 2025", purchaseValue: "Rp 9.600.000", currentValue: "Rp 9.600.000", depreciation: "0%", status: "Active" as const, location: "IT Dept" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Disposed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categories: SidebarItem[] = [
  { name: "Server", count: 12, value: "Rp 8.4 M", avatar: "SR" },
  { name: "Vehicle", count: 8, value: "Rp 437.6 M", avatar: "VH" },
  { name: "Office Equipment", count: 24, value: "Rp 45.2 M", avatar: "OE" },
  { name: "Network", count: 18, value: "Rp 22.8 M", avatar: "NW" },
  { name: "Heavy Equipment", count: 6, value: "Rp 147.0 M", avatar: "HE" },
  { name: "Electronics", count: 35, value: "Rp 98.4 M", avatar: "EL" },
  { name: "Building", count: 15, value: "Rp 320.0 M", avatar: "BL" },
  { name: "Electrical", count: 20, value: "Rp 15.6 M", avatar: "EC" },
  { name: "Furniture", count: 14, value: "Rp 28.9 M", avatar: "FN" },
  { name: "Software", count: 4, value: "Rp 24.8 M", avatar: "SW" },
];

const recentActivities: Activity[] = [
  { user: "Rudi Hartono", action: "Added new asset VMware vSphere License", time: "2 hours ago", avatar: "RH" },
  { user: "Budi Santoso", action: "Scheduled maintenance for AC Central Daikin", time: "4 hours ago", avatar: "BS" },
  { user: "Ahmad Fauzi", action: "Disposed asset Meja Kantor Ergonomic", time: "1 day ago", avatar: "AF" },
  { user: "Siti Rahma", action: "Updated depreciation for Forklift Toyota", time: "2 days ago", avatar: "SR" },
  { user: "Dewi Lestari", action: "Audited asset inventory in Data Center", time: "3 days ago", avatar: "DL" },
];

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Assets"
        description="Track company assets, depreciation, and maintenance schedules."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </>
        }
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Table + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Asset Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Asset Register</CardTitle>
                <CardDescription>All company assets and their current value</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search asset..." className="pl-8 h-8 w-[180px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                    <SelectItem value="Network">Network</SelectItem>
                    <SelectItem value="Heavy Equipment">Heavy Equipment</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Building">Building</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Disposed">Disposed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead className="text-right">Purchase Value</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                  <TableHead>Depr.</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal">
                        {asset.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3" />
                        {asset.purchaseDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm">{asset.purchaseValue}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{asset.currentValue}</TableCell>
                    <TableCell className="text-sm">
                      <span className="text-muted-foreground">{asset.depreciation}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={asset.status} statusStyles={statusStyles} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Categories + Activity */}
        <div className="space-y-6">
          {/* Categories */}
          <SidebarList
            items={categories}
            title="Asset Categories"
            description="Value distribution by category"
          />

          {/* Recent Activity */}
          <ActivityFeed
            activities={recentActivities}
            title="Recent Activity"
            description="Latest asset management actions"
          />
        </div>
      </div>
    </div>
  );
}
