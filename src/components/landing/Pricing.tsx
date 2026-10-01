"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const plans = [
  {
    name: "Hourly",
    price: "₹149",
    duration: "per hour",
    description: "Perfect for quick errands, shopping, or short meetings.",
    features: [
      "Minimum 1 hour booking",
      "₹50/hour overtime charge",
      "Flexible start time",
      "Standard background checked driver"
    ],
    popular: false,
  },
  {
    name: "Daily",
    price: "₹1,299",
    duration: "per day",
    description: "Ideal for outstation trips, events, or full day rentals.",
    features: [
      "Up to 12 hours duty",
      "₹100/hour overtime charge",
      "Night allowance extra (after 10 PM)",
      "Premium rated driver"
    ],
    popular: false,
  },
  {
    name: "Monthly",
    price: "₹18,500",
    duration: "per month",
    description: "Your dedicated personal chauffeur for daily commute.",
    features: [
      "10 hours daily duty (26 days)",
      "Replacement driver guarantee",
      "Dedicated account manager",
      "Premium driver with 5+ yrs experience"
    ],
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a plan that fits your needs. No hidden charges, just reliable service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-accent border-2 shadow-xl scale-105 z-10' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-heading font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-accent text-foreground hover:bg-accent/90' : 'bg-foreground text-background'}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
