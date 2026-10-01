"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, MapPin, CheckCircle2, CalendarDays, Clock, ArrowLeft } from "lucide-react";
import driversData from "@/data/drivers.json";

export default function DriverProfile({ params }: { params: { id: string } }) {
  const driver = driversData.find(d => d.id === params.id) || driversData[0];
  const [bookingMode, setBookingMode] = useState<"hourly" | "daily">("hourly");
  const [hours, setHours] = useState(1);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-24 pb-12">
        <Link href="/search" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to search
        </Link>

        {/* Gallery Header placeholder */}
        <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 relative">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80" 
            alt="Driver background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end gap-6">
            <img 
              src={driver.photo} 
              alt={driver.name} 
              className="w-32 h-32 rounded-2xl border-4 border-background object-cover shadow-xl"
            />
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground flex items-center gap-2">
                {driver.name}
                {driver.verified && <ShieldCheck className="w-8 h-8 text-accent" />}
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium mt-2">
                <span className="flex items-center gap-1 text-foreground">
                  <Star className="w-5 h-5 fill-accent text-accent" /> {driver.rating} ({driver.reviews.total} reviews)
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Mumbai
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Profile Content */}
          <div className="flex-1 space-y-8">
            <section className="bg-background border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About {driver.name.split(' ')[0]}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {driver.bio}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Skills & Experience</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{driver.experience}</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Trips Completed</span>
                      <span className="font-medium">{driver.trips}+</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-medium">{driver.languages.join(", ")}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Vehicle Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {driver.vehicleTypes.map(type => (
                      <span key={type} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3 mt-6">License Class</h3>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold border border-accent/20">
                    {driver.licenseClass}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-background border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Verification & Safety</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Aadhaar Card Verified",
                  "Driving License Validated",
                  "Police Clearance Certificate",
                  "Background Check Passed",
                  "Medical Fitness Certificate",
                  "Defensive Driving Certified"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="font-medium">{check}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-background border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>
              <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold text-foreground mb-2">{driver.rating}</div>
                  <div className="flex text-accent mb-1 justify-center">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <div className="text-sm text-muted-foreground">{driver.reviews.total} total ratings</div>
                </div>
                
                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = driver.reviews.breakdown[rating.toString() as keyof typeof driver.reviews.breakdown] || 0;
                    const percentage = (count / driver.reviews.total) * 100;
                    return (
                      <div key={rating} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                        <span className="w-3">{rating}</span>
                        <Star className="w-4 h-4 fill-current text-muted-foreground" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="bg-background border border-border p-6 rounded-3xl shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Book {driver.name.split(' ')[0]}</h3>
              
              <Tabs defaultValue="hourly" className="w-full mb-6" onValueChange={(v) => setBookingMode(v as "hourly" | "daily")}>
                <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="hourly" className="rounded-lg">Hourly</TabsTrigger>
                  <TabsTrigger value="daily" className="rounded-lg">Daily</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> Date
                  </span>
                  <span className="font-bold">Today, Oct 1</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Start Time
                  </span>
                  <span className="font-bold">14:00 PM</span>
                </div>
                
                {bookingMode === "hourly" && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Duration (Hours)</span>
                      <span className="font-bold">{hours} hrs</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Button variant="outline" size="icon" onClick={() => setHours(Math.max(1, hours - 1))}>-</Button>
                      <input 
                        type="range" 
                        min="1" 
                        max="12" 
                        value={hours} 
                        onChange={(e) => setHours(parseInt(e.target.value))}
                        className="flex-1 accent-accent"
                      />
                      <Button variant="outline" size="icon" onClick={() => setHours(Math.min(12, hours + 1))}>+</Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">Minimum 1 hour booking required</p>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Base Fare ({bookingMode === 'hourly' ? `${hours} hrs` : '1 day'})</span>
                  <span>₹{bookingMode === 'hourly' ? driver.pricePerHour * hours : driver.pricePerDay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span>₹49</span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-border">
                  <span>Total Estimate</span>
                  <span>₹{bookingMode === 'hourly' ? (driver.pricePerHour * hours) + 49 : driver.pricePerDay + 49}</span>
                </div>
              </div>

              <Link href={`/book/${driver.id}`} className="w-full">
                <Button className="w-full h-12 text-lg bg-accent text-foreground hover:bg-accent/90 rounded-xl font-bold">
                  Continue to Checkout
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
