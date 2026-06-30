import {
  Users,
  UserPlus,
  Building2,
  CalendarDays,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Mail,
  Phone,
  MoreHorizontal,
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
    title: "Total Employees",
    value: "128",
    change: "+5.8%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Active Staff",
    value: "114",
    change: "+3.2%",
    trend: "up" as const,
    icon: UserPlus,
  },
  {
    title: "Departments",
    value: "8",
    change: "0%",
    trend: "up" as const,
    icon: Building2,
  },
  {
    title: "New Hires",
    value: "12",
    change: "+50%",
    trend: "up" as const,
    icon: CalendarDays,
  },
];

const employees = [
  { id: "EMP-001", name: "Budi Santoso", position: "Finance Manager", department: "Finance", email: "budi@erp.com", phone: "+62 812-3456-7890", status: "Active" as const, joinDate: "15 Jan 2020", avatar: "BS" },
  { id: "EMP-002", name: "Siti Rahma", position: "Sales Supervisor", department: "Sales", email: "siti@erp.com", phone: "+62 813-9876-5432", status: "Active" as const, joinDate: "3 Mar 2021", avatar: "SR" },
  { id: "EMP-003", name: "Ahmad Fauzi", position: "Warehouse Lead", department: "Logistics", email: "ahmad@erp.com", phone: "+62 821-4567-8901", status: "Active" as const, joinDate: "22 Jul 2019", avatar: "AF" },
  { id: "EMP-004", name: "Dewi Lestari", position: "HR Coordinator", department: "HR", email: "dewi@erp.com", phone: "+62 877-2345-6789", status: "Active" as const, joinDate: "10 Nov 2022", avatar: "DL" },
  { id: "EMP-005", name: "Rudi Hartono", position: "IT Specialist", department: "IT", email: "rudi@erp.com", phone: "+62 815-6789-0123", status: "Active" as const, joinDate: "5 Apr 2020", avatar: "RH" },
  { id: "EMP-006", name: "Maya Indah", position: "Marketing Manager", department: "Marketing", email: "maya@erp.com", phone: "+62 811-3456-7891", status: "Active" as const, joinDate: "18 Aug 2021", avatar: "MI" },
  { id: "EMP-007", name: "Hendra Gunawan", position: "Accountant", department: "Finance", email: "hendra@erp.com", phone: "+62 878-9012-3456", status: "On Leave" as const, joinDate: "1 Feb 2018", avatar: "HG" },
  { id: "EMP-008", name: "Rina Wijaya", position: "Admin Assistant", department: "HR", email: "rina@erp.com", phone: "+62 823-4567-8901", status: "Active" as const, joinDate: "14 Jun 2023", avatar: "RW" },
  { id: "EMP-009", name: "Adi Pratama", position: "Purchasing Officer", department: "Procurement", email: "adi@erp.com", phone: "+62 819-8765-4321", status: "Active" as const, joinDate: "9 Sep 2022", avatar: "AP" },
  { id: "EMP-010", name: "Nina Kurniawan", position: "Sales Associate", department: "Sales", email: "nina@erp.com", phone: "+62 817-2345-6789", status: "Active" as const, joinDate: "27 Mar 2024", avatar: "NK" },
  { id: "EMP-011", name: "Tono Prasetyo", position: "Warehouse Staff", department: "Logistics", email: "tono@erp.com", phone: "+62 814-5678-9012", status: "Terminated" as const, joinDate: "12 Dec 2017", avatar: "TP" },
  { id: "EMP-012", name: "Sari Puspita", position: "Graphic Designer", department: "Marketing", email: "sari@erp.com", phone: "+62 896-7890-1234", status: "Active" as const, joinDate: "5 May 2023", avatar: "SP" },
];

const statusStyle = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "On Leave": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Terminated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return styles[status] || "";
};

const departments = [
  { name: "Finance", count: 18, color: "bg-blue-500" },
  { name: "Sales", count: 24, color: "bg-emerald-500" },
  { name: "Logistics", count: 22, color: "bg-amber-500" },
  { name: "HR", count: 10, color: "bg-purple-500" },
  { name: "IT", count: 14, color: "bg-cyan-500" },
  { name: "Marketing", count: 12, color: "bg-pink-500" },
  { name: "Procurement", count: 16, color: "bg-indigo-500" },
  { name: "Operations", count: 12, color: "bg-rose-500" },
];

const recentActivities = [
  { user: "Dewi Lestari", action: "Onboarded new employee Rina Wijaya", time: "1 hour ago", avatar: "DL" },
  { user: "Budi Santoso", action: "Approved leave request for Hendra Gunawan", time: "3 hours ago", avatar: "BS" },
  { user: "Siti Rahma", action: "Updated department budget for Sales", time: "5 hours ago", avatar: "SR" },
  { user: "Rudi Hartono", action: "Completed IT training for new hires", time: "1 day ago", avatar: "RH" },
  { user: "Maya Indah", action: "Submitted recruitment request for 2 positions", time: "2 days ago", avatar: "MI" },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage employees, departments, and HR operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
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
        {/* Employee Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Employee List</CardTitle>
                <CardDescription>All registered employees</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search employee..." className="pl-8 h-8 w-[180px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Procurement">Procurement</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {emp.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{emp.position}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{emp.department}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{emp.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{emp.joinDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-medium ${statusStyle(emp.status)}`}>
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Departments + Activity */}
        <div className="space-y-6">
          {/* Departments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Departments</CardTitle>
              <CardDescription>Staff distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${dept.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <span className="text-sm text-muted-foreground">{dept.count}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${dept.color}`}
                          style={{ width: `${(dept.count / 24) * 100}%` }}
                        />
                      </div>
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
              <CardDescription>Latest HR actions</CardDescription>
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
