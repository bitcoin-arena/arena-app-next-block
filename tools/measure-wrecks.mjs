// Kanban #962: ticks the truck's centre spends inside a dead tank's 3.0 m circle, over seeds, driving straight and slaloming.
import { init, step } from '../src/sim.js';
import { O_TRUCK, T_X, T_Z } from '../src/state.js';
const seeds = Number(process.argv[2] || 12), R = 3 * 65536; let inside = 0, met = 0;
for (let seed = 1; seed <= seeds; seed++) for (const slalom of [0, 1]) {
  const st = init(seed); let hit = 0;
  for (let t = 0; t < 3600; t++) {
    step(st, 65536, slalom ? (((t / 45) | 0) % 2 ? 22000 : -22000) : 0, 0, 0, 1);
    const x = st.i32[O_TRUCK + T_X], z = st.i32[O_TRUCK + T_Z], h = st.hulks;
    for (let i = 0; i < (h ? h.n : 0); i++) { const dx = (h.xz[2 * i] - x) / 65536, dz = (h.xz[2 * i + 1] - z) / 65536; if (dx * dx + dz * dz < 9) hit += 1; }
  }
  inside += hit; if (hit) met += 1;
}
console.log(`${seeds * 2} runs, ${met} with the truck's centre inside a hulk circle, ${inside} ticks`);
