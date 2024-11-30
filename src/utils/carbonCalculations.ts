import { 
  Batch, 
  Product, 
  EnergyInput, 
  FuelInput,
  Process,
  Component,
  BatchComponent 
} from '../types/carbon';
import { useEmissionStore } from '../store/emissionStore';

export const calculateEnergyEmissions = (energyInputs: EnergyInput[] = []) => {
  return energyInputs.reduce((total, input) => {
    return total + (input.quantity * input.emissionFactor);
  }, 0);
};

export const calculateFuelEmissions = (fuelInputs: FuelInput[] = []) => {
  return fuelInputs.reduce((total, input) => {
    return total + (input.quantity * input.emissionFactor);
  }, 0);
};

export const calculateProcessEmissions = (process: Process, weight: number) => {
  const energyEmissions = calculateEnergyEmissions(process.energyInputs);
  const fuelEmissions = calculateFuelEmissions(process.fuelInputs);
  return (energyEmissions + fuelEmissions) * weight;
};

export const calculateComponentEmissions = (component: Component | BatchComponent) => {
  const { materials } = useEmissionStore.getState();
  const materialEmission = materials.find(m => m.material === component.material);
  const weight = 'actualWeight' in component ? component.actualWeight : component.weight;
  
  const materialEmissions = materialEmission ? weight * materialEmission.kgCO2PerKg : 0;
  const processEmissions = component.processes.reduce((total, process) => {
    return total + calculateProcessEmissions(process, weight);
  }, 0);

  return {
    materialEmissions,
    processEmissions,
    totalEmissions: materialEmissions + processEmissions
  };
};

export const calculateTransportEmissions = (
  weight: number,
  distance: number,
  method: string
) => {
  const { transport } = useEmissionStore.getState();
  const transportEmission = transport.find(t => t.method === method);
  return transportEmission ? weight * distance * transportEmission.kgCO2PerKmPerKg : 0;
};

export const calculateTotalEmissions = (batch: Batch) => {
  // Calculate emissions for each component
  const componentEmissions = batch.components.map(component => {
    const { materialEmissions, processEmissions, totalEmissions } = calculateComponentEmissions(component);
    return {
      name: component.name,
      materialEmissions,
      processEmissions,
      totalEmissions
    };
  });

  // Calculate transport emissions
  const totalWeight = batch.components.reduce((sum, comp) => sum + comp.actualWeight, 0);
  const transportEmissions = calculateTransportEmissions(
    totalWeight,
    batch.transportDistance,
    batch.transportMethod
  );

  // Calculate total emissions
  const totalEmissions = componentEmissions.reduce(
    (sum, comp) => sum + comp.totalEmissions,
    0
  ) + transportEmissions;

  return {
    componentEmissions,
    transportEmissions,
    totalEmissions
  };
};

export const calculateProductEmissions = (product: Product) => {
  const batchEmissions = product.batches.map(batch => {
    const { totalEmissions } = calculateTotalEmissions(batch);
    return {
      batchId: batch.id,
      batchNumber: batch.batchNumber,
      date: batch.date,
      totalEmissions,
      perUnitEmissions: batch.manufacturedQuantity > 0 
        ? totalEmissions / batch.manufacturedQuantity 
        : 0,
      manufacturedQuantity: batch.manufacturedQuantity
    };
  });

  const totalManufactured = batchEmissions.reduce(
    (sum, batch) => sum + batch.manufacturedQuantity,
    0
  );

  const averagePerUnitEmissions = totalManufactured > 0
    ? batchEmissions.reduce(
        (sum, batch) => sum + (batch.perUnitEmissions * batch.manufacturedQuantity),
        0
      ) / totalManufactured
    : 0;

  return {
    batchEmissions,
    totalManufactured,
    averagePerUnitEmissions
  };
};

export const calculateProductSummary = (batches: Batch[]) => {
  const batchEmissions = batches.map(batch => {
    const { totalEmissions } = calculateTotalEmissions(batch);
    const pcf = batch.manufacturedQuantity > 0 
      ? totalEmissions / batch.manufacturedQuantity 
      : 0;

    return {
      batchId: batch.id,
      batchNumber: batch.batchNumber,
      date: batch.date,
      pcf,
      quantity: batch.manufacturedQuantity
    };
  });

  const totalProduction = batches.reduce(
    (sum, batch) => sum + batch.manufacturedQuantity, 
    0
  );

  const averagePCF = totalProduction > 0
    ? batchEmissions.reduce(
        (sum, batch) => sum + (batch.pcf * batch.quantity),
        0
      ) / totalProduction
    : 0;

  return {
    batchEmissions,
    totalProduction,
    averagePCF
  };
};