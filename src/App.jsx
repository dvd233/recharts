import React from 'react';
import { accessors } from './data.js';
import { Chart } from './Chart.js';

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Categorical axis accessor reproduction</h1>
      <p>All four charts use A, B, A. Each should show three points, with the first and third at A.</p>
      <p>Recharts 3.10.1 renders only two points for the nested, function and numeric-zero accessors.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {accessors.map(({ label, dataKey }) => (
          <section key={label}>
            <h2 style={{ fontSize: 17 }}>{label}</h2>
            <Chart dataKey={dataKey} />
          </section>
        ))}
      </div>
    </main>
  );
}
