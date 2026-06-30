"use client";

import {
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const stats = [
  {
    title: "Net Income",
    value: "Rp 486.2 Jt",
    change: "+15.3%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    title: "Total Revenue",
    value: "Rp 2.45 M",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Operating Expenses",
    value: "Rp 1.28 M",
    change: "+8.7%",
    trend: "up" as const,
    icon: BarChart3,
  },
  {
    title: "Profit Margin",
    value: "19.8%",
    change: "+2.1%",
    trend: "up" as const,
    icon: PieChart,
  },
];

const reportTypes = [
  { value: "income", label: "Income Statement" },
  { value: "balance", label: "Balance Sheet" },
  { value: "cashflow", label: "Cash Flow" },
  { value: "trial", label: "Trial Balance" },
];

// Income Statement data
const incomeStatement = [
  { account: "Sales Revenue", amount: 2450000000, type: "revenue" as const },
  { account: "Service Revenue", amount: 892000000, type: "revenue" as const },
  { account: "Cost of Goods Sold", amount: -1125000000, type: "expense" as const },
  { account: "Gross Profit", amount: 2217000000, type: "total" as const },
  { account: "Salary Expense", amount: -967000000, type: "expense" as const },
  { account: "Rent Expense", amount: -180000000, type: "expense" as const },
  { account: "Utility Expense", amount: -125000000, type: "expense" as const },
  { account: "Marketing Expense", amount: -245000000, type: "expense" as const },
  { account: "Depreciation", amount: -89000000, type: "expense" as const },
  { account: "Total Operating Expenses", amount: -1606000000, type: "total" as const },
  { account: "Operating Income", amount: 611000000, type: "total" as const },
  { account: "Interest Income", amount: 45000000, type: "revenue" as const },
  { account: "Interest Expense", amount: -32000000, type: "expense" as const },
  { account: "Tax Expense", amount: -137800000, type: "expense" as const },
  { account: "Net Income", amount: 486200000, type: "net" as const },
];

// Balance Sheet data
const balanceSheet = [
  { account: "Cash & Bank", amount: 1189000000, type: "asset" as const },
  { account: "Accounts Receivable", amount: 523800000, type: "asset" as const },
  { account: "Inventory", amount: 892000000, type: "asset" as const },
  { account: "Prepaid Expenses", amount: 124000000, type: "asset" as const },
  { account: "Fixed Assets (Net)", amount: 2150000000, type: "asset" as const },
  { account: "Total Assets", amount: 4879000000, type: "total" as const },
  { account: "Accounts Payable", amount: 312400000, type: "liability" as const },
  { account: "Accrued Expenses", amount: 156000000, type: "liability" as const },
  { account: "Tax Payable", amount: 89400000, type: "liability" as const },
  { account: "Short-term Debt", amount: 500000000, type: "liability" as const },
  { account: "Total Liabilities", amount: 1057800000, type: "total" as const },
  { account: "Share Capital", amount: 3200000000, type: "equity" as const },
  { account: "Retained Earnings", amount: 621200000, type: "equity" as const },
  { account: "Total Equity", amount: 3821200000, type: "total" as const },
];

// Cash Flow data
const cashFlow = [
  { account: "Net Income", amount: 486200000, type: "operating" as const },
  { account: "Depreciation & Amortization", amount: 89000000, type: "operating" as const },
  { account: "Change in Receivables", amount: -42300000, type: "operating" as const },
  { account: "Change in Inventory", amount: -56000000, type: "operating" as const },
  { account: "Change in Payables", amount: 27000000, type: "operating" as const },
  { account: "Net Operating Cash Flow", amount: 503900000, type: "total" as const },
  { account: "Purchase of Fixed Assets", amount: -185000000, type: "investing" as const },
  { account: "Sale of Equipment", amount: 25000000, type: "investing" as const },
  { account: "Net Investing Cash Flow", amount: -160000000, type: "total" as const },
  { account: "Dividends Paid", amount: -150000000, type: "financing" as const },
  { account: "Loan Repayment", amount: -100000000, type: "financing" as const },
  { account: "Net Financing Cash Flow", amount: -250000000, type: "total" as const },
  { account: "Net Change in Cash", amount: 93900000, type: "net" as const },
];

const formatCurrency = (amount: number) => {
  const abs = Math.abs(amount);
  if (abs >= 1000000000) {
    return `${amount < 0 ? "-" : ""}Rp ${(abs / 1000000000).toFixed(2)} M`;
  }
  if (abs >= 1000000) {
    return `${amount < 0 ? "-" : ""}Rp ${(abs / 1000000).toFixed(1)} Jt`;
  }
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const periodOptions = [
  { value: "q2-2026", label: "Q2 2026" },
  { value: "q1-2026", label: "Q1 2026" },
  { value: "fy-2025", label: "FY 2025" },
  { value: "q4-2025", label: "Q4 2025" },
];

export default function FinancialReportsPage() {
  const [selectedReport, setSelectedReport] = useState("income");
  const [selectedPeriod, setSelectedPeriod] = useState("q2-2026");

  const getReportData = () => {
    switch (selectedReport) {
      case "income": return { title: "Income Statement", description: "Revenue, expenses, and profit for the period", data: incomeStatement };
      case "balance": return { title: "Balance Sheet", description: "Assets, liabilities, and equity as of period end", data: balanceSheet };
      case "cashflow": return { title: "Cash Flow Statement", description: "Operating, investing, and financing activities", data: cashFlow };
      default: return { title: "Income Statement", description: "", data: incomeStatement };
    }
  };

  const getRowStyle = (type: string) => {
    switch (type) {
      case "total": return "font-semibold bg-muted/30";
      case "net": return "font-bold bg-primary/5 border-t-2 border-primary/20";
      default: return "";
    }
  };

  const getAccountLabel = (type: string) => {
    switch (type) {
      case "revenue": return "Revenue";
      case "expense": return "Expense";
      case "asset": return "Asset";
      case "liability": return "Liability";
      case "equity": return "Equity";
      case "operating": return "Operating";
      case "investing": return "Investing";
      case "financing": return "Financing";
      default: return "";
    }
  };

  const report = getReportData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Financial Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and view financial statements and reports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Period
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
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
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((rt) => (
                <SelectItem key={rt.value} value={rt.value}>{rt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">
          All values in Indonesian Rupiah (Rp)
        </Badge>
      </div>

      {/* Report Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </div>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.data.map((row, i) => (
                <TableRow key={i} className={getRowStyle(row.type)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {row.type !== "total" && row.type !== "net" && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 font-normal ${
                            row.type === "revenue" || row.type === "asset" || row.type === "operating"
                              ? "border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
                              : row.type === "expense" || row.type === "liability"
                                ? "border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
                                : "border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
                          }`}
                        >
                          {getAccountLabel(row.type)}
                        </Badge>
                      )}
                      <span className={`text-sm ${row.type === "net" ? "text-primary" : ""}`}>
                        {row.account}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    <span className={
                      row.type === "net"
                        ? "text-primary font-bold"
                        : row.type === "total"
                          ? "font-semibold"
                          : row.amount < 0
                            ? "text-red-500"
                            : ""
                    }>
                      {formatCurrency(row.amount)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
