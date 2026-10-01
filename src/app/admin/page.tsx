"use client";

import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Users, Car, CreditCard, LayoutDashboard, Settings, LogOut, CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import driversData from "@/data/drivers.json";

const chartData = [
  { name: "Mon", revenue: 4000, bookings: 24 },
  { name: "Tue", revenue: 3000, bookings: 18 },
  { name: "Wed", revenue: 5000, bookings: 35 },
  { name: "Thu", revenue: 4500, bookings: 28 },
  { name: "Fri", revenue: 8000, bookings: 55 },
  { name: "Sat", revenue: 12000, bookings: 85 },
  { name: "Sun", revenue: 10000, bookings: 70 },
];

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-foreground text-background md:min-h-screen flex flex-col">
        <div className="p-6">
          <Link href="/" className="inline-block mb-8">
            <span className="text-2xl font-heading font-bold text-background">
              DriveEase<span className="text-accent">.</span>
            </span>
            <span className="block text-xs text-accent mt-1 tracking-widest uppercase font-bold">Admin Portal</span>
          </Link>

          <nav className="space-y-2 flex-1">
            <Button variant="ghost" className="w-full justify-start bg-accent/20 text-accent hover:bg-accent/30 hover:text-accent">
              <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-background hover:bg-background/10 hover:text-background">
              <Car className="mr-3 h-5 w-5" /> Bookings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-background hover:bg-background/10 hover:text-background">
              <Users className="mr-3 h-5 w-5" /> Drivers
            </Button>
            <Button variant="ghost" className="w-full justify-start text-background hover:bg-background/10 hover:text-background">
              <CreditCard className="mr-3 h-5 w-5" /> Finance
            </Button>
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-background hover:bg-background/10 hover:text-background">
            <Settings className="mr-3 h-5 w-5" /> Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/20 hover:text-destructive">
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="flex items-center gap-3 bg-background p-2 pr-4 rounded-full border border-border shadow-sm">
            <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-bold">Admin User</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-sm text-muted-foreground font-medium mb-2">Total Revenue (Weekly)</div>
            <div className="text-3xl font-bold mb-2">₹46,500</div>
            <div className="text-sm text-success font-medium flex items-center gap-1">
              <span className="bg-success/10 p-0.5 rounded px-1">+12.5%</span> from last week
            </div>
          </div>
          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-sm text-muted-foreground font-medium mb-2">Active Bookings</div>
            <div className="text-3xl font-bold mb-2">315</div>
            <div className="text-sm text-success font-medium flex items-center gap-1">
              <span className="bg-success/10 p-0.5 rounded px-1">+5.2%</span> from last week
            </div>
          </div>
          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-sm text-muted-foreground font-medium mb-2">Verified Drivers</div>
            <div className="text-3xl font-bold mb-2">1,240</div>
            <div className="text-sm text-success font-medium flex items-center gap-1">
              <span className="bg-success/10 p-0.5 rounded px-1">+18</span> this week
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm mb-8 h-[350px]">
          <h3 className="font-bold mb-6">Revenue & Bookings Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Tabs defaultValue="approvals" className="w-full">
          <TabsList className="grid w-full sm:w-[500px] grid-cols-3 mb-6 bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="approvals" className="rounded-lg relative">
              Approval Queue
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-lg">All Bookings</TabsTrigger>
            <TabsTrigger value="disputes" className="rounded-lg">Disputes</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals">
            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Docs Status</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-xs text-accent">N{i}</div>
                        New Driver {i}
                      </TableCell>
                      <TableCell>Mumbai</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-amber-100 text-amber-800 border-none">Pending Verification</Badge></TableCell>
                      <TableCell>Oct {i}, 2026</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="text-success hover:text-success"><CheckCircle2 className="w-4 h-4 mr-1"/> Approve</Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive"><XCircle className="w-4 h-4 mr-1"/> Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10 gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search bookings..." className="pl-9 h-9" />
                </div>
                <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
              </div>
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driversData.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">#BKN-88{i}4</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>
                        <Badge className={i === 0 ? "bg-accent hover:bg-accent" : "bg-success hover:bg-success"}>
                          {i === 0 ? "In Progress" : "Completed"}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{d.pricePerHour * 4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="disputes">
            <div className="bg-background border border-border rounded-2xl p-8 text-center text-muted-foreground">
              <p>No active disputes or refunds.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
