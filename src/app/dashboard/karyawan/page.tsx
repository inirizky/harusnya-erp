import {
  Users,
  UserCheck,
  Building2,
  UserPlus,
  Search,
  Download,
  Plus,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatsGrid, StatusBadge, ActivityFeed } from "@/components/dashboard";
import type { StatCardData, Activity } from "@/components/dashboard";

const stats: StatCardData[] = [
  {
    title: "Total Employees",
    value: "128",
    change: "+5.8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Staff",
    value: "114",
    change: "+3.2%",
    trend: "up",
    icon: UserCheck,
  },
  {
    title: "Departments",
    value: "8",
    change: "0",
    trend: "up",
    icon: Building2,
  },
  {
    title: "New Hires",
    value: "6",
    change: "+3",
    trend: "up",
    icon: UserPlus,
  },
];

const employees = [
  { id: "EMP-001", name: "Budi Santoso", position: "Senior Developer", department: "IT", email: "budi.s@company.com", joinDate: "12 Jan 2022", status: "Active" as const },
  { id: "EMP-002", name: "Siti Rahma", position: "Finance Manager", department: "Finance", email: "siti.r@company.com", joinDate: "5 Mar 2021", status: "Active" as const },
  { id: "EMP-003", name: "Ahmad Fauzi", position: "Marketing Lead", department: "Marketing", email: "ahmad.f@company.com", joinDate: "18 Jul 2023", status: "Active" as const },
  { id: "EMP-004", name: "Dewi Lestari", position: "HR Specialist", department: "HR", email: "dewi.l@company.com", joinDate: "22 Sep 2022", status: "On Leave" as const },
  { id: "EMP-005", name: "Rudi Hartono", position: "Operations Manager", department: "Operations", email: "rudi.h@company.com", joinDate: "3 Feb 2020", status: "Active" as const },
  { id: "EMP-006", name: "Linda Wijaya", position: "Product Designer", department: "Design", email: "linda.w@company.com", joinDate: "15 Nov 2023", status: "Active" as const },
  { id: "EMP-007", name: "Eko Prasetyo", position: "Sales Executive", department: "Sales", email: "eko.p@company.com", joinDate: "8 Apr 2024", status: "Active" as const },
  { id: "EMP-008", name: "Maya Kusuma", position: "QA Engineer", department: "IT", email: "maya.k@company.com", joinDate: "27 Jun 2023", status: "Active" as const },
  { id: "EMP-009", name: "Hendra Gunawan", position: "Accountant", department: "Finance", email: "hendra.g@company.com", joinDate: "14 May 2021", status: "Active" as const },
  { id: "EMP-010", name: "Ratna Sari", position: "Legal Counsel", department: "Legal", email: "ratna.s@company.com", joinDate: "9 Aug 2022", status: "Active" as const },
  { id: "EMP-011", name: "Joko Widodo", position: "Warehouse Staff", department: "Operations", email: "joko.w@company.com", joinDate: "1 Oct 2020", status: "Terminated" as const },
  { id: "EMP-012", name: "Sri Mulyani", position: "Customer Service", department: "Support", email: "sri.m@company.com", joinDate: "20 Dec 2023", status: "Active" as const },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "On Leave": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Terminated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const departments = [
  { name: "IT", count: 45, total: 128 },
  { name: "Finance", count: 18, total: 128 },
  { name: "Marketing", count: 12, total: 128 },
  { name: "HR", count: 8, total: 128 },
  { name: "Operations", count: 15, total: 128 },
  { name: "Design", count: 10, total: 128 },
  { name: "Sales", count: 14, total: 128 },
  { name: "Support", count: 6, total: 128 },
];

const recentActivities: Activity[] = [
  { user: "Budi Santoso", action: "Updated employee profile for Maya Kusuma", time: "1 hour ago", avatar: "BS" },
  { user: "Siti Rahma", action: "Approved leave request for Dewi Lestari", time: "3 hours ago", avatar: "SR" },
  { user: "Ahmad Fauzi", action: "Added new employee Sri Mulyani", time: "1 day ago", avatar: "AF" },
  { user: "Dewi Lestari", action: "Scheduled interview with candidate", time: "2 days ago", avatar: "DL" },
  { user: "Rudi Hartono", action: "Processed salary for Operations team", time: "3 days ago", avatar: "RH" },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Employees"
        description="Manage employee information, departments, and HR records."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </>
        }
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Employee Table + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Employee List</CardTitle>
                <CardDescription>All employees across departments</CardDescription>
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
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
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
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {emp.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{emp.position}</TableCell>
                    <TableCell className="text-sm">{emp.department}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{emp.joinDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={emp.status} statusStyles={statusStyles} />
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
              <CardDescription>Employee distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <span className="text-sm text-muted-foreground">{dept.count} staff</span>
                    </div>
                    <Progress value={(dept.count / dept.total) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <ActivityFeed
            activities={recentActivities}
            title="Recent Activity"
            description="Latest HR actions"
          />
        </div>
      </div>
    </div>
  );
}
