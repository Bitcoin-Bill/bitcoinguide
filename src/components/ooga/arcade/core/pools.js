// Fixed-capacity object pool.
//
// Every transient game object (dart, thrown paper, particle, floating text,
// critic) lives in a pool of pre-allocated records. Nothing is allocated during a
// frame and nothing is filtered into a new array: dead records are marked
// `live = false` and compacted in place. When a pool is full, `acquire()`
// returns null and the caller simply skips that spawn — play never stops.

export class Pool {
  constructor(capacity, create) {
    this.capacity = capacity;
    this.cursor = 0;
    this.items = new Array(capacity);
    for (let i = 0; i < capacity; i += 1) {
      const item = create();
      item.live = false;
      this.items[i] = item;
    }
  }

  acquire() {
    const items = this.items;
    for (let i = 0; i < this.capacity; i += 1) {
      const index = (this.cursor + i) % this.capacity;
      const item = items[index];
      if (!item.live) {
        item.live = true;
        this.cursor = (index + 1) % this.capacity;
        return item;
      }
    }
    return null;
  }

  forEach(fn) {
    const items = this.items;
    for (let i = 0; i < this.capacity; i += 1) {
      const item = items[i];
      if (item.live) fn(item);
    }
  }

  compact(keep) {
    const items = this.items;
    for (let i = 0; i < this.capacity; i += 1) {
      const item = items[i];
      if (item.live && !keep(item)) item.live = false;
    }
  }

  clear() {
    const items = this.items;
    for (let i = 0; i < this.capacity; i += 1) items[i].live = false;
    this.cursor = 0;
  }

  count() {
    const items = this.items;
    let n = 0;
    for (let i = 0; i < this.capacity; i += 1) if (items[i].live) n += 1;
    return n;
  }
}