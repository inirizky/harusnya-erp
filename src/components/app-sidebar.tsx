import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  FileSpreadsheet,
  Users,
  BarChart3,
  Settings,
  Receipt,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const navigation = [
  {
    label: "Main Menu",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard", isActive: true },
      { title: "Sales", icon: ShoppingCart, url: "/dashboard/penjualan" },
      { title: "Purchasing", icon: Truck, url: "/dashboard/pembelian" },
      { title: "Inventory", icon: Package, url: "/dashboard/inventaris" },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Accounting", icon: Receipt, url: "/dashboard/akuntansi" },
      { title: "Financial Reports", icon: FileSpreadsheet, url: "/dashboard/laporan" },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Employees", icon: Users, url: "/dashboard/karyawan" },
      { title: "Assets", icon: Building2, url: "/dashboard/aset" },
      { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ERP System</span>
                  <span className="truncate text-xs">Dashboard v2.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/pengaturan">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
