"use client";

import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Download,
  CalendarRange,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const stats = [
  {
    title: "Total Revenue",
    value: "Rp 845.2 Jt",
    change: "+12.3%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Active Customers",
    value: "1,245",
    change: "+8.1%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Orders This Month",
    value: "486",
    change: "+3.2%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "-2.4%",
    trend: "down" as const,
    icon: Activity,
  },
];

const revenueData = [
  { month: "Jan", revenue: 42_000_000, expenses: 28_000_000, profit: 14_000_000 },
  { month: "Feb", revenue: 38_000_000, expenses: 25_000_000, profit: 13_000_000 },
  { month: "Mar", revenue: 45_000_000, expenses: 30_000_000, profit: 15_000_000 },
  { month: "Apr", revenue: 48_000_000, expenses: 31_000_000, profit: 17_000_000 },
  { month: "May", revenue: 52_000_000, expenses: 33_000_000, profit: 19_000_000 },
  { month: "Jun", revenue: 58_000_000, expenses: 35_000_000, profit: 23_000_000 },
];

const formatCurrency = (val: number) =>
  `Rp ${(val / 1_000_000).toFixed(1)}Jt`;

const productData = [
  { name: "Laptop Dell XPS", sales: 145, revenue: 58_000_000 },
  { name: "Server HPE", sales: 32, revenue: 42_000_000 },
  { name: "Switch Cisco", sales: 78, revenue: 28_000_000 },
  { name: "Monitor Samsung", sales: 120, revenue: 22_000_000 },
  { name: "Mouse Wireless", sales: 340, revenue: 14_000_000 },
];

const categoryData = [
  { name: "Elektronik", value: 35 },
  { name: "Jaringan", value: 22 },
  { name: "Server", value: 18 },
  { name: "Aksesoris", value: 15 },
  { name: "Penyimpanan", value: 10 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const monthlyGrowth = [
  { month: "Jan", customers: 980, orders: 320 },
  { month: "Feb", customers: 1_020, orders: 345 },
  { month: "Mar", customers: 1_065, orders: 370 },
  { month: "Apr", customers: 1_110, orders: 400 },
  { month: "May", customers: 1_180, orders: 440 },
  { month: "Jun", customers: 1_245, orders: 486 },
];

const topInsights = [
  {
    title: "Revenue Growth",
    value: "+Rp 10 Jt",
    subtitle: "vs last month (16.7% increase)",
    trend: "up" as const,
  },
  {
    title: "Customer Retention",
    value: "94.2%",
    subtitle: "Up from 92.8% last quarter",
    trend: "up" as const,
  },
  {
    title: "Avg Order Value",
    value: "Rp 1.74 Jt",
    subtitle: "Stable compared to last month",
    trend: "up" as const,
  },
  {
    title: "Operating Cost",
    value: "Rp 35 Jt",
    subtitle: "Increased 5.6% from last month",
    trend: "down" as const,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Business metrics, charts, and trend analysis.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="6m">
            <SelectTrigger className="h-8 w-[150px]">
              <CalendarRange className="mr-2 h-3.5 w-3.5" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
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

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Revenue & Profit Trend</CardTitle>
          <CardDescription>Monthly revenue, expenses, and profit for H1 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `Rp${v / 1_000_000}Jt`} />
                <Tooltip
                  formatter={(value: number) => [`Rp ${(value / 1_000_000).toFixed(1)} Jt`, undefined]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Expenses" />
                <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Revenue by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `Rp${v / 1_000_000}Jt`} />
                  <Tooltip
                    formatter={(value: number) => [`Rp ${(value / 1_000_000).toFixed(1)} Jt`, "Revenue"]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--popover))",
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: "#6366f1" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--popover))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth + Insights */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Growth */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>Customer and order growth H1 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--popover))",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="customers" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} name="Customers" />
                  <Area type="monotone" dataKey="orders" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} name="Orders" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topInsights.map((insight) => (
                <div key={insight.title} className="space-y-1">
                  <p className="text-xs text-muted-foreground">{insight.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{insight.value}</span>
                    {insight.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.subtitle}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
