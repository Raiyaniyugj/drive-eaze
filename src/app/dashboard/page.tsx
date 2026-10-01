"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, Calendar, Navigation, BellRing, ChevronRight, Download, Phone, CheckCircle2 } from "lucide-react";
import driversData from "@/data/drivers.json";

export default function Dashboard() {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your bookings, track rides, and save favorite drivers.</p>
          </div>
          <div className="flex items-center gap-4 bg-background p-3 rounded-xl border border-border">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-lg text-accent">
              JD
            </div>
            <div>
              <div className="font-bold">John Doe</div>
              <div className="text-sm text-muted-foreground">+91 98765 43210</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full sm:w-[600px] grid-cols-4 mb-8 bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="bookings" className="rounded-lg">Bookings</TabsTrigger>
            <TabsTrigger value="tracking" className="rounded-lg">Live Trip</TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg">Saved</TabsTrigger>
            <TabsTrigger value="payments" className="rounded-lg">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Trips</h2>
            <div className="bg-background border border-border p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="bg-accent/10 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold">Tomorrow, 14:00 PM</div>
                  <div className="text-sm text-muted-foreground">4 Hours Booking • #BKN-89243</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto bg-muted/30 p-3 rounded-xl">
                <img src={driversData[0].photo} alt="Driver" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold text-sm">{driversData[0].name}</div>
                  <div className="text-xs text-muted-foreground">Sedan • MH 02 AB 1234</div>
                </div>
                <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
                <Button variant="destructive" className="flex-1 md:flex-none">Cancel</Button>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-12">Past Trips</h2>
            {[1, 2].map((trip) => (
              <div key={trip} className="bg-background border border-border p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-75">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-muted p-3 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-bold">Sept {15 - trip}, 2026</div>
                    <div className="text-sm text-muted-foreground">Completed • #BKN-88{trip}4</div>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <Dialog>
                    <DialogTrigger className="flex-1 md:flex-none">
                      <Button variant="outline" className="w-full">Rate Driver</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rate your experience</DialogTitle>
                        <DialogDescription>
                          How was your trip with {driversData[trip].name}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center gap-2 my-4">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                            <Star className={`w-8 h-8 ${rating >= star ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                          </button>
                        ))}
                      </div>
                      <Textarea placeholder="Leave a comment (optional)" className="mb-4" />
                      <Button className="w-full bg-accent text-foreground hover:bg-accent/90">Submit Review</Button>
                    </DialogContent>
                  </Dialog>
                  <Button variant="secondary" className="flex-1 md:flex-none">Rebook</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="tracking">
            <div className="bg-background border border-border rounded-2xl h-[600px] flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40" />
              
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                <div className="bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                      <Navigation className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-bold">Ongoing Trip</div>
                      <div className="text-sm text-muted-foreground">ETA: 45 mins</div>
                    </div>
                  </div>
                  <div className="space-y-3 relative">
                    <div className="absolute left-2.5 top-3 w-0.5 h-8 bg-border" />
                    <div className="flex gap-3 items-center">
                      <div className="w-5 h-5 bg-foreground rounded-full flex-shrink-0 z-10" />
                      <div className="text-sm font-medium truncate">Bandra West, Mumbai</div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-5 h-5 bg-accent rounded-full flex-shrink-0 z-10 border-2 border-background" />
                      <div className="text-sm font-medium truncate">Colaba, Mumbai</div>
                    </div>
                  </div>
                </div>

                <Button variant="destructive" size="lg" className="rounded-full shadow-lg h-14 px-8 font-bold text-lg animate-bounce hover:animate-none">
                  <BellRing className="w-6 h-6 mr-2" /> SOS
                </Button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-center">
                <div className="bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border max-w-md w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={driversData[0].photo} alt="Driver" className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-bold">{driversData[0].name}</div>
                      <div className="text-xs text-muted-foreground">Sedan • MH 02 AB 1234</div>
                    </div>
                  </div>
                  <Button className="bg-foreground text-background rounded-xl"><Phone className="w-4 h-4 mr-2"/> Call</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driversData.slice(0, 3).map(driver => (
              <div key={driver.id} className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <img src={driver.photo} alt={driver.name} className="w-16 h-16 rounded-full object-cover" />
                  <Button variant="ghost" size="icon" className="text-accent hover:text-accent hover:bg-accent/10">
                    <Star className="w-5 h-5 fill-current" />
                  </Button>
                </div>
                <h3 className="font-bold text-lg">{driver.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">{driver.trips} trips completed</div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₹{driver.pricePerHour}/hr</span>
                  <Button className="bg-accent text-foreground hover:bg-accent/90">Book</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="payments">
            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
                <h3 className="font-bold text-lg">Payment History</h3>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
              </div>
              <div className="divide-y divide-border">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">Booking #BKN-88{i}4</div>
                        <div className="text-sm text-muted-foreground">Sept {15 - i}, 2026 • Paid via UPI</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <span className="font-bold text-lg">₹{645 + (i * 120)}</span>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        Receipt <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
