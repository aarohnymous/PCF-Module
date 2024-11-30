import { MaterialEmission, ProcessEmission, TransportEmission } from '../types/carbon';

export const defaultEnergyEmissionFactors = {
  electricity: 0.5, // kg CO2e/kWh (grid average)
  natural_gas: 0.2, // kg CO2e/kWh
  diesel: 2.68, // kg CO2e/L
};

export const defaultFuelEmissionFactors = {
  diesel: 2.68, // kg CO2e/L
  natural_gas: 0.2, // kg CO2e/kWh
  lpg: 1.51, // kg CO2e/L
  coal: 2.42, // kg CO2e/kg
  biomass: 0.1, // kg CO2e/kg
};

export const defaultMaterialEmissions: MaterialEmission[] = [
  { material: 'aluminum_foil', kgCO2PerKg: 8.14 },
  { material: 'hdpe', kgCO2PerKg: 1.92 },
  { material: 'adhesive', kgCO2PerKg: 2.12 },
  { material: 'pvc', kgCO2PerKg: 2.41 },
  { material: 'steel', kgCO2PerKg: 1.85 },
  { material: 'glass', kgCO2PerKg: 0.85 },
  { material: 'paper', kgCO2PerKg: 1.09 },
];

export const defaultProcessEmissions: ProcessEmission[] = [
  { process: 'thermoforming', kgCO2PerKg: 0.35 },
  { process: 'lamination', kgCO2PerKg: 0.28 },
  { process: 'coating', kgCO2PerKg: 0.42 },
  { process: 'molding', kgCO2PerKg: 0.56 },
  { process: 'cutting', kgCO2PerKg: 0.15 },
  { process: 'assembly', kgCO2PerKg: 0.20 },
];

export const defaultTransportEmissions: TransportEmission[] = [
  { method: 'truck', kgCO2PerKmPerKg: 0.000062 },
  { method: 'ship', kgCO2PerKmPerKg: 0.000008 },
  { method: 'air', kgCO2PerKmPerKg: 0.000602 },
  { method: 'rail', kgCO2PerKmPerKg: 0.000028 },
];