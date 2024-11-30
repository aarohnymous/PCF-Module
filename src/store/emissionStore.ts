import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MaterialEmission, ProcessEmission, TransportEmission } from '../types/carbon';
import {
  defaultMaterialEmissions,
  defaultProcessEmissions,
  defaultTransportEmissions,
} from '../data/defaultEmissionFactors';

interface EmissionState {
  materials: MaterialEmission[];
  processes: ProcessEmission[];
  transport: TransportEmission[];
  addMaterialEmission: (emission: MaterialEmission) => void;
  addProcessEmission: (emission: ProcessEmission) => void;
  addTransportEmission: (emission: TransportEmission) => void;
  updateMaterialEmission: (material: string, value: number) => void;
  updateProcessEmission: (process: string, value: number) => void;
  updateTransportEmission: (method: string, value: number) => void;
  removeMaterialEmission: (index: number) => void;
  removeProcessEmission: (index: number) => void;
  removeTransportEmission: (index: number) => void;
  resetToDefaults: () => void;
}

export const useEmissionStore = create<EmissionState>()(
  persist(
    (set) => ({
      materials: defaultMaterialEmissions,
      processes: defaultProcessEmissions,
      transport: defaultTransportEmissions,

      addMaterialEmission: (emission) =>
        set((state) => ({
          materials: [...state.materials, emission],
        })),

      addProcessEmission: (emission) =>
        set((state) => ({
          processes: [...state.processes, emission],
        })),

      addTransportEmission: (emission) =>
        set((state) => ({
          transport: [...state.transport, emission],
        })),

      updateMaterialEmission: (material, value) =>
        set((state) => ({
          materials: state.materials.map((m) =>
            m.material === material ? { ...m, kgCO2PerKg: value } : m
          ),
        })),

      updateProcessEmission: (process, value) =>
        set((state) => ({
          processes: state.processes.map((p) =>
            p.process === process ? { ...p, kgCO2PerKg: value } : p
          ),
        })),

      updateTransportEmission: (method, value) =>
        set((state) => ({
          transport: state.transport.map((t) =>
            t.method === method ? { ...t, kgCO2PerKmPerKg: value } : t
          ),
        })),

      removeMaterialEmission: (index) =>
        set((state) => ({
          materials: state.materials.filter((_, i) => i !== index),
        })),

      removeProcessEmission: (index) =>
        set((state) => ({
          processes: state.processes.filter((_, i) => i !== index),
        })),

      removeTransportEmission: (index) =>
        set((state) => ({
          transport: state.transport.filter((_, i) => i !== index),
        })),

      resetToDefaults: () =>
        set({
          materials: defaultMaterialEmissions,
          processes: defaultProcessEmissions,
          transport: defaultTransportEmissions,
        }),
    }),
    {
      name: 'emission-factors',
      version: 1,
    }
  )
);