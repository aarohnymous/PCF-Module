import React from 'react';
import { Product } from '../../../../types/carbon';
import TransportInput from '../../../../components/forms/product/TransportInput';

interface TransportConfigProps {
  distance: number;
  method: Product['transportMethod'];
  onChange: (updates: Pick<Product, 'transportDistance' | 'transportMethod'>) => void;
}

export default function TransportConfig({
  distance,
  method,
  onChange,
}: TransportConfigProps) {
  return (
    <div className="space-y-6">
      <TransportInput
        distance={distance}
        method={method}
        onChange={(updates) =>
          onChange({
            transportDistance: updates.distance || distance,
            transportMethod: updates.method || method,
          })
        }
      />
    </div>
  );
}