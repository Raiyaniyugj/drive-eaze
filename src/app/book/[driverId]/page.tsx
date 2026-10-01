"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, CreditCard, Wallet, Smartphone, Shield } from "lucide-react";
import driversData from "@/data/drivers.json";

const steps = [
  "Trip Details",
  "Confirmation",
  "Summary",
  "Payment"
];

export default function BookingFlow({ params }: { params: { driverId: string } }) {
  const driver = driversData.find(d => d.id === params.driverId) || driversData[0];
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsSuccess(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-6 pt-32 pb-12 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-background border border-border p-8 rounded-3xl shadow-xl text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your booking ID is <span className="font-bold text-foreground">#BKN-89243</span>. 
              {driver.name.split(' ')[0]} has been notified and will arrive at the pickup location on time.
            </p>
            <div className="bg-muted/50 p-4 rounded-xl text-sm mb-8 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Driver</span>
                <span className="font-medium">{driver.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">Oct 1, 14:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">₹645</span>
              </div>
            </div>
            <Link href="/dashboard">
              <Button className="w-full h-12 text-lg bg-accent text-foreground hover:bg-accent/90 rounded-xl font-bold">
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-24 pb-12 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          {currentStep > 0 ? (
            <button onClick={handleBack} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
          ) : (
            <Link href={`/driver/${driver.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Profile
            </Link>
          )}
          <span className="text-sm font-bold text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full -z-10" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 rounded-full -z-10 transition-all duration-500" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          <div className="flex justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= currentStep ? "bg-accent text-foreground" : "bg-background border-2 border-border text-muted-foreground"
                }`}>
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i <= currentStep ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background border border-border p-6 md:p-10 rounded-3xl shadow-sm min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Trip Details</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input placeholder="Enter pickup address" className="pl-10 h-12 bg-muted/30" defaultValue="Bandra West, Mumbai" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Drop Location (Optional)</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input placeholder="Enter drop address" className="pl-10 h-12 bg-muted/30" />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input type="date" className="pl-10 h-12 bg-muted/30" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input type="time" className="pl-10 h-12 bg-muted/30" defaultValue="14:00" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Your Vehicle Type</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Hatchback", "Sedan", "SUV", "Luxury"].map(type => (
                        <div key={type} className={`border p-3 rounded-xl text-center cursor-pointer transition-colors ${type === "Sedan" ? "border-accent bg-accent/10" : "border-border bg-muted/30 hover:border-accent/50"}`}>
                          <span className="font-medium text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Driver Confirmation</h2>
                <div className="bg-muted/30 p-6 rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-6">
                  <img src={driver.photo} alt={driver.name} className="w-24 h-24 rounded-full object-cover" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2 mb-1">
                      {driver.name}
                      {driver.verified && <ShieldCheck className="w-5 h-5 text-accent" />}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">1 hour booking • Sedan • Manual/Auto</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {driver.badges.map(b => (
                        <span key={b} className="text-xs px-2 py-1 bg-background rounded-full border border-border">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-success/10 text-success p-4 rounded-xl flex gap-3 border border-success/20">
                  <Shield className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">This driver has passed all background checks and is police verified. Your ride is insured.</p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Fare Summary</h2>
                <div className="bg-muted/30 p-6 rounded-2xl border border-border space-y-4">
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Base Fare (1 hour)</span>
                    <span className="font-medium">₹{driver.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="font-medium">₹49</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Taxes (GST 18%)</span>
                    <span className="font-medium">₹{Math.round((driver.pricePerHour + 49) * 0.18)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-xl font-bold text-accent">₹{driver.pricePerHour + 49 + Math.round((driver.pricePerHour + 49) * 0.18)}</span>
                  </div>
                </div>
                <div className="bg-background border border-border p-4 rounded-xl text-sm text-muted-foreground text-center">
                  Overtime charges: ₹50/hr after first 1 hour. Paid directly to driver.
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Payment</h2>
                <div className="space-y-4">
                  <div className="border border-accent bg-accent/5 p-4 rounded-xl flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-6 h-6 text-accent" />
                      <div>
                        <div className="font-bold">UPI</div>
                        <div className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-4 border-accent" />
                  </div>
                  
                  <div className="border border-border bg-muted/30 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <div className="font-bold">Credit / Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-border" />
                  </div>

                  <div className="border border-border bg-muted/30 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <div className="font-bold">Wallets</div>
                        <div className="text-sm text-muted-foreground">Amazon Pay, MobiKwik</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-border" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-10 pt-6 border-t border-border flex justify-end">
            <Button onClick={handleNext} className="w-full sm:w-auto h-12 px-8 text-lg bg-accent text-foreground hover:bg-accent/90 rounded-xl font-bold shadow-lg shadow-accent/20">
              {currentStep === steps.length - 1 ? `Pay ₹${driver.pricePerHour + 49 + Math.round((driver.pricePerHour + 49) * 0.18)}` : "Continue"}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
