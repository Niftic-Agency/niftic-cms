import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251210_164823 from './20251210_164823';
import * as migration_20251218_180743 from './20251218_180743';
import * as migration_20251218_220204 from './20251218_220204';
import * as migration_20260107_160603 from './20260107_160603';
import * as migration_20260108_214112 from './20260108_214112';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251210_164823.up,
    down: migration_20251210_164823.down,
    name: '20251210_164823',
  },
  {
    up: migration_20251218_180743.up,
    down: migration_20251218_180743.down,
    name: '20251218_180743',
  },
  {
    up: migration_20251218_220204.up,
    down: migration_20251218_220204.down,
    name: '20251218_220204',
  },
  {
    up: migration_20260107_160603.up,
    down: migration_20260107_160603.down,
    name: '20260107_160603',
  },
  {
    up: migration_20260108_214112.up,
    down: migration_20260108_214112.down,
    name: '20260108_214112'
  },
];
