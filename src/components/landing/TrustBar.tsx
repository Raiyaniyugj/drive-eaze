"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Users, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Verified Drivers" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: ShieldCheck, value: "100%", label: "Police Verified" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
];

export function TrustBar() {
  return (
    <div className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <stat.icon className="w-8 h-8 text-accent mb-2" />
              <h3 className="text-3xl md:text-4xl font-heading font-bold">{stat.value}</h3>
              <p className="text-muted text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
