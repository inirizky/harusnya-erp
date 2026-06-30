import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Users,
  Download,
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
    title: "Total Revenue",
    value: "Rp 845.2 Jt",
    change: "+12.3%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "486",
    change: "+8.1%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Conversion Rate",
    value: "24.8%",
    change: "+3.2%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Customers",
    value: "156",
    change: "-2.4%",
    trend: "down" as const,
    icon: Users,
  },
];

const invoices = [
  { id: "INV-2026-001", customer: "PT Maju Jaya", date: "28 Jun 2026", amount: "Rp 28.500.000", status: "Lunas" as const, payment: "Transfer" },
  { id: "INV-2026-002", customer: "CV Sukses Abadi", date: "27 Jun 2026", amount: "Rp 15.200.000", status: "Tertunda" as const, payment: "Credit" },
  { id: "INV-2026-003", customer: "UD Berkah Utama", date: "26 Jun 2026", amount: "Rp 8.750.000", status: "Lunas" as const, payment: "Transfer" },
  { id: "INV-2026-004", customer: "PT Indo Makmur Sentosa", date: "25 Jun 2026", amount: "Rp 12.300.000", status: "Diproses" as const, payment: "Transfer" },
  { id: "INV-2026-005", customer: "CV Bintang Terang", date: "24 Jun 2026", amount: "Rp 9.100.000", status: "Lunas" as const, payment: "Cash" },
  { id: "INV-2026-006", customer: "PT Sinar Jaya Abadi", date: "23 Jun 2026", amount: "Rp 35.000.000", status: "Dibatalkan" as const, payment: "Credit" },
  { id: "INV-2026-007", customer: "CV Karya Mandiri", date: "22 Jun 2026", amount: "Rp 6.450.000", status: "Lunas" as const, payment: "Transfer" },
  { id: "INV-2026-008", customer: "UD Sumber Rejeki", date: "21 Jun 2026", amount: "Rp 22.800.000", status: "Diproses" as const, payment: "Transfer" },
];

const statusStyle = (status: string) => {
  const styles: Record<string, string> = {
    Lunas: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Tertunda: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Diproses: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Dibatalkan: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return styles[status] || "";
};

const recentActivities = [
  { user: "Budi Santoso", action: "Created invoice INV-2026-001", time: "2 min ago", avatar: "BS" },
  { user: "Siti Rahma", action: "Approved payment for CV Sukses Abadi", time: "15 min ago", avatar: "SR" },
  { user: "Ahmad Fauzi", action: "Added new customer PT Sinar Jaya", time: "1 hour ago", avatar: "AF" },
  { user: "Dewi Lestari", action: "Updated order status INV-2026-003", time: "2 hours ago", avatar: "DL" },
  { user: "Rudi Hartono", action: "Generated monthly sales report", time: "3 hours ago", avatar: "RH" },
];

export default function SalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage orders, invoices, and customer transactions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
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

      {/* Table + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoices Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Latest 8 invoice transactions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search invoice..." className="pl-8 h-8 w-[200px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Tertunda">Tertunda</SelectItem>
                    <SelectItem value="Diproses">Diproses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{inv.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-right font-medium">{inv.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-medium ${statusStyle(inv.status)}`}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from the team</CardDescription>
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
  );
}
