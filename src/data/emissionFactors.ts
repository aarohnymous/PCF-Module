import { MaterialEmission, TransportEmission, ProcessEmission } from '../types/carbon';

export const materialEmissions: MaterialEmission[] = [
  { material: 'aluminum_foil', kgCO2PerKg: 8.14 },
  { material: 'hdpe', kgCO2PerKg: 1.92 },
  { material: 'adhesive', kgCO2PerKg: 2.12 },
  { material: 'pvc', kgCO2PerKg: 2.41 },
  { material: 'steel', kgCO2PerKg: 1.85 },
  { material: 'glass', kgCO2PerKg: 0.85 },
  { material: 'paper', kgCO2PerKg: 1.09 },
];

export const processEmissions: ProcessEmission[] = [
  { process: 'thermoforming', kgCO2PerKg: 0.35 },
  { process: 'lamination', kgCO2PerKg: 0.28 },
  { process: 'coating', kgCO2PerKg: 0.42 },
  { process: 'molding', kgCO2PerKg: 0.56 },
  { process: 'cutting', kgCO2PerKg: 0.15 },
  { process: 'assembly', kgCO2PerKg: 0.20 },
];

export const transportEmissions: TransportEmission[] = [
  { method: 'truck', kgCO2PerKmPerKg: 0.000062 },
  { method: 'ship', kgCO2PerKmPerKg: 0.000008 },
  { method: 'air', kgCO2PerKmPerKg: 0.000602 },
  { method: 'rail', kgCO2PerKmPerKg: 0.000028 },
];