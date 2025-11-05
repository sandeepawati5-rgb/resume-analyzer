
// Fix: Import React to provide the 'React' namespace for types.
import React from 'react';

export interface User {
  name: string;
  email: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface DemoReport {
  name: string;
  score: number;
  missingSkills: string[];
  suggestions: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  isFeatured: boolean;
}

export interface DashboardResume {
    id: number;
    name: string;
    score: number;
    keywordsFound: string[];
    improvementTips: string;
    lastUpdated: string;
}
