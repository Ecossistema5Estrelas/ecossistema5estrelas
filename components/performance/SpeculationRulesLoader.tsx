'use client';

import dynamic from 'next/dynamic';

const SpeculationRules = dynamic(
  () => import('./SpeculationRules'),
  { ssr: false }
);

export default function SpeculationRulesLoader() {
  return <SpeculationRules />;
}