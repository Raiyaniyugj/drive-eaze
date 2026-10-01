"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, CheckCircle2, IndianRupee, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function DriverApplication() {
  const [hours, setHours] = useState([40]);
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero & Calculator */}
        <section className="bg-foreground text-background pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  Drive when you want, <br/><span className="text-accent">earn what you need.</span>
                </h1>
                <p className="text-lg text-muted/80 max-w-lg">
                  Join India&apos;s most premium driver network. Get weekly payouts, flexible hours, and comprehensive insurance coverage.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 pt-6">
                  <div>
                    <IndianRupee className="w-8 h-8 text-accent mb-2" />
                    <div className="font-bold">Weekly Payouts</div>
                    <div className="text-sm text-muted/70">Direct to bank</div>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 text-accent mb-2" />
                    <div className="font-bold">Flexible Hours</div>
                    <div className="text-sm text-muted/70">You&apos;re the boss</div>
                  </div>
                  <div>
                    <ShieldCheck className="w-8 h-8 text-accent mb-2" />
                    <div className="font-bold">Insurance</div>
                    <div className="text-sm text-muted/70">Full coverage</div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[450px] bg-background text-foreground rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">See how much you can earn</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Hours per week</span>
                      <span className="font-bold text-accent text-xl">{hours[0]} hrs</span>
                    </div>
                    <Slider 
                      value={hours} 
                      onValueChange={(val) => setHours(val as number[])} 
                      max={60} 
                      min={10} 
                      step={5}
                      className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent"
                    />
                  </div>
                  <div className="pt-6 border-t border-border">
                    <div className="text-muted-foreground text-sm mb-1">Estimated weekly earnings</div>
                    <div className="text-5xl font-heading font-bold text-foreground">
                      ₹{hours[0] * 200}
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full h-12 text-lg bg-accent text-foreground hover:bg-accent/90 rounded-xl font-bold mt-4"
                  >
                    Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-step Form */}
        <section id="application-form" className="py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete your application</h2>
              <div className="flex items-center justify-center gap-4 text-sm font-medium">
                <div className={`flex items-center gap-2 ${step >= 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">1</div>
                  <span>Personal Details</span>
                </div>
                <div className="w-12 h-px bg-border" />
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent' : 'text-muted-foreground'}`}>
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">2</div>
                  <span>Documents</span>
                </div>
                <div className="w-12 h-px bg-border" />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent' : 'text-muted-foreground'}`}>
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">3</div>
                  <span>Verification</span>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-3xl p-8 shadow-sm">
              {step === 0 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Enter last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="E.g., Mumbai, Delhi" />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input type="number" placeholder="Years" />
                  </div>
                  <Button onClick={() => setStep(1)} className="w-full bg-foreground text-background mt-4">Next Step</Button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="p-6 border-2 border-dashed border-border rounded-xl text-center hover:bg-muted/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <div className="font-bold mb-1">Upload Driving License</div>
                    <div className="text-sm text-muted-foreground">Front and back (PDF, JPG)</div>
                  </div>
                  <div className="p-6 border-2 border-dashed border-border rounded-xl text-center hover:bg-muted/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <div className="font-bold mb-1">Upload Aadhaar Card</div>
                    <div className="text-sm text-muted-foreground">For background verification</div>
                  </div>
                  <div className="p-6 border-2 border-dashed border-border rounded-xl text-center hover:bg-muted/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <div className="font-bold mb-1">Profile Photo</div>
                    <div className="text-sm text-muted-foreground">Clear face on plain background</div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={() => setStep(0)} variant="outline" className="w-full">Back</Button>
                    <Button onClick={() => setStep(2)} className="w-full bg-foreground text-background">Submit Documents</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Application Submitted Successfully</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    We&apos;ve received your documents. Our verification team will review them and contact you within 48 hours for the next steps.
                  </p>
                  <Button onClick={() => window.location.href = "/"} className="bg-foreground text-background">
                    Return to Home
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
