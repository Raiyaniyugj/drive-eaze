"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Clock, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background with a subtle gradient and an image overlay */}
      <div className="absolute inset-0 bg-foreground/5 z-0" />
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80")' }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight tracking-tight mb-6"
          >
            Your car. <br />
            <span className="text-accent">Your driver.</span> <br />
            Your time.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Hire professional, verified drivers by the hour, day, or month. 
            Experience premium service in the comfort of your own vehicle.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="Driver"
                  className="w-12 h-12 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-accent font-bold">
                ★★★★★
              </div>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">4.8/5</span> from 10k+ reviews</p>
            </div>
          </motion.div>
        </div>

        {/* Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 w-full max-w-md bg-background/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border"
        >
          <Tabs defaultValue="hourly" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 rounded-xl p-1">
              <TabsTrigger value="hourly" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Hourly</TabsTrigger>
              <TabsTrigger value="daily" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Daily</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Monthly</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Pickup location (e.g., Mumbai, Andheri)" className="pl-10 bg-background h-12 rounded-xl" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input type="date" className="pl-10 bg-background h-12 rounded-xl" />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input type="time" className="pl-10 bg-background h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="bg-background h-12 rounded-xl">
                    <SelectValue placeholder="Car Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-background h-12 rounded-xl">
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Link href="/search" className="w-full">
                <Button className="w-full h-12 text-lg bg-accent text-foreground hover:bg-accent/90 rounded-xl mt-2 font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Find Drivers
                </Button>
              </Link>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
