import {
  Receipt,
  Banknote,
  CreditCard,
  TrendingDown,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  ArrowRight,
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
    value: "Rp 2.45 M",
    change: "+12.5%",
    trend: "up" as const,
    icon: Banknote,
  },
  {
    title: "Accounts Receivable",
    value: "Rp 523.8 Jt",
    change: "+8.2%",
    trend: "up" as const,
    icon: CreditCard,
  },
  {
    title: "Accounts Payable",
    value: "Rp 312.4 Jt",
    change: "-3.1%",
    trend: "down" as const,
    icon: TrendingDown,
  },
  {
    title: "Cash Balance",
    value: "Rp 1.89 M",
    change: "+Rp 45 Jt",
    trend: "up" as const,
    icon: Landmark,
  },
];

const journalEntries = [
  { id: "JR-2026-0701", date: "30 Jun 2026", description: "Sales Revenue - Q2 Closing", account: "Revenue", debit: 0, credit: 125000000, status: "Posted" as const },
  { id: "JR-2026-0700", date: "30 Jun 2026", description: "COGS - Inventory Adjustment", account: "Cost of Goods Sold", debit: 78500000, credit: 0, status: "Posted" as const },
  { id: "JR-2026-0699", date: "29 Jun 2026", description: "Utility Expenses - June", account: "Utilities", debit: 12500000, credit: 0, status: "Posted" as const },
  { id: "JR-2026-0698", date: "28 Jun 2026", description: "Client Payment - PT Maju Bersama", account: "Accounts Receivable", debit: 0, credit: 45000000, status: "Posted" as const },
  { id: "JR-2026-0697", date: "27 Jun 2026", description: "Office Equipment Purchase", account: "Fixed Assets", debit: 28500000, credit: 0, status: "Pending" as const },
  { id: "JR-2026-0696", date: "26 Jun 2026", description: "Supplier Payment - CV Komputer", account: "Accounts Payable", debit: 22000000, credit: 0, status: "Posted" as const },
  { id: "JR-2026-0695", date: "25 Jun 2026", description: "Payroll - June Period", account: "Salary Expense", debit: 96700000, credit: 0, status: "Draft" as const },
  { id: "JR-2026-0694", date: "24 Jun 2026", description: "Tax Payment - PPh 21", account: "Tax Payable", debit: 18300000, credit: 0, status: "Posted" as const },
];

const statusStyle = (status: string) => {
  const styles: Record<string, string> = {
    Posted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Draft: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
  };
  return styles[status] || "";
};

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const accountBalances = [
  { name: "Cash & Bank", balance: 1189000000, change: "+4.2%" },
  { name: "Accounts Receivable", balance: 523800000, change: "+8.1%" },
  { name: "Inventory", balance: 892000000, change: "-2.3%" },
  { name: "Fixed Assets", balance: 2150000000, change: "+1.5%" },
  { name: "Accounts Payable", balance: 312400000, change: "-3.1%" },
  { name: "Tax Payable", balance: 89400000, change: "-12.4%" },
  { name: "Equity", balance: 3200000000, change: "0%" },
  { name: "Retained Earnings", balance: 785000000, change: "+5.7%" },
];

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Accounting</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage journal entries, account balances, and financial transactions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Find Entry
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
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

      {/* Journal Entries + Account Balances */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Journal Entries Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Journal Entries</CardTitle>
                <CardDescription>Recent financial transactions and adjustments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search entries..." className="h-8 w-[180px]" />
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="posted">Posted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entry ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="max-w-[200px]">Description</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium text-xs">{entry.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{entry.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-sm">{entry.account}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-medium ${statusStyle(entry.status)}`}>
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Account Balances */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Chart of Accounts</CardTitle>
                <CardDescription>Current balances by account</CardDescription>
              </div>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountBalances.map((acct) => (
                <div key={acct.name} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-lg border">
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {acct.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{acct.name}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(acct.balance)}
                      </span>
                      <span
                        className={`text-xs ${
                          acct.change.startsWith("+")
                            ? "text-emerald-500"
                            : acct.change.startsWith("-")
                              ? "text-red-500"
                              : "text-muted-foreground"
                        }`}
                      >
                        {acct.change}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
