import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true });
for (const name of ['window', 'document', 'HTMLElement', 'SVGElement', 'Element', 'Node']) {
  globalThis[name] = name === 'window' ? dom.window : name === 'document' ? dom.window.document : dom.window[name];
}
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { default: React } = await import('react');
const { render, cleanup } = await import('@testing-library/react');
const { accessors } = await import('./src/data.js');
const { Chart } = await import('./src/Chart.js');
const results = [];

for (const { label, dataKey } of accessors) {
  const { container } = render(React.createElement(Chart, { dataKey }));
  const dotX = Array.from(container.querySelectorAll('.recharts-line-dot'), dot => Number(dot.getAttribute('cx')));
  const axisLabels = Array.from(
    container.querySelectorAll('.recharts-xAxis-tick-labels .recharts-cartesian-axis-tick-value'),
    node => node.textContent,
  );
  results.push({ label, dotX, axisLabels, path: container.querySelector('.recharts-line-curve')?.getAttribute('d') });
  cleanup();
}

console.log(JSON.stringify(results, null, 2));
assert.deepEqual(results[0].dotX, [65, 495, 65]);
for (const result of results.slice(1)) {
  assert.deepEqual(result.dotX, [65, 495]);
  assert.deepEqual(result.axisLabels, ['A', 'B']);
}
dom.window.close();
console.log('Confirmed the 3.10.1 bug: the flat-key control has 3 points; the other accessors lose the third point.');
