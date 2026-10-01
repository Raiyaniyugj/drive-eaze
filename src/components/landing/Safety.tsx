"use client";

import { Shield, Fingerprint, Navigation, Share2, BellRing, Smartphone } from "lucide-react";

export function Safety() {
  return (
    <section className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Uncompromising Safety</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Your Safety is Our Highest Priority
              </h2>
              <p className="text-lg text-muted/80">
                We go beyond standard background checks. Every DriveEase trip is monitored and protected by industry-leading safety protocols.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Fingerprint, title: "Police Verified", desc: "Rigorous background checks." },
                { icon: Navigation, title: "Live GPS Tracking", desc: "Monitor your trip in real-time." },
                { icon: Share2, title: "Share Trip", desc: "Keep loved ones informed." },
                { icon: BellRing, title: "SOS Button", desc: "Instant emergency response." },
                { icon: Smartphone, title: "Trip OTP", desc: "Secure ride commencement." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 bg-background/5 border border-white/10 p-2 rounded-3xl backdrop-blur-sm max-w-sm mx-auto shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80" 
                alt="App tracking" 
                className="w-full rounded-2xl opacity-80"
              />
              {/* Mock UI overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-background text-foreground p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold">En route to Destination</span>
                  <span className="text-accent font-bold">12 min</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Driver" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Rahul S.</div>
                    <div className="text-xs text-muted-foreground">MH 02 AB 1234</div>
                  </div>
                  <div className="ml-auto w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <BellRing className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
