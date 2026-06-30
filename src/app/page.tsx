import Link from "next/link";
import {
  BarChart3,
  Building2,
  ChevronRight,
  LayoutDashboard,
  LineChart,
  Lock,
  Receipt,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    desc: "Monitor all business metrics in one screen with interactive data visualization.",
  },
  {
    icon: ShoppingCart,
    title: "Sales Management",
    desc: "Manage orders, invoices, and customers with efficient workflows.",
  },
  {
    icon: Warehouse,
    title: "Inventory & Warehouse",
    desc: "Multi-warehouse stock tracking with automatic low-stock notifications.",
  },
  {
    icon: Receipt,
    title: "Accounting & Finance",
    desc: "General ledger, cash flow, and accurate real-time financial reports.",
  },
  {
    icon: LineChart,
    title: "Analytics & Reports",
    desc: "Custom reports with interactive charts for data-driven decisions.",
  },
  {
    icon: Users,
    title: "Employee Management",
    desc: "Integrated HRIS, payroll, and role-based user access management.",
  },
];

const stats = [
  { value: "10K+", label: "Active Companies" },
  { value: "99.9%", label: "Uptime" },
  { value: "500+", label: "Features" },
  { value: "24/7", label: "Support" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-4" />
            </div>
            ERP System
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">
                Free Demo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                🚀 Modern & Integrated ERP Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Manage Your Business
                <br />
                <span className="text-primary">One Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                All-in-one ERP solution for sales, inventory, finance, and HR management.
                Trusted by 10,000+ companies across Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                  <Link href="/dashboard">
                    Start Free Trial
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                  <Link href="/dashboard">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center space-y-1">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-b py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                Complete Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need to <br className="hidden md:block" />
                Run Your Business
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From sales to accounting, everything is integrated in one intuitive platform.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="group hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Boost Your Business Efficiency?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Start your 14-day free trial. No credit card required. No commitment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                  <Link href="/dashboard">
                    Get Started Free
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                  <Link href="/dashboard">
                    <Lock className="mr-2 h-5 w-5" />
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-3.5" />
              </div>
              ERP System
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              &copy; 2026 ERP System. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
