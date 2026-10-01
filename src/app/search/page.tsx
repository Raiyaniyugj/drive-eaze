"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Map, List } from "lucide-react";
import driversData from "@/data/drivers.json";

export default function SearchPage() {
  const [drivers] = useState(driversData);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Available Drivers in Mumbai</h1>
            <p className="text-muted-foreground">Found {drivers.length} drivers matching your criteria.</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="bg-background border border-border rounded-lg flex p-1">
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4 mr-2" /> List
              </Button>
              <Button 
                variant={viewMode === "map" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("map")}
              >
                <Map className="w-4 h-4 mr-2" /> Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-background border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-6">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range (per hour)</h3>
                  <Slider defaultValue={[200]} max={500} min={100} step={10} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>₹100</span>
                    <span>₹500+</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Vehicle Type</h3>
                  <div className="space-y-2">
                    {["Hatchback", "Sedan", "SUV", "Luxury"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`vehicle-${type}`} />
                        <label htmlFor={`vehicle-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Transmission</h3>
                  <div className="space-y-2">
                    {["Manual", "Automatic"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`trans-${type}`} />
                        <label htmlFor={`trans-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <label htmlFor="verified-only" className="text-sm font-bold">Verified Only</label>
                  <Checkbox id="verified-only" defaultChecked />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === "list" ? (
              <div className="grid gap-6">
                {drivers.map((driver) => (
                  <div key={driver.id} className="bg-background border border-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                    <img src={driver.photo} alt={driver.name} className="w-24 h-24 rounded-full object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                            {driver.name}
                            {driver.verified && <ShieldCheck className="w-5 h-5 text-accent" />}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 text-foreground font-medium">
                              <Star className="w-4 h-4 fill-accent text-accent" /> {driver.rating}
                            </span>
                            <span>{driver.trips} trips</span>
                            <span>{driver.experience} exp</span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-2xl font-bold text-foreground">₹{driver.pricePerHour}</div>
                          <div className="text-sm text-muted-foreground">per hour</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 mt-3">
                        {driver.badges.map((badge, i) => (
                          <Badge key={i} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border mt-4">
                        <Link href={`/driver/${driver.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">View Profile</Button>
                        </Link>
                        <Button className="flex-1 bg-accent text-foreground hover:bg-accent/90">Book Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-2xl h-[600px] flex items-center justify-center border border-border overflow-hidden relative">
                {/* Styled placeholder for map */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
                <div className="bg-background/80 backdrop-blur p-6 rounded-xl relative z-10 text-center max-w-sm">
                  <Map className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Map View Active</h3>
                  <p className="text-muted-foreground">Interactive map integration will be placed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
