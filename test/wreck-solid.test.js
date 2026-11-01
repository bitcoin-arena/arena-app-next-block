import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const sim = readFileSync(new URL('../src/sim.js', import.meta.url), 'utf8');
test('a dead tank goes to the wreck list, and the wreck list never writes the truck off', () => {
  assert.match(sim, /st\.hulks\.n = w/);
  assert.match(sim, /const touchedArmour = resolveArmour\(v, st\.armour\.xz/);
  assert.match(sim, /\n  resolveArmour\(v, st\.hulks\.xz, st\.hulks\.n, st\.hulks\.h\);/);
});
