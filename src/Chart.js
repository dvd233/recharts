import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { data } from './data.js';

export function Chart({ dataKey }) {
  return React.createElement(
    LineChart,
    { width: 500, height: 300, data },
    React.createElement(XAxis, { dataKey, allowDuplicatedCategory: false }),
    React.createElement(YAxis),
    React.createElement(Line, { dataKey: 'value', isAnimationActive: false, dot: true }),
  );
}
