import {
  Building2,
  DollarSign,
  TrendingDown,
  LayoutGrid,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Tag,
  Wrench,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Assets",
    value: "156",
    change: "+4",
    trend: "up" as const,
    icon: Building2,
  },
  {
    title: "Total Value",
    value: "Rp 48.2 M",
    change: "+Rp 1.8 M",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Monthly Depreciation",
    value: "Rp 2.1 M",
    change: "-Rp 0.3 M",
    trend: "down" as const,
    icon: TrendingDown,
  },
  {
    title: "Asset Categories",
    value: "9",
    change: "0",
    trend: "up" as const,
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

const statusStyle = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Disposed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return styles[status] || "";
};

const categories = [
  { name: "Server", count: 12, value: "Rp 8.4 M", icon: "SR" },
  { name: "Vehicle", count: 8, value: "Rp 437.6 M", icon: "VH" },
  { name: "Office Equipment", count: 24, value: "Rp 45.2 M", icon: "OE" },
  { name: "Network", count: 18, value: "Rp 22.8 M", icon: "NW" },
  { name: "Heavy Equipment", count: 6, value: "Rp 147.0 M", icon: "HE" },
  { name: "Electronics", count: 35, value: "Rp 98.4 M", icon: "EL" },
  { name: "Building", count: 15, value: "Rp 320.0 M", icon: "BL" },
  { name: "Electrical", count: 20, value: "Rp 15.6 M", icon: "EC" },
  { name: "Furniture", count: 14, value: "Rp 28.9 M", icon: "FN" },
  { name: "Software", count: 4, value: "Rp 24.8 M", icon: "SW" },
];

const recentActivities = [
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Assets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track company assets, depreciation, and maintenance schedules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
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
                      <Badge variant="secondary" className={`text-xs font-medium ${statusStyle(asset.status)}`}>
                        {asset.status}
                      </Badge>
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Asset Categories</CardTitle>
              <CardDescription>Value distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-lg border">
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-[11px] font-medium">
                        {cat.icon}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className="text-sm font-medium">{cat.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{cat.count} items</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest asset management actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.user}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.action}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
