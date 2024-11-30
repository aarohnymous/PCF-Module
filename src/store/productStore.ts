import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Batch } from '../types/carbon';
import { generateId } from '../utils/helpers';

interface ProductState {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'batches' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  addBatch: (productId: string, batchData: Omit<Batch, 'id'>) => void;
  updateBatch: (productId: string, batchId: string, updates: Omit<Batch, 'id'>) => void;
  removeBatch: (productId: string, batchId: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      
      addProduct: (productData) => set((state) => ({
        products: [...state.products, {
          ...productData,
          id: generateId(),
          batches: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((product) =>
          product.id === id
            ? { 
                ...product, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              }
            : product
        ),
      })),
      
      removeProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      })),
      
      addBatch: (productId, batchData) => set((state) => ({
        products: state.products.map((product) =>
          product.id === productId
            ? {
                ...product,
                batches: [
                  ...product.batches,
                  { ...batchData, id: generateId() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : product
        ),
      })),
      
      updateBatch: (productId, batchId, updates) => set((state) => ({
        products: state.products.map((product) =>
          product.id === productId
            ? {
                ...product,
                batches: product.batches.map((batch) =>
                  batch.id === batchId
                    ? { ...updates, id: batchId }
                    : batch
                ),
                updatedAt: new Date().toISOString(),
              }
            : product
        ),
      })),
      
      removeBatch: (productId, batchId) => set((state) => ({
        products: state.products.map((product) =>
          product.id === productId
            ? {
                ...product,
                batches: product.batches.filter((batch) => batch.id !== batchId),
                updatedAt: new Date().toISOString(),
              }
            : product
        ),
      })),
    }),
    {
      name: 'product-storage',
      version: 2,
    }
  )
);