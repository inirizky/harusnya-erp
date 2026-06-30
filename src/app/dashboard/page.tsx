import {
  DollarSign,
  Package,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Data ─────────────────────────────────────────────────────────────────

const statCards = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "Rp 2.4 M",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    subtitle: "This month",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    accent: "emerald",
    iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "orders",
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    subtitle: "This month",
    gradient: "from-blue-500/20 to-blue-600/5",
    accent: "blue",
    iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  {
    id: "sold",
    title: "Products Sold",
    value: "3,567",
    change: "-3.1%",
    trend: "down" as const,
    icon: Package,
    subtitle: "This month",
    gradient: "from-amber-500/20 to-amber-600/5",
    accent: "amber",
    iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    id: "margin",
    title: "Profit Margin",
    value: "23.6%",
    change: "+2.4%",
    trend: "up" as const,
    icon: Activity,
    subtitle: "Average",
    gradient: "from-violet-500/20 to-violet-600/5",
    accent: "violet",
    iconBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
];

const recentOrders = [
  { id: "INV-001", customer: "PT Maju Jaya", product: "Laptop Dell XPS 13", qty: 2, amount: "Rp 28.5 Jt", status: "Selesai" as const },
  { id: "INV-002", customer: "CV Sukses Abadi", product: "Server Rack 42U", qty: 1, amount: "Rp 15.2 Jt", status: "Diproses" as const },
  { id: "INV-003", customer: "UD Berkah", product: "Switch Cisco 48 Port", qty: 3, amount: "Rp 8.7 Jt", status: "Tertunda" as const },
  { id: "INV-004", customer: "PT Indo Makmur", product: "Kabel Fiber Optik", qty: 500, amount: "Rp 12.3 Jt", status: "Diproses" as const },
  { id: "INV-005", customer: "CV Bintang Terang", product: "UPS 3000VA", qty: 2, amount: "Rp 9.1 Jt", status: "Selesai" as const },
];

const topProducts = [
  { name: "Laptop Dell XPS 13", revenue: "Rp 145.2 Jt", growth: 15, color: "rose" },
  { name: "Server HPE ProLiant", revenue: "Rp 98.7 Jt", growth: -5, color: "slate" },
  { name: "Switch Cisco Catalyst", revenue: "Rp 76.3 Jt", growth: 22, color: "sky" },
  { name: "UPS APC Smart", revenue: "Rp 52.1 Jt", growth: 8, color: "teal" },
  { name: "Kabel Fiber Optik", revenue: "Rp 38.9 Jt", growth: 12, color: "indigo" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

const statusConfig = {
  Selesai:   { label: "Completed", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/30 dark:border-emerald-800/30", icon: CheckCircle2 },
  Diproses:  { label: "Processing", badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/30 dark:border-blue-800/30", icon: Clock },
  Tertunda:  { label: "Pending", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/30 dark:border-amber-800/30", icon: XCircle },
} as const;

const productColors: Record<string, string> = {
  rose: "from-rose-500 to-pink-600",
  slate: "from-slate-500 to-slate-700",
  sky: "from-sky-500 to-cyan-600",
  teal: "from-teal-500 to-emerald-600",
  indigo: "from-indigo-500 to-purple-600",
};

function formatCurrency(value: string) {
  return value;
}

// ─── Sparkline Mini Bar (pure CSS) ─────────────────────────────────────────

function MiniBar({ value, trend }: { value: number; trend: "up" | "down" }) {
  const bars = [20, 45, 30, 55, 40, 65, value];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[5px] rounded-full transition-all duration-500 hover:scale-110 ${
            i === bars.length - 1
              ? trend === "up"
                ? "bg-emerald-400/80"
                : "bg-red-400/80"
              : "bg-foreground/10 dark:bg-foreground/8"
          }`}
          style={{ height: `${(h / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

// ─── Greeting ──────────────────────────────────────────────────────────────

function GreetingSection() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-7 py-8">
      {/* Decorative rings */}
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full border border-white/5" />
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border border-white/5" />
      <div className="absolute bottom-0 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/60 tracking-wide uppercase">{greet}, Admin</p>
            <h1 className="text-2xl font-bold text-white mt-1 tracking-tight">
              Welcome to ERP System
            </h1>
            <p className="text-white/50 mt-1.5 text-sm max-w-lg">
              Here&apos;s your business overview for today. Stay on top of everything that matters.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-4xl font-bold text-white/10">v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ card, index }: { card: typeof statCards[0]; index: number }) {
  const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = card.trend === "up"
    ? "text-emerald-500 bg-emerald-500/10"
    : "text-red-500 bg-red-500/10";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-foreground/10"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Hover gradient reveal */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
            {card.title}
          </span>
          <div className={`h-10 w-10 rounded-xl ${card.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <card.icon className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight">{card.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${trendColor}`}>
                <TrendIcon className="h-3 w-3" />
                {card.change}
              </span>
              <span className="text-[11px] text-muted-foreground/60">{card.subtitle}</span>
            </div>
          </div>
          <MiniBar value={card.trend === "up" ? 85 : 35} trend={card.trend} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Greeting */}
      <GreetingSection />

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, i) => (
          <StatCard key={card.id} card={card} index={i} />
        ))}
      </div>

      {/* Two-column: Orders + Products */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* ─── Recent Orders ─── */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-border/40 bg-card overflow-hidden group">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Recent Orders</h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Latest 5 transactions</p>
              </div>
              <Badge
                variant="outline"
                className="text-[11px] font-medium rounded-full px-3 py-1 cursor-pointer transition-colors hover:bg-accent"
              >
                View All →
              </Badge>
            </div>

            {/* Table */}
            <div className="px-2">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/20 hover:bg-transparent">
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 h-10">Invoice</TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 h-10">Customer</TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 h-10 text-right">Amount</TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 h-10 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order, i) => {
                    const cfg = statusConfig[order.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <TableRow
                        key={order.id}
                        className="group/row transition-colors hover:bg-muted/30 border-b border-border/10 last:border-0"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <TableCell className="py-3.5">
                          <span className="font-mono text-xs font-medium tracking-tight">{order.id}</span>
                        </TableCell>
                        <TableCell className="py-3.5 max-w-[140px]">
                          <span className="text-sm truncate block">{order.customer}</span>
                        </TableCell>
                        <TableCell className="py-3.5 text-right">
                          <span className="text-sm font-semibold tracking-tight">{order.amount}</span>
                        </TableCell>
                        <TableCell className="py-3.5 text-right">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${cfg.badge}`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border/20 bg-muted/20">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground/50">
                <span>Showing 5 of 124 orders</span>
                <span className="font-mono">Updated 2m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Top Products ─── */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border/40 bg-card overflow-hidden h-full group">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Top Products</h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">By revenue this month</p>
              </div>
              <Badge
                variant="outline"
                className="text-[11px] font-medium rounded-full px-3 py-1 cursor-pointer transition-colors hover:bg-accent"
              >
                Report →
              </Badge>
            </div>

            {/* List */}
            <div className="p-4 space-y-1">
              {topProducts.map((product, i) => (
                <div
                  key={product.name}
                  className="group/item flex items-center gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-muted/40 hover:pl-4 cursor-default"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {/* Avatar with gradient */}
                  <Avatar className={`h-10 w-10 rounded-xl bg-gradient-to-br ${productColors[product.color]} shadow-sm ring-2 ring-white/10`}>
                    <AvatarFallback className="rounded-xl bg-transparent text-white text-xs font-bold">
                      {product.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name + Revenue */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover/item:text-foreground transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      {product.revenue}
                    </p>
                  </div>

                  {/* Growth badge */}
                  <div className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 group-hover/item:scale-105 ${
                    product.growth > 0
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    {product.growth > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {product.growth > 0 ? "+" : ""}{product.growth}%
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border/20 bg-muted/20 mt-auto">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground/50">
                <span>5 best sellers</span>
                <span>+12.4% avg growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
