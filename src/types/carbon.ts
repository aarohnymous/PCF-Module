export type TransportMethod = 'truck' | 'ship' | 'air' | 'rail';
export type EnergyType = 'electricity' | 'natural_gas' | 'diesel' | 'custom';
export type FuelType = 'diesel' | 'natural_gas' | 'lpg' | 'coal' | 'biomass' | 'custom';

export interface MaterialEmission {
  material: string;
  kgCO2PerKg: number;
}

export interface ProcessEmission {
  process: string;
  kgCO2PerKg: number;
}

export interface TransportEmission {
  method: TransportMethod;
  kgCO2PerKmPerKg: number;
}

export interface EnergyInput {
  id: string;
  type: EnergyType;
  name: string;
  quantity: number;
  unit: string;
  emissionFactor: number;
}

export interface FuelInput {
  id: string;
  type: FuelType;
  name: string;
  quantity: number;
  unit: string;
  emissionFactor: number;
}

export interface Process {
  id: string;
  name: string;
  energyInputs: EnergyInput[];
  fuelInputs: FuelInput[];
}

export interface Component {
  id: string;
  name: string;
  material: string;
  weight: number;
  processes: Process[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  components: Component[];
  transportDistance: number;
  transportMethod: TransportMethod;
  createdAt: string;
  updatedAt: string;
  batches: Batch[];
}

export interface BatchComponent extends Omit<Component, 'processes'> {
  processes: Process[];
  actualWeight: number;
}

export interface Batch {
  id: string;
  batchNumber: string;
  date: string;
  components: BatchComponent[];
  transportDistance: number;
  transportMethod: TransportMethod;
  manufacturedQuantity: number;
  notes?: string;
}