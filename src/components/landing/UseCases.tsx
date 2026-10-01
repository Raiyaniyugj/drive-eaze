"use client";

import { motion } from "framer-motion";
import { Briefcase, Plane, GlassWater, HeartHandshake, Map, Package } from "lucide-react";

const useCases = [
  { icon: Briefcase, title: "Daily Office Commute", description: "Use your travel time to catch up on emails or relax." },
  { icon: Plane, title: "Airport Transfers", description: "Never miss a flight. Punctual drops and pickups." },
  { icon: HeartHandshake, title: "Weddings & Events", description: "Chauffeur services for your special guests." },
  { icon: Map, title: "Outstation Trips", description: "Safe and comfortable long-distance travel." },
  { icon: GlassWater, title: "Designated Driver", description: "Enjoy your night out without worrying about the drive back." },
  { icon: Package, title: "Business & Delivery", description: "Secure transport for important documents or executives." },
];

export function UseCases() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            A Driver For Every Occasion
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whatever your need, we have a professional driver ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <useCase.icon className="w-6 h-6 text-accent group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
