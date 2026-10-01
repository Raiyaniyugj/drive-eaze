"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Car } from "lucide-react";

export default function Login() {
  const [step, setStep] = useState<"role" | "phone" | "otp">("role");
  const [role, setRole] = useState<"customer" | "driver" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleRoleSelect = (selectedRole: "customer" | "driver") => {
    setRole(selectedRole);
    setStep("phone");
  };

  const handleSendOtp = () => {
    if (phone.length >= 10) setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== "")) {
      window.location.href = role === "driver" ? "/driver-application" : "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col sm:justify-center items-center p-4">
      <Link href="/" className="absolute top-6 left-6 text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-md mt-16 sm:mt-0">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-2">
            <span className="text-3xl font-heading font-bold text-foreground">
              DriveEase<span className="text-accent">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Log in or sign up to continue</p>
        </div>

        <div className="bg-background border border-border p-8 rounded-3xl shadow-xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold mb-4 text-center">Continue as</h2>
                <button 
                  onClick={() => handleRoleSelect("customer")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold">Customer</div>
                    <div className="text-sm text-muted-foreground">Hire verified drivers</div>
                  </div>
                </button>
                <button 
                  onClick={() => handleRoleSelect("driver")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <div className="font-bold">Driver</div>
                    <div className="text-sm text-muted-foreground">Find driving opportunities</div>
                  </div>
                </button>
              </motion.div>
            )}

            {step === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4 cursor-pointer text-sm font-medium text-muted-foreground" onClick={() => setStep("role")}>
                  <ArrowLeft className="w-4 h-4" /> Change role
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <div className="flex mt-2">
                    <div className="bg-muted/50 border border-r-0 border-border rounded-l-xl px-4 flex items-center justify-center font-medium text-muted-foreground">
                      +91
                    </div>
                    <Input 
                      type="tel" 
                      placeholder="Enter mobile number" 
                      className="rounded-l-none h-12 text-lg"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOtp}
                  disabled={phone.length < 10}
                  className="w-full h-12 text-lg bg-foreground text-background font-bold"
                >
                  Get OTP
                </Button>
                <p className="text-xs text-center text-muted-foreground leading-relaxed mt-4">
                  By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 text-center"
              >
                <div className="flex items-center gap-2 mb-4 cursor-pointer text-sm font-medium text-muted-foreground justify-center" onClick={() => setStep("phone")}>
                  <ArrowLeft className="w-4 h-4" /> Change number
                </div>
                <h2 className="text-xl font-bold">Verify OTP</h2>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve sent a 6-digit code to <br/><span className="font-bold text-foreground">+91 {phone}</span>
                </p>
                
                <div className="flex justify-center gap-2 my-8">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-border bg-muted/30 focus:border-accent focus:bg-background outline-none transition-colors"
                    />
                  ))}
                </div>

                <Button 
                  onClick={handleVerify}
                  disabled={!otp.every(d => d !== "")}
                  className="w-full h-12 text-lg bg-accent text-foreground hover:bg-accent/90 font-bold"
                >
                  Verify & Login
                </Button>

                <p className="text-sm mt-4 text-muted-foreground">
                  Didn&apos;t receive the code? <button className="font-bold text-foreground hover:underline ml-1">Resend in 00:30</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
