import { createEventDispatcher as In, getContext as Ir, setContext as Fr } from "svelte";
const Fn = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Fn);
const Kn = 1, Ln = 2, Gr = 4, Vn = 8, Un = 16, qn = 1, zn = 4, Bn = 8, Jn = 16, Hn = 1, Gn = 2, te = /* @__PURE__ */ Symbol(), Yr = "http://www.w3.org/1999/xhtml", vr = !1;
var Zt = Array.isArray, Yn = Array.prototype.indexOf, mt = Array.prototype.includes, gr = Array.from, Wn = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, Zn = Object.getOwnPropertyDescriptors, Wr = Object.prototype, Xn = Array.prototype, wr = Object.getPrototypeOf;
const Re = () => {
};
function Qn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Zr() {
  var e, t, r = new Promise((i, n) => {
    e = i, t = n;
  });
  return { promise: r, resolve: e, reject: t };
}
const ne = 2, Bt = 4, Ar = 8, Xr = 1 << 24, He = 16, je = 32, gt = 64, $n = 128, Ae = 512, ee = 1024, se = 2048, Ie = 4096, me = 8192, Be = 16384, It = 32768, lt = 65536, Kr = 1 << 17, Qr = 1 << 18, Xt = 1 << 19, ei = 1 << 20, qe = 1 << 25, ft = 65536, _r = 1 << 21, Er = 1 << 22, Ze = 1 << 23, vt = /* @__PURE__ */ Symbol("$state"), ti = /* @__PURE__ */ Symbol("legacy props"), ri = /* @__PURE__ */ Symbol(""), it = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ni = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function ii() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ai(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function oi(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function si() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function li(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function fi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ui(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function ci() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function di() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function vi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _i() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function $r(e) {
  return e === this.v;
}
function hi(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function en(e) {
  return !hi(e, this.v);
}
let pi = !1;
const mi = [];
function ct(e, t = !1, r = !1) {
  return qt(e, /* @__PURE__ */ new Map(), "", mi, null, r);
}
function qt(e, t, r, i, n = null, a = !1) {
  if (typeof e == "object" && e !== null) {
    var s = t.get(e);
    if (s !== void 0) return s;
    if (e instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(e)
    );
    if (e instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(e)
    );
    if (Zt(e)) {
      var l = (
        /** @type {Snapshot<any>} */
        Array(e.length)
      );
      t.set(e, l), n !== null && t.set(n, l);
      for (var o = 0; o < e.length; o += 1) {
        var f = e[o];
        o in e && (l[o] = qt(f, t, r, i, null, a));
      }
      return l;
    }
    if (wr(e) === Wr) {
      l = {}, t.set(e, l), n !== null && t.set(n, l);
      for (var u in e)
        l[u] = qt(
          // @ts-expect-error
          e[u],
          t,
          r,
          i,
          null,
          a
        );
      return l;
    }
    if (e instanceof Date)
      return (
        /** @type {Snapshot<T>} */
        structuredClone(e)
      );
    if (typeof /** @type {T & { toJSON?: any } } */
    e.toJSON == "function" && !a)
      return qt(
        /** @type {T & { toJSON(): any } } */
        e.toJSON(),
        t,
        r,
        i,
        // Associate the instance with the toJSON clone
        e
      );
  }
  if (e instanceof EventTarget)
    return (
      /** @type {Snapshot<T>} */
      e
    );
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(e)
    );
  } catch {
    return (
      /** @type {Snapshot<T>} */
      e
    );
  }
}
let Fe = null;
function Jt(e) {
  Fe = e;
}
function Ne(e, t = !1, r) {
  Fe = {
    p: Fe,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function Pe(e) {
  var t = (
    /** @type {ComponentContext} */
    Fe
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var i of r)
      _n(i);
  }
  return t.i = !0, Fe = t.p, /** @type {T} */
  {};
}
function tn() {
  return !0;
}
let dt = [];
function yi() {
  var e = dt;
  dt = [], Qn(e);
}
function Ht(e) {
  if (dt.length === 0) {
    var t = dt;
    queueMicrotask(() => {
      t === dt && yi();
    });
  }
  dt.push(e);
}
function bi(e) {
  var t = K;
  if (t === null)
    return P.f |= Ze, e;
  if ((t.f & It) === 0 && (t.f & Bt) === 0)
    throw e;
  Gt(e, t);
}
function Gt(e, t) {
  for (; t !== null; ) {
    if ((t.f & $n) !== 0) {
      if ((t.f & It) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    }
    t = t.parent;
  }
  throw e;
}
const gi = -7169;
function Q(e, t) {
  e.f = e.f & gi | t;
}
function xr(e) {
  (e.f & Ae) !== 0 || e.deps === null ? Q(e, ee) : Q(e, Ie);
}
function rn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & ne) === 0 || (t.f & ft) === 0 || (t.f ^= ft, rn(
        /** @type {Derived} */
        t.deps
      ));
}
function wi(e, t, r) {
  (e.f & se) !== 0 ? t.add(e) : (e.f & Ie) !== 0 && r.add(e), rn(e.deps), Q(e, ee);
}
const Lt = /* @__PURE__ */ new Set();
let B = null, Oe = null, ge = [], Sr = null, hr = !1;
class Qt {
  committed = !1;
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #r = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #n = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #o = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #a = /* @__PURE__ */ new Map();
  is_fork = !1;
  #l = !1;
  is_deferred() {
    return this.is_fork || this.#n > 0;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#a.has(t) || this.#a.set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var r = this.#a.get(t);
    if (r) {
      this.#a.delete(t);
      for (var i of r.d)
        Q(i, se), ze(i);
      for (i of r.m)
        Q(i, Ie), ze(i);
    }
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    ge = [], this.apply();
    var r = [], i = [];
    for (const n of t)
      this.#f(n, r, i);
    if (this.is_deferred()) {
      this.#u(i), this.#u(r);
      for (const [n, a] of this.#a)
        on(n, a);
    } else {
      for (const n of this.#t) n();
      this.#t.clear(), this.#e === 0 && this.#c(), B = null, Lr(i), Lr(r), this.#o?.resolve();
    }
    Oe = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #f(t, r, i) {
    t.f ^= ee;
    for (var n = t.first, a = null; n !== null; ) {
      var s = n.f, l = (s & (je | gt)) !== 0, o = l && (s & ee) !== 0, f = o || (s & me) !== 0 || this.#a.has(n);
      if (!f && n.fn !== null) {
        l ? n.f ^= ee : a !== null && (s & (Bt | Ar | Xr)) !== 0 ? a.b.defer_effect(n) : (s & Bt) !== 0 ? r.push(n) : Kt(n) && ((s & He) !== 0 && this.#i.add(n), yt(n));
        var u = n.first;
        if (u !== null) {
          n = u;
          continue;
        }
      }
      for (; n !== null; ) {
        n === a && (a = null);
        var h = n.next;
        if (h !== null) {
          n = h;
          break;
        }
        n = n.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #u(t) {
    for (var r = 0; r < t.length; r += 1)
      wi(t[r], this.#s, this.#i);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    r !== te && !this.previous.has(t) && this.previous.set(t, r), (t.f & Ze) === 0 && (this.current.set(t, t.v), Oe?.set(t, t.v));
  }
  activate() {
    B = this, this.apply();
  }
  deactivate() {
    B === this && (B = null, Oe = null);
  }
  flush() {
    if (this.activate(), ge.length > 0) {
      if (Ai(), B !== null && B !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#r) t(this);
    this.#r.clear();
  }
  #c() {
    if (Lt.size > 1) {
      this.previous.clear();
      var t = Oe, r = !0;
      for (const n of Lt) {
        if (n === this) {
          r = !1;
          continue;
        }
        const a = [];
        for (const [l, o] of this.current) {
          if (n.current.has(l))
            if (r && o !== n.current.get(l))
              n.current.set(l, o);
            else
              continue;
          a.push(l);
        }
        if (a.length === 0)
          continue;
        const s = [...n.current.keys()].filter((l) => !this.current.has(l));
        if (s.length > 0) {
          var i = ge;
          ge = [];
          const l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
          for (const f of a)
            nn(f, s, l, o);
          if (ge.length > 0) {
            B = n, n.apply();
            for (const f of ge)
              n.#f(f, [], []);
            n.deactivate();
          }
          ge = i;
        }
      }
      B = null, Oe = t;
    }
    this.committed = !0, Lt.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#e += 1, t && (this.#n += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#e -= 1, t && (this.#n -= 1), !this.#l && (this.#l = !0, Ht(() => {
      this.#l = !1, this.is_deferred() ? ge.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of this.#s)
      this.#i.delete(t), Q(t, se), ze(t);
    for (const t of this.#i)
      Q(t, Ie), ze(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#t.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#r.add(t);
  }
  settled() {
    return (this.#o ??= Zr()).promise;
  }
  static ensure() {
    if (B === null) {
      const t = B = new Qt();
      Lt.add(B), Ht(() => {
        B === t && t.flush();
      });
    }
    return B;
  }
  apply() {
  }
}
function Ai() {
  hr = !0;
  var e = null;
  try {
    for (var t = 0; ge.length > 0; ) {
      var r = Qt.ensure();
      if (t++ > 1e3) {
        var i, n;
        Ei();
      }
      r.process(ge), Xe.clear();
    }
  } finally {
    ge = [], hr = !1, Sr = null;
  }
}
function Ei() {
  try {
    fi();
  } catch (e) {
    Gt(e, Sr);
  }
}
let Ue = null;
function Lr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var i = e[r++];
      if ((i.f & (Be | me)) === 0 && Kt(i) && (Ue = /* @__PURE__ */ new Set(), yt(i), i.deps === null && i.first === null && i.nodes === null && i.teardown === null && i.ac === null && pn(i), Ue?.size > 0)) {
        Xe.clear();
        for (const n of Ue) {
          if ((n.f & (Be | me)) !== 0) continue;
          const a = [n];
          let s = n.parent;
          for (; s !== null; )
            Ue.has(s) && (Ue.delete(s), a.push(s)), s = s.parent;
          for (let l = a.length - 1; l >= 0; l--) {
            const o = a[l];
            (o.f & (Be | me)) === 0 && yt(o);
          }
        }
        Ue.clear();
      }
    }
    Ue = null;
  }
}
function nn(e, t, r, i) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const n of e.reactions) {
      const a = n.f;
      (a & ne) !== 0 ? nn(
        /** @type {Derived} */
        n,
        t,
        r,
        i
      ) : (a & (Er | He)) !== 0 && (a & se) === 0 && an(n, t, i) && (Q(n, se), ze(
        /** @type {Effect} */
        n
      ));
    }
}
function an(e, t, r) {
  const i = r.get(e);
  if (i !== void 0) return i;
  if (e.deps !== null)
    for (const n of e.deps) {
      if (mt.call(t, n))
        return !0;
      if ((n.f & ne) !== 0 && an(
        /** @type {Derived} */
        n,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          n,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function ze(e) {
  for (var t = Sr = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (hr && t === K && (r & He) !== 0 && (r & Qr) === 0)
      return;
    if ((r & (gt | je)) !== 0) {
      if ((r & ee) === 0) return;
      t.f ^= ee;
    }
  }
  ge.push(t);
}
function on(e, t) {
  if (!((e.f & je) !== 0 && (e.f & ee) !== 0)) {
    (e.f & se) !== 0 ? t.d.push(e) : (e.f & Ie) !== 0 && t.m.push(e), Q(e, ee);
    for (var r = e.first; r !== null; )
      on(r, t), r = r.next;
  }
}
function xi(e, t, r, i) {
  const n = $t;
  var a = e.filter((_) => !_.settled);
  if (r.length === 0 && a.length === 0) {
    i(t.map(n));
    return;
  }
  var s = B, l = (
    /** @type {Effect} */
    K
  ), o = Si(), f = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((_) => _.promise)) : null;
  function u(_) {
    o();
    try {
      i(_);
    } catch (p) {
      (l.f & Be) === 0 && Gt(p, l);
    }
    s?.deactivate(), pr();
  }
  if (r.length === 0) {
    f.then(() => u(t.map(n)));
    return;
  }
  function h() {
    o(), Promise.all(r.map((_) => /* @__PURE__ */ Oi(_))).then((_) => u([...t.map(n), ..._])).catch((_) => Gt(_, l));
  }
  f ? f.then(h) : h();
}
function Si() {
  var e = K, t = P, r = Fe, i = B;
  return function(a = !0) {
    $e(e), Ke(t), Jt(r), a && i?.activate();
  };
}
function pr() {
  $e(null), Ke(null), Jt(null);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
  var t = ne | se, r = P !== null && (P.f & ne) !== 0 ? (
    /** @type {Derived} */
    P
  ) : null;
  return K !== null && (K.f |= Xt), {
    ctx: Fe,
    deps: null,
    effects: null,
    equals: $r,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      te
    ),
    wv: 0,
    parent: r ?? K,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Oi(e, t, r) {
  let i = (
    /** @type {Effect | null} */
    K
  );
  i === null && ii();
  var n = (
    /** @type {Boundary} */
    i.b
  ), a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = jt(
    /** @type {V} */
    te
  ), l = !P, o = /* @__PURE__ */ new Map();
  return Vi(() => {
    var f = Zr();
    a = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).then(() => {
        u === B && u.committed && u.deactivate(), pr();
      });
    } catch (p) {
      f.reject(p), pr();
    }
    var u = (
      /** @type {Batch} */
      B
    );
    if (l) {
      var h = n.is_rendered();
      n.update_pending_count(1), u.increment(h), o.get(u)?.reject(it), o.delete(u), o.set(u, f);
    }
    const _ = (p, m = void 0) => {
      if (u.activate(), m)
        m !== it && (s.f |= Ze, Nt(s, m));
      else {
        (s.f & Ze) !== 0 && (s.f ^= Ze), Nt(s, p);
        for (const [v, d] of o) {
          if (o.delete(v), v === u) break;
          d.reject(it);
        }
      }
      l && (n.update_pending_count(-1), u.decrement(h));
    };
    f.promise.then(_, (p) => _(null, p || "unknown"));
  }), Tr(() => {
    for (const f of o.values())
      f.reject(it);
  }), new Promise((f) => {
    function u(h) {
      function _() {
        h === a ? f(s) : u(a);
      }
      h.then(_, _);
    }
    u(a);
  });
}
// @__NO_SIDE_EFFECTS__
function S(e) {
  const t = /* @__PURE__ */ $t(e);
  return bn(t), t;
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
  const t = /* @__PURE__ */ $t(e);
  return t.equals = en, t;
}
function ki(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      Je(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Ti(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & ne) === 0)
      return (t.f & Be) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function Or(e) {
  var t, r = K;
  $e(Ti(e));
  try {
    e.f &= ~ft, ki(e), t = En(e);
  } finally {
    $e(r);
  }
  return t;
}
function ln(e) {
  var t = Or(e);
  if (!e.equals(t) && (e.wv = wn(), (!B?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    Q(e, ee);
    return;
  }
  Qe || (Oe !== null ? (vn() || B?.is_fork) && Oe.set(e, t) : xr(e));
}
function ji(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(it), t.teardown = Re, t.ac = null, Dt(t, 0), jr(t));
}
function fn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && yt(t);
}
let mr = /* @__PURE__ */ new Set();
const Xe = /* @__PURE__ */ new Map();
let un = !1;
function jt(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: $r,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function we(e, t) {
  const r = jt(e);
  return bn(r), r;
}
// @__NO_SIDE_EFFECTS__
function Ni(e, t = !1, r = !0) {
  const i = jt(e);
  return t || (i.equals = en), i;
}
function X(e, t, r = !1) {
  P !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Te || (P.f & Kr) !== 0) && tn() && (P.f & (ne | He | Er | Kr)) !== 0 && (Ee === null || !mt.call(Ee, e)) && vi();
  let i = r ? ke(t) : t;
  return Nt(e, i);
}
function Nt(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Qe ? Xe.set(e, t) : Xe.set(e, r), e.v = t;
    var i = Qt.ensure();
    if (i.capture(e, r), (e.f & ne) !== 0) {
      const n = (
        /** @type {Derived} */
        e
      );
      (e.f & se) !== 0 && Or(n), xr(n);
    }
    e.wv = wn(), cn(e, se), K !== null && (K.f & ee) !== 0 && (K.f & (je | gt)) === 0 && (be === null ? Bi([e]) : be.push(e)), !i.is_fork && mr.size > 0 && !un && Pi();
  }
  return t;
}
function Pi() {
  un = !1;
  for (const e of mr)
    (e.f & ee) !== 0 && Q(e, Ie), Kt(e) && yt(e);
  mr.clear();
}
function fr(e) {
  X(e, e.v + 1);
}
function cn(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, n = 0; n < i; n++) {
      var a = r[n], s = a.f, l = (s & se) === 0;
      if (l && Q(a, t), (s & ne) !== 0) {
        var o = (
          /** @type {Derived} */
          a
        );
        Oe?.delete(o), (s & ft) === 0 && (s & Ae && (a.f |= ft), cn(o, Ie));
      } else l && ((s & He) !== 0 && Ue !== null && Ue.add(
        /** @type {Effect} */
        a
      ), ze(
        /** @type {Effect} */
        a
      ));
    }
}
function ke(e) {
  if (typeof e != "object" || e === null || vt in e)
    return e;
  const t = wr(e);
  if (t !== Wr && t !== Xn)
    return e;
  var r = /* @__PURE__ */ new Map(), i = Zt(e), n = /* @__PURE__ */ we(0), a = ot, s = (l) => {
    if (ot === a)
      return l();
    var o = P, f = ot;
    Ke(null), qr(a);
    var u = l();
    return Ke(o), qr(f), u;
  };
  return i && r.set("length", /* @__PURE__ */ we(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, o, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && ci();
        var u = r.get(o);
        return u === void 0 ? s(() => {
          var h = /* @__PURE__ */ we(f.value);
          return r.set(o, h), h;
        }) : X(u, f.value, !0), !0;
      },
      deleteProperty(l, o) {
        var f = r.get(o);
        if (f === void 0) {
          if (o in l) {
            const u = s(() => /* @__PURE__ */ we(te));
            r.set(o, u), fr(n);
          }
        } else
          X(f, te), fr(n);
        return !0;
      },
      get(l, o, f) {
        if (o === vt)
          return e;
        var u = r.get(o), h = o in l;
        if (u === void 0 && (!h || Ut(l, o)?.writable) && (u = s(() => {
          var p = ke(h ? l[o] : te), m = /* @__PURE__ */ we(p);
          return m;
        }), r.set(o, u)), u !== void 0) {
          var _ = c(u);
          return _ === te ? void 0 : _;
        }
        return Reflect.get(l, o, f);
      },
      getOwnPropertyDescriptor(l, o) {
        var f = Reflect.getOwnPropertyDescriptor(l, o);
        if (f && "value" in f) {
          var u = r.get(o);
          u && (f.value = c(u));
        } else if (f === void 0) {
          var h = r.get(o), _ = h?.v;
          if (h !== void 0 && _ !== te)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return f;
      },
      has(l, o) {
        if (o === vt)
          return !0;
        var f = r.get(o), u = f !== void 0 && f.v !== te || Reflect.has(l, o);
        if (f !== void 0 || K !== null && (!u || Ut(l, o)?.writable)) {
          f === void 0 && (f = s(() => {
            var _ = u ? ke(l[o]) : te, p = /* @__PURE__ */ we(_);
            return p;
          }), r.set(o, f));
          var h = c(f);
          if (h === te)
            return !1;
        }
        return u;
      },
      set(l, o, f, u) {
        var h = r.get(o), _ = o in l;
        if (i && o === "length")
          for (var p = f; p < /** @type {Source<number>} */
          h.v; p += 1) {
            var m = r.get(p + "");
            m !== void 0 ? X(m, te) : p in l && (m = s(() => /* @__PURE__ */ we(te)), r.set(p + "", m));
          }
        if (h === void 0)
          (!_ || Ut(l, o)?.writable) && (h = s(() => /* @__PURE__ */ we(void 0)), X(h, ke(f)), r.set(o, h));
        else {
          _ = h.v !== te;
          var v = s(() => ke(f));
          X(h, v);
        }
        var d = Reflect.getOwnPropertyDescriptor(l, o);
        if (d?.set && d.set.call(u, f), !_) {
          if (i && typeof o == "string") {
            var w = (
              /** @type {Source<number>} */
              r.get("length")
            ), x = Number(o);
            Number.isInteger(x) && x >= w.v && X(w, x + 1);
          }
          fr(n);
        }
        return !0;
      },
      ownKeys(l) {
        c(n);
        var o = Reflect.ownKeys(l).filter((h) => {
          var _ = r.get(h);
          return _ === void 0 || _.v !== te;
        });
        for (var [f, u] of r)
          u.v !== te && !(f in l) && o.push(f);
        return o;
      },
      setPrototypeOf() {
        di();
      }
    }
  );
}
function Vr(e) {
  try {
    if (e !== null && typeof e == "object" && vt in e)
      return e[vt];
  } catch {
  }
  return e;
}
function Di(e, t) {
  return Object.is(Vr(e), Vr(t));
}
var Mi, Ci, Ri;
function _t(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Yt(e) {
  return (
    /** @type {TemplateNode | null} */
    Ci.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return (
    /** @type {TemplateNode | null} */
    Ri.call(e)
  );
}
function T(e, t) {
  return /* @__PURE__ */ Yt(e);
}
function C(e, t = !1) {
  {
    var r = /* @__PURE__ */ Yt(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ Ft(r) : r;
  }
}
function M(e, t = 1, r = !1) {
  let i = e;
  for (; t--; )
    i = /** @type {TemplateNode} */
    /* @__PURE__ */ Ft(i);
  return i;
}
function Ii(e) {
  e.textContent = "";
}
function dn() {
  return !1;
}
function Fi(e, t, r) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Yr, e, void 0)
  );
}
function kr(e) {
  var t = P, r = K;
  Ke(null), $e(null);
  try {
    return e();
  } finally {
    Ke(t), $e(r);
  }
}
function Ki(e) {
  K === null && (P === null && li(), si()), Qe && oi();
}
function Li(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function wt(e, t, r) {
  var i = K;
  i !== null && (i.f & me) !== 0 && (e |= me);
  var n = {
    ctx: Fe,
    deps: null,
    nodes: null,
    f: e | se | Ae,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      yt(n);
    } catch (l) {
      throw Je(n), l;
    }
  else t !== null && ze(n);
  var a = n;
  if (r && a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
  (a.f & Xt) === 0 && (a = a.first, (e & He) !== 0 && (e & lt) !== 0 && a !== null && (a.f |= lt)), a !== null && (a.parent = i, i !== null && Li(a, i), P !== null && (P.f & ne) !== 0 && (e & gt) === 0)) {
    var s = (
      /** @type {Derived} */
      P
    );
    (s.effects ??= []).push(a);
  }
  return n;
}
function vn() {
  return P !== null && !Te;
}
function Tr(e) {
  const t = wt(Ar, null, !1);
  return Q(t, ee), t.teardown = e, t;
}
function ur(e) {
  Ki();
  var t = (
    /** @type {Effect} */
    K.f
  ), r = !P && (t & je) !== 0 && (t & It) === 0;
  if (r) {
    var i = (
      /** @type {ComponentContext} */
      Fe
    );
    (i.e ??= []).push(e);
  } else
    return _n(e);
}
function _n(e) {
  return wt(Bt | ei, e, !1);
}
function Vi(e) {
  return wt(Er | Xt, e, !0);
}
function R(e, t = [], r = [], i = []) {
  xi(i, t, r, (n) => {
    wt(Ar, () => e(...n.map(c)), !0);
  });
}
function er(e, t = 0) {
  var r = wt(He | t, e, !0);
  return r;
}
function Pt(e) {
  return wt(je | Xt, e, !0);
}
function hn(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Qe, i = P;
    Ur(!0), Ke(null);
    try {
      t.call(null);
    } finally {
      Ur(r), Ke(i);
    }
  }
}
function jr(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const n = r.ac;
    n !== null && kr(() => {
      n.abort(it);
    });
    var i = r.next;
    (r.f & gt) !== 0 ? r.parent = null : Je(r, t), r = i;
  }
}
function Ui(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & je) === 0 && Je(t), t = r;
  }
}
function Je(e, t = !0) {
  var r = !1;
  (t || (e.f & Qr) !== 0) && e.nodes !== null && e.nodes.end !== null && (qi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), jr(e, t && !r), Dt(e, 0), Q(e, Be);
  var i = e.nodes && e.nodes.t;
  if (i !== null)
    for (const a of i)
      a.stop();
  hn(e);
  var n = e.parent;
  n !== null && n.first !== null && pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function qi(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ Ft(e);
    e.remove(), e = r;
  }
}
function pn(e) {
  var t = e.parent, r = e.prev, i = e.next;
  r !== null && (r.next = i), i !== null && (i.prev = r), t !== null && (t.first === e && (t.first = i), t.last === e && (t.last = r));
}
function Nr(e, t, r = !0) {
  var i = [];
  mn(e, i, !0);
  var n = () => {
    r && Je(e), t && t();
  }, a = i.length;
  if (a > 0) {
    var s = () => --a || n();
    for (var l of i)
      l.out(s);
  } else
    n();
}
function mn(e, t, r) {
  if ((e.f & me) === 0) {
    e.f ^= me;
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || r) && t.push(l);
    for (var n = e.first; n !== null; ) {
      var a = n.next, s = (n.f & lt) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (n.f & je) !== 0 && (e.f & He) !== 0;
      mn(n, t, s ? r : !1), n = a;
    }
  }
}
function Pr(e) {
  yn(e, !0);
}
function yn(e, t) {
  if ((e.f & me) !== 0) {
    e.f ^= me, (e.f & ee) === 0 && (Q(e, se), ze(e));
    for (var r = e.first; r !== null; ) {
      var i = r.next, n = (r.f & lt) !== 0 || (r.f & je) !== 0;
      yn(r, n ? t : !1), r = i;
    }
    var a = e.nodes && e.nodes.t;
    if (a !== null)
      for (const s of a)
        (s.is_global || t) && s.in();
  }
}
function zi(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end; r !== null; ) {
      var n = r === i ? null : /* @__PURE__ */ Ft(r);
      t.append(r), r = n;
    }
}
let zt = !1, Qe = !1;
function Ur(e) {
  Qe = e;
}
let P = null, Te = !1;
function Ke(e) {
  P = e;
}
let K = null;
function $e(e) {
  K = e;
}
let Ee = null;
function bn(e) {
  P !== null && (Ee === null ? Ee = [e] : Ee.push(e));
}
let ve = null, pe = 0, be = null;
function Bi(e) {
  be = e;
}
let gn = 1, at = 0, ot = at;
function qr(e) {
  ot = e;
}
function wn() {
  return ++gn;
}
function Kt(e) {
  var t = e.f;
  if ((t & se) !== 0)
    return !0;
  if (t & ne && (e.f &= ~ft), (t & Ie) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), i = r.length, n = 0; n < i; n++) {
      var a = r[n];
      if (Kt(
        /** @type {Derived} */
        a
      ) && ln(
        /** @type {Derived} */
        a
      ), a.wv > e.wv)
        return !0;
    }
    (t & Ae) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Oe === null && Q(e, ee);
  }
  return !1;
}
function An(e, t, r = !0) {
  var i = e.reactions;
  if (i !== null && !(Ee !== null && mt.call(Ee, e)))
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      (a.f & ne) !== 0 ? An(
        /** @type {Derived} */
        a,
        t,
        !1
      ) : t === a && (r ? Q(a, se) : (a.f & ee) !== 0 && Q(a, Ie), ze(
        /** @type {Effect} */
        a
      ));
    }
}
function En(e) {
  var t = ve, r = pe, i = be, n = P, a = Ee, s = Fe, l = Te, o = ot, f = e.f;
  ve = /** @type {null | Value[]} */
  null, pe = 0, be = null, P = (f & (je | gt)) === 0 ? e : null, Ee = null, Jt(e.ctx), Te = !1, ot = ++at, e.ac !== null && (kr(() => {
    e.ac.abort(it);
  }), e.ac = null);
  try {
    e.f |= _r;
    var u = (
      /** @type {Function} */
      e.fn
    ), h = u();
    e.f |= It;
    var _ = e.deps, p = B?.is_fork;
    if (ve !== null) {
      var m;
      if (p || Dt(e, pe), _ !== null && pe > 0)
        for (_.length = pe + ve.length, m = 0; m < ve.length; m++)
          _[pe + m] = ve[m];
      else
        e.deps = _ = ve;
      if (vn() && (e.f & Ae) !== 0)
        for (m = pe; m < _.length; m++)
          (_[m].reactions ??= []).push(e);
    } else !p && _ !== null && pe < _.length && (Dt(e, pe), _.length = pe);
    if (tn() && be !== null && !Te && _ !== null && (e.f & (ne | Ie | se)) === 0)
      for (m = 0; m < /** @type {Source[]} */
      be.length; m++)
        An(
          be[m],
          /** @type {Effect} */
          e
        );
    if (n !== null && n !== e) {
      if (at++, n.deps !== null)
        for (let v = 0; v < r; v += 1)
          n.deps[v].rv = at;
      if (t !== null)
        for (const v of t)
          v.rv = at;
      be !== null && (i === null ? i = be : i.push(.../** @type {Source[]} */
      be));
    }
    return (e.f & Ze) !== 0 && (e.f ^= Ze), h;
  } catch (v) {
    return bi(v);
  } finally {
    e.f ^= _r, ve = t, pe = r, be = i, P = n, Ee = a, Jt(s), Te = l, ot = o;
  }
}
function Ji(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var i = Yn.call(r, e);
    if (i !== -1) {
      var n = r.length - 1;
      n === 0 ? r = t.reactions = null : (r[i] = r[n], r.pop());
    }
  }
  if (r === null && (t.f & ne) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ve === null || !mt.call(ve, t))) {
    var a = (
      /** @type {Derived} */
      t
    );
    (a.f & Ae) !== 0 && (a.f ^= Ae, a.f &= ~ft), xr(a), ji(a), Dt(a, 0);
  }
}
function Dt(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var i = t; i < r.length; i++)
      Ji(e, r[i]);
}
function yt(e) {
  var t = e.f;
  if ((t & Be) === 0) {
    Q(e, ee);
    var r = K, i = zt;
    K = e, zt = !0;
    try {
      (t & (He | Xr)) !== 0 ? Ui(e) : jr(e), hn(e);
      var n = En(e);
      e.teardown = typeof n == "function" ? n : null, e.wv = gn;
      var a;
      vr && pi && (e.f & se) !== 0 && e.deps;
    } finally {
      zt = i, K = r;
    }
  }
}
function c(e) {
  var t = e.f, r = (t & ne) !== 0;
  if (P !== null && !Te) {
    var i = K !== null && (K.f & Be) !== 0;
    if (!i && (Ee === null || !mt.call(Ee, e))) {
      var n = P.deps;
      if ((P.f & _r) !== 0)
        e.rv < at && (e.rv = at, ve === null && n !== null && n[pe] === e ? pe++ : ve === null ? ve = [e] : ve.push(e));
      else {
        (P.deps ??= []).push(e);
        var a = e.reactions;
        a === null ? e.reactions = [P] : mt.call(a, P) || a.push(P);
      }
    }
  }
  if (Qe && Xe.has(e))
    return Xe.get(e);
  if (r) {
    var s = (
      /** @type {Derived} */
      e
    );
    if (Qe) {
      var l = s.v;
      return ((s.f & ee) === 0 && s.reactions !== null || Sn(s)) && (l = Or(s)), Xe.set(s, l), l;
    }
    var o = (s.f & Ae) === 0 && !Te && P !== null && (zt || (P.f & Ae) !== 0), f = (s.f & It) === 0;
    Kt(s) && (o && (s.f |= Ae), ln(s)), o && !f && (fn(s), xn(s));
  }
  if (Oe?.has(e))
    return Oe.get(e);
  if ((e.f & Ze) !== 0)
    throw e.v;
  return e.v;
}
function xn(e) {
  if (e.f |= Ae, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & ne) !== 0 && (t.f & Ae) === 0 && (fn(
        /** @type {Derived} */
        t
      ), xn(
        /** @type {Derived} */
        t
      ));
}
function Sn(e) {
  if (e.v === te) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Xe.has(t) || (t.f & ne) !== 0 && Sn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Hi(e) {
  var t = Te;
  try {
    return Te = !0, e();
  } finally {
    Te = t;
  }
}
const kt = /* @__PURE__ */ Symbol("events"), Gi = /* @__PURE__ */ new Set(), Yi = /* @__PURE__ */ new Set();
function Wi(e, t, r, i = {}) {
  function n(a) {
    if (i.capture || Xi.call(t, a), !a.cancelBubble)
      return kr(() => r?.call(this, a));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ht(() => {
    t.addEventListener(e, n, i);
  }) : t.addEventListener(e, n, i), n;
}
function Zi(e, t, r, i, n) {
  var a = { capture: i, passive: n }, s = Wi(e, t, r, a);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Tr(() => {
    t.removeEventListener(e, s, a);
  });
}
function ce(e, t, r) {
  (t[kt] ??= {})[e] = r;
}
function et(e) {
  for (var t = 0; t < e.length; t++)
    Gi.add(e[t]);
  for (var r of Yi)
    r(e);
}
let zr = null;
function Xi(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), i = e.type, n = e.composedPath?.() || [], a = (
    /** @type {null | Element} */
    n[0] || e.target
  );
  zr = e;
  var s = 0, l = zr === e && e[kt];
  if (l) {
    var o = n.indexOf(l);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[kt] = t;
      return;
    }
    var f = n.indexOf(t);
    if (f === -1)
      return;
    o <= f && (s = o);
  }
  if (a = /** @type {Element} */
  n[s] || e.target, a !== t) {
    Wn(e, "currentTarget", {
      configurable: !0,
      get() {
        return a || r;
      }
    });
    var u = P, h = K;
    Ke(null), $e(null);
    try {
      for (var _, p = []; a !== null; ) {
        var m = a.assignedSlot || a.parentNode || /** @type {any} */
        a.host || null;
        try {
          var v = a[kt]?.[i];
          v != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === a) && v.call(a, e);
        } catch (d) {
          _ ? p.push(d) : _ = d;
        }
        if (e.cancelBubble || m === t || m === null)
          break;
        a = m;
      }
      if (_) {
        for (let d of p)
          queueMicrotask(() => {
            throw d;
          });
        throw _;
      }
    } finally {
      e[kt] = t, delete e.currentTarget, Ke(u), $e(h);
    }
  }
}
const Qi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function $i(e) {
  return (
    /** @type {string} */
    Qi?.createHTML(e) ?? e
  );
}
function ea(e, t = !1) {
  var r = Fi("template");
  return e = e.replaceAll("<!>", "<!---->"), r.innerHTML = t ? $i(e) : e, r.content;
}
function yr(e, t) {
  var r = (
    /** @type {Effect} */
    K
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function N(e, t) {
  var r = (t & Hn) !== 0, i = (t & Gn) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = ea(a ? e : "<!>" + e, !0), r || (n = /** @type {TemplateNode} */
    /* @__PURE__ */ Yt(n)));
    var s = (
      /** @type {TemplateNode} */
      i || Mi ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    if (r) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Yt(s)
      ), o = (
        /** @type {TemplateNode} */
        s.lastChild
      );
      yr(l, o);
    } else
      yr(s, s);
    return s;
  };
}
function re() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = _t();
  return e.append(t, r), yr(t, r), e;
}
function E(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function F(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
class Dr {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #t = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #o = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#o = r;
  }
  #s = () => {
    var t = (
      /** @type {Batch} */
      B
    );
    if (this.#t.has(t)) {
      var r = (
        /** @type {Key} */
        this.#t.get(t)
      ), i = this.#r.get(r);
      if (i)
        Pr(i), this.#n.delete(r);
      else {
        var n = this.#e.get(r);
        n && (this.#r.set(r, n.effect), this.#e.delete(r), n.fragment.lastChild.remove(), this.anchor.before(n.fragment), i = n.effect);
      }
      for (const [a, s] of this.#t) {
        if (this.#t.delete(a), a === t)
          break;
        const l = this.#e.get(s);
        l && (Je(l.effect), this.#e.delete(s));
      }
      for (const [a, s] of this.#r) {
        if (a === r || this.#n.has(a)) continue;
        const l = () => {
          if (Array.from(this.#t.values()).includes(a)) {
            var f = document.createDocumentFragment();
            zi(s, f), f.append(_t()), this.#e.set(a, { effect: s, fragment: f });
          } else
            Je(s);
          this.#n.delete(a), this.#r.delete(a);
        };
        this.#o || !i ? (this.#n.add(a), Nr(s, l, !1)) : l();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #i = (t) => {
    this.#t.delete(t);
    const r = Array.from(this.#t.values());
    for (const [i, n] of this.#e)
      r.includes(i) || (Je(n.effect), this.#e.delete(i));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var i = (
      /** @type {Batch} */
      B
    ), n = dn();
    if (r && !this.#r.has(t) && !this.#e.has(t))
      if (n) {
        var a = document.createDocumentFragment(), s = _t();
        a.append(s), this.#e.set(t, {
          effect: Pt(() => r(s)),
          fragment: a
        });
      } else
        this.#r.set(
          t,
          Pt(() => r(this.anchor))
        );
    if (this.#t.set(i, t), n) {
      for (const [l, o] of this.#r)
        l === t ? i.unskip_effect(o) : i.skip_effect(o);
      for (const [l, o] of this.#e)
        l === t ? i.unskip_effect(o.effect) : i.skip_effect(o.effect);
      i.oncommit(this.#s), i.ondiscard(this.#i);
    } else
      this.#s();
  }
}
function Mt(e, t, ...r) {
  var i = new Dr(e);
  er(() => {
    const n = t() ?? null;
    i.ensure(n, n && ((a) => n(a, ...r)));
  }, lt);
}
function H(e, t, r = !1) {
  var i = new Dr(e), n = r ? lt : 0;
  function a(s, l) {
    i.ensure(s, l);
  }
  er(() => {
    var s = !1;
    t((l, o = 0) => {
      s = !0, a(o, l);
    }), s || a(!1, null);
  }, n);
}
function ta(e, t) {
  return t;
}
function ra(e, t, r) {
  for (var i = [], n = t.length, a, s = t.length, l = 0; l < n; l++) {
    let h = t[l];
    Nr(
      h,
      () => {
        if (a) {
          if (a.pending.delete(h), a.done.add(h), a.pending.size === 0) {
            var _ = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            br(gr(a.done)), _.delete(a), _.size === 0 && (e.outrogroups = null);
          }
        } else
          s -= 1;
      },
      !1
    );
  }
  if (s === 0) {
    var o = i.length === 0 && r !== null;
    if (o) {
      var f = (
        /** @type {Element} */
        r
      ), u = (
        /** @type {Element} */
        f.parentNode
      );
      Ii(u), u.append(f), e.items.clear();
    }
    br(t, !o);
  } else
    a = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function br(e, t = !0) {
  for (var r = 0; r < e.length; r++)
    Je(e[r], t);
}
var Br;
function bt(e, t, r, i, n, a = null) {
  var s = e, l = /* @__PURE__ */ new Map(), o = (t & Gr) !== 0;
  if (o) {
    var f = (
      /** @type {Element} */
      e
    );
    s = f.appendChild(_t());
  }
  var u = null, h = /* @__PURE__ */ sn(() => {
    var w = r();
    return Zt(w) ? w : w == null ? [] : gr(w);
  }), _, p = !0;
  function m() {
    d.fallback = u, na(d, _, s, t, i), u !== null && (_.length === 0 ? (u.f & qe) === 0 ? Pr(u) : (u.f ^= qe, Tt(u, null, s)) : Nr(u, () => {
      u = null;
    }));
  }
  var v = er(() => {
    _ = /** @type {V[]} */
    c(h);
    for (var w = _.length, x = /* @__PURE__ */ new Set(), D = (
      /** @type {Batch} */
      B
    ), I = dn(), L = 0; L < w; L += 1) {
      var $ = _[L], V = i($, L), G = p ? null : l.get(V);
      G ? (G.v && Nt(G.v, $), G.i && Nt(G.i, L), I && D.unskip_effect(G.e)) : (G = ia(
        l,
        p ? s : Br ??= _t(),
        $,
        V,
        L,
        n,
        t,
        r
      ), p || (G.e.f |= qe), l.set(V, G)), x.add(V);
    }
    if (w === 0 && a && !u && (p ? u = Pt(() => a(s)) : (u = Pt(() => a(Br ??= _t())), u.f |= qe)), w > x.size && ai(), !p)
      if (I) {
        for (const [xe, W] of l)
          x.has(xe) || D.skip_effect(W.e);
        D.oncommit(m), D.ondiscard(() => {
        });
      } else
        m();
    c(h);
  }), d = { effect: v, items: l, outrogroups: null, fallback: u };
  p = !1;
}
function St(e) {
  for (; e !== null && (e.f & je) === 0; )
    e = e.next;
  return e;
}
function na(e, t, r, i, n) {
  var a = (i & Vn) !== 0, s = t.length, l = e.items, o = St(e.effect.first), f, u = null, h, _ = [], p = [], m, v, d, w;
  if (a)
    for (w = 0; w < s; w += 1)
      m = t[w], v = n(m, w), d = /** @type {EachItem} */
      l.get(v).e, (d.f & qe) === 0 && (d.nodes?.a?.measure(), (h ??= /* @__PURE__ */ new Set()).add(d));
  for (w = 0; w < s; w += 1) {
    if (m = t[w], v = n(m, w), d = /** @type {EachItem} */
    l.get(v).e, e.outrogroups !== null)
      for (const W of e.outrogroups)
        W.pending.delete(d), W.done.delete(d);
    if ((d.f & qe) !== 0)
      if (d.f ^= qe, d === o)
        Tt(d, null, r);
      else {
        var x = u ? u.next : o;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), Ye(e, u, d), Ye(e, d, x), Tt(d, x, r), u = d, _ = [], p = [], o = St(u.next);
        continue;
      }
    if ((d.f & me) !== 0 && (Pr(d), a && (d.nodes?.a?.unfix(), (h ??= /* @__PURE__ */ new Set()).delete(d))), d !== o) {
      if (f !== void 0 && f.has(d)) {
        if (_.length < p.length) {
          var D = p[0], I;
          u = D.prev;
          var L = _[0], $ = _[_.length - 1];
          for (I = 0; I < _.length; I += 1)
            Tt(_[I], D, r);
          for (I = 0; I < p.length; I += 1)
            f.delete(p[I]);
          Ye(e, L.prev, $.next), Ye(e, u, L), Ye(e, $, D), o = D, u = $, w -= 1, _ = [], p = [];
        } else
          f.delete(d), Tt(d, o, r), Ye(e, d.prev, d.next), Ye(e, d, u === null ? e.effect.first : u.next), Ye(e, u, d), u = d;
        continue;
      }
      for (_ = [], p = []; o !== null && o !== d; )
        (f ??= /* @__PURE__ */ new Set()).add(o), p.push(o), o = St(o.next);
      if (o === null)
        continue;
    }
    (d.f & qe) === 0 && _.push(d), u = d, o = St(d.next);
  }
  if (e.outrogroups !== null) {
    for (const W of e.outrogroups)
      W.pending.size === 0 && (br(gr(W.done)), e.outrogroups?.delete(W));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (o !== null || f !== void 0) {
    var V = [];
    if (f !== void 0)
      for (d of f)
        (d.f & me) === 0 && V.push(d);
    for (; o !== null; )
      (o.f & me) === 0 && o !== e.fallback && V.push(o), o = St(o.next);
    var G = V.length;
    if (G > 0) {
      var xe = (i & Gr) !== 0 && s === 0 ? r : null;
      if (a) {
        for (w = 0; w < G; w += 1)
          V[w].nodes?.a?.measure();
        for (w = 0; w < G; w += 1)
          V[w].nodes?.a?.fix();
      }
      ra(e, V, xe);
    }
  }
  a && Ht(() => {
    if (h !== void 0)
      for (d of h)
        d.nodes?.a?.apply();
  });
}
function ia(e, t, r, i, n, a, s, l) {
  var o = (s & Kn) !== 0 ? (s & Un) === 0 ? /* @__PURE__ */ Ni(r, !1, !1) : jt(r) : null, f = (s & Ln) !== 0 ? jt(n) : null;
  return {
    v: o,
    i: f,
    e: Pt(() => (a(t, o ?? r, f ?? n, l), () => {
      e.delete(i);
    }))
  };
}
function Tt(e, t, r) {
  if (e.nodes)
    for (var i = e.nodes.start, n = e.nodes.end, a = t && (t.f & qe) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; i !== null; ) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ft(i)
      );
      if (a.before(i), i === n)
        return;
      i = s;
    }
}
function Ye(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function Ve(e, t, r) {
  var i = new Dr(e);
  er(() => {
    var n = t() ?? null;
    i.ensure(n, n && ((a) => r(a, n)));
  }, lt);
}
function Mr(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Zt(t))
      return _i();
    for (var i of e.options)
      i.selected = t.includes(Jr(i));
    return;
  }
  for (i of e.options) {
    var n = Jr(i);
    if (Di(n, t)) {
      i.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function On(e) {
  var t = new MutationObserver(() => {
    Mr(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Tr(() => {
    t.disconnect();
  });
}
function Jr(e) {
  return "__value" in e ? e.__value : e.value;
}
const aa = /* @__PURE__ */ Symbol("is custom element"), oa = /* @__PURE__ */ Symbol("is html"), sa = ni ? "progress" : "PROGRESS";
function Ct(e, t) {
  var r = Cr(e);
  r.value === (r.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== sa) || (e.value = t ?? "");
}
function la(e, t) {
  var r = Cr(e);
  r.checked !== (r.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function st(e, t, r, i) {
  var n = Cr(e);
  n[t] !== (n[t] = r) && (t === "loading" && (e[ri] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && fa(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Cr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [aa]: e.nodeName.includes("-"),
      [oa]: e.namespaceURI === Yr
    }
  );
}
var Hr = /* @__PURE__ */ new Map();
function fa(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Hr.get(t);
  if (r) return r;
  Hr.set(t, r = []);
  for (var i, n = e, a = Element.prototype; a !== n; ) {
    i = Zn(n);
    for (var s in i)
      i[s].set && r.push(s);
    n = wr(n);
  }
  return r;
}
let Vt = !1;
function ua(e) {
  var t = Vt;
  try {
    return Vt = !1, [e(), Vt];
  } finally {
    Vt = t;
  }
}
function cr(e, t, r, i) {
  var n = (r & Bn) !== 0, a = (r & Jn) !== 0, s = (
    /** @type {V} */
    i
  ), l = !0, o = () => (l && (l = !1, s = a ? Hi(
    /** @type {() => V} */
    i
  ) : (
    /** @type {V} */
    i
  )), s), f;
  if (n) {
    var u = vt in e || ti in e;
    f = Ut(e, t)?.set ?? (u && t in e ? (x) => e[t] = x : void 0);
  }
  var h, _ = !1;
  n ? [h, _] = ua(() => (
    /** @type {V} */
    e[t]
  )) : h = /** @type {V} */
  e[t], h === void 0 && i !== void 0 && (h = o(), f && (ui(), f(h)));
  var p;
  if (p = () => {
    var x = (
      /** @type {V} */
      e[t]
    );
    return x === void 0 ? o() : (l = !0, x);
  }, (r & zn) === 0)
    return p;
  if (f) {
    var m = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(x, D) {
        return arguments.length > 0 ? ((!D || m || _) && f(D ? p() : x), x) : p();
      })
    );
  }
  var v = !1, d = ((r & qn) !== 0 ? $t : sn)(() => (v = !1, p()));
  n && c(d);
  var w = (
    /** @type {Effect} */
    K
  );
  return (
    /** @type {() => V} */
    (function(x, D) {
      if (arguments.length > 0) {
        const I = D ? c(d) : n ? ke(x) : x;
        return X(d, I), v = !0, s !== void 0 && (s = I), x;
      }
      return Qe && v || (w.f & Be) !== 0 ? d.v : c(d);
    })
  );
}
function Rt(e) {
  const t = e?.type ?? "object";
  return t === "string" ? e.format === "date-time" ? "date" : "string" : t === "number" ? "number" : t === "integer" ? "integer" : t === "boolean" ? "boolean" : t === "object" ? "object" : t === "array" ? "array" : "unknown";
}
function Wt(e) {
  if (e === null) return "null:";
  const t = typeof e;
  if (t === "object")
    try {
      return `object:${JSON.stringify(e)}`;
    } catch {
      return "object:[unserializable]";
    }
  return t === "undefined" ? "undefined:" : t === "number" && Number.isNaN(e) ? "number:NaN" : `${t}:${String(e)}`;
}
function kn(e) {
  if (e === null) return "null";
  const t = typeof e;
  if (t === "string") return e;
  if (t === "number" || t === "boolean") return String(e);
  if (t === "undefined") return "undefined";
  if (t === "object")
    try {
      return JSON.stringify(e);
    } catch {
      return "[object]";
    }
  return String(e);
}
function ca(e) {
  const t = Array.isArray(e?.anyOf) ? e.anyOf : Array.isArray(e?.oneOf) ? e.oneOf : null;
  if (!t || t.length === 0)
    throw new Error("anyOf/oneOf must contain at least one variant");
  let r;
  const i = [], n = /* @__PURE__ */ new Set();
  for (const a of t) {
    if (Rt(a) !== "object")
      throw new Error("Only object variants are supported for discriminated unions");
    const s = a?.properties;
    if (!s)
      throw new Error("Discriminated union variants must define properties");
    const l = Object.entries(s).filter(
      ([, _]) => _?.type === "string" && typeof _?.const == "string"
    );
    if (l.length === 0)
      throw new Error("Discriminated union variants must have a string const property");
    if (l.length > 1)
      throw new Error(
        "Discriminated union variants must have exactly one string const property"
      );
    const [o, f] = l[0];
    if (r && o !== r)
      throw new Error(
        "Discriminated union variants must share the same discriminant key"
      );
    r ??= o;
    const u = f.const;
    if (n.has(u))
      throw new Error(`Duplicate discriminant value "${u}" is not allowed`);
    n.add(u);
    const h = ht("__variant__", a, !0);
    i.push({
      value: u,
      label: u,
      field: h
    });
  }
  if (!r)
    throw new Error("Unable to determine discriminant key for anyOf union");
  return {
    discriminatorKey: r,
    options: i
  };
}
function Tn(e) {
  const t = e?.properties ?? {}, r = new Set(e?.required ?? []);
  return Object.entries(t).map(([i, n]) => ht(i, n, r.has(i)));
}
function da(e) {
  const t = Array.isArray(e?.enum) ? e.enum : void 0;
  if (t?.length)
    return t.map((r) => ({
      value: r,
      key: Wt(r),
      label: kn(r)
    }));
}
function va(e) {
  const t = e?.form;
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const r = {};
  return (t.widget === "input" || t.widget === "textarea") && (r.widget = t.widget), typeof t.label == "string" && (r.label = t.label), typeof t.placeholder == "string" && (r.placeholder = t.placeholder), t.reorderable === !0 && (r.reorderable = !0), Object.keys(r).length ? r : void 0;
}
function jn(e) {
  return e == null || typeof e != "object" ? e : structuredClone(e);
}
function ht(e, t, r = !1) {
  const i = Rt(t), n = {
    key: e,
    type: i,
    title: t?.title,
    description: t?.description,
    defaultValue: t?.default !== void 0 ? jn(t.default) : void 0,
    form: va(t),
    required: r,
    enumValues: da(t)
  };
  if ((Array.isArray(t?.anyOf) ? t.anyOf : Array.isArray(t?.oneOf) ? t.oneOf : void 0)?.length && (n.discriminatedUnion = ca(t)), i === "object") {
    n.children = Tn(t);
    const s = t?.additionalProperties;
    s && s !== !1 && (n.additionalProperties = s === !0 ? { allowAny: !0 } : {
      allowAny: !0,
      schema: ht("__additional__", s)
    });
  } else if (i === "array") {
    const s = t?.items;
    Array.isArray(s) ? s.length > 0 && (n.items = ht("__item__", s[0])) : s && (n.items = ht("__item__", s));
  }
  return n;
}
function _a(e) {
  return Rt(e) !== "object" ? { fields: [ht("value", e, !0)] } : {
    fields: Tn(e)
  };
}
function ha(e) {
  return e.type !== "string" ? "input" : e.form?.widget === "textarea" ? "textarea" : "input";
}
function tr(e) {
  return typeof e.form?.placeholder == "string" ? e.form.placeholder : void 0;
}
function tt(e) {
  return typeof e.form?.label == "string" && e.form.label.trim().length > 0 ? e.form.label : e.title ? e.title : e.key === "__item__" ? "Item" : e.key;
}
function pa(e) {
  return e.type === "object" && e.form?.reorderable === !0;
}
function pt(e) {
  if (e.defaultValue !== void 0)
    return jn(e.defaultValue);
  if (e.enumValues?.length) {
    const t = e.enumValues[0].value;
    return t !== null && typeof t == "object" ? structuredClone(t) : t;
  }
  switch (e.type) {
    case "string":
      return "";
    case "number":
    case "integer":
      return null;
    case "boolean":
      return !1;
    case "date":
      return "";
    case "object": {
      const t = {};
      if (e.discriminatedUnion && e.discriminatedUnion.options.length > 0) {
        const r = e.discriminatedUnion.options[0], i = e.discriminatedUnion.discriminatorKey;
        t[i] = r.value;
        for (const n of r.field.children ?? [])
          n.key !== i && (t[n.key] = pt(n));
        return t;
      }
      for (const r of e.children ?? [])
        t[r.key] = pt(r);
      return t;
    }
    case "array":
      return [];
    default:
      return null;
  }
}
function dr(e, t) {
  if (!e.discriminatedUnion)
    return {
      children: e.children ?? [],
      additionalProperties: e.additionalProperties
    };
  const r = e.discriminatedUnion, i = t && typeof t == "object" && !Array.isArray(t) ? t[r.discriminatorKey] : void 0, n = r.options.find((s) => s.value === i) ?? r.options[0];
  return {
    children: n?.field.children?.filter((s) => s.key !== r.discriminatorKey) ?? [],
    additionalProperties: n?.field.additionalProperties,
    discriminatorKey: r.discriminatorKey,
    activeOption: n
  };
}
function go(e, t) {
  return {
    ...e,
    key: t
  };
}
function Ot(e, t, r) {
  if (!t.length) throw new Error("unreachable");
  let i = e;
  for (let a = 0; a < t.length - 1; a++) {
    const s = t[a], l = typeof s == "number" ? String(s) : s;
    if (typeof i[l] != "object" || i[l] === null) {
      const o = typeof t[a + 1] == "number";
      i[l] = o ? [] : {};
    }
    i = i[l];
  }
  const n = t[t.length - 1];
  i[typeof n == "number" ? String(n) : n] = r;
}
function We(e, ...t) {
  return t.reduce(
    (r, i) => r?.[typeof i == "number" ? String(i) : i],
    e
  );
}
function ma(e, ...t) {
  const r = t.slice(0, -1), i = t[t.length - 1];
  let n = e;
  for (const s of r) {
    const l = typeof s == "number" ? String(s) : s;
    (typeof n[l] != "object" || n[l] === null) && (n[l] = {}), n = n[l];
  }
  const a = typeof i == "number" ? String(i) : i;
  return Array.isArray(n[a]) || (n[a] = []), n[a];
}
function ya(e, t, r) {
  const i = ma(e, ...t);
  if (!r.items) {
    i.push(null);
    return;
  }
  i.push(pt(r.items));
}
function ba(e, t, r) {
  const i = We(e, ...t);
  Array.isArray(i) && i.splice(r, 1);
}
function ga(e) {
  if (e == null || e === "") return "";
  const t = Number(e);
  return Number.isFinite(t) ? String(t) : "";
}
function wa(e) {
  if (e.trim() === "") return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function Aa(e) {
  if (!e) return "";
  const t = e instanceof Date ? e : new Date(e);
  if (Number.isNaN(t.getTime())) return "";
  const r = (i) => String(i).padStart(2, "0");
  return `${t.getFullYear()}-${r(t.getMonth() + 1)}-${r(t.getDate())}T${r(t.getHours())}:${r(t.getMinutes())}`;
}
function Ea(e) {
  const t = e.trim();
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}
function xa(e, t) {
  const r = [];
  function i(l) {
    if (Array.isArray(l?.anyOf)) return l.anyOf;
    if (Array.isArray(l?.oneOf)) return l.oneOf;
  }
  function n(l, o, f) {
    const u = Array.isArray(l?.enum) ? l.enum : void 0;
    if (!u || o === void 0) return;
    u.some((_) => Wt(_) === Wt(o)) || r.push(
      `${f || "(root)"} should be one of ${u.map(kn).join(", ")}`
    );
  }
  function a(l, o) {
    const f = i(l);
    if (!f || f.length === 0 || o == null || typeof o != "object" || Array.isArray(o))
      return;
    let u;
    for (const h of f) {
      if (Rt(h) !== "object")
        throw new Error("Only object variants are supported for discriminated unions");
      const _ = h?.properties;
      if (!_)
        throw new Error("Discriminated union variants must define properties");
      const p = Object.entries(_).filter(
        ([, w]) => w?.type === "string" && typeof w?.const == "string"
      );
      if (p.length !== 1)
        throw new Error(
          "Discriminated union variants must have exactly one string const property"
        );
      const [m, v] = p[0];
      if (u && m !== u)
        throw new Error("Discriminated union variants must share the same discriminant key");
      u ??= m;
      const d = v.const;
      if (o[m] === d) return h;
    }
  }
  function s(l, o, f) {
    const u = Rt(l);
    if (u === "object") {
      if (o == null || typeof o != "object" || Array.isArray(o)) {
        r.push(`${f || "(root)"} should be an object`);
        return;
      }
      const h = l.properties ?? {}, _ = new Set(l.required ?? []);
      for (const v of _)
        v in o || r.push(`${f ? f + "." : ""}${v} is required`);
      for (const [v, d] of Object.entries(h))
        v in o && s(d, o[v], f ? `${f}.${v}` : v);
      const p = l?.additionalProperties;
      if (p === !1)
        for (const v of Object.keys(o))
          v in h || r.push(`${f ? f + "." : ""}${v} is not allowed`);
      else if (p && p !== !0 && typeof p == "object")
        for (const [v, d] of Object.entries(o))
          v in h || s(p, d, f ? `${f}.${v}` : v);
      if (i(l)?.length) {
        const v = a(l, o);
        if (!v) {
          r.push(`${f || "(root)"} did not match any union variant`);
          return;
        }
        s(v, o, f);
        return;
      }
      n(l, o, f);
      return;
    }
    if (u === "string") {
      o != null && typeof o != "string" ? r.push(`${f || "(root)"} should be a string`) : n(l, o, f);
      return;
    }
    if (u === "date") {
      if (o != null) {
        const h = o instanceof Date ? o : new Date(o);
        Number.isNaN(h.getTime()) && r.push(`${f || "(root)"} should be a valid date-time`);
      }
      n(l, o, f);
      return;
    }
    if (u === "number" || u === "integer") {
      if (o != null && typeof o != "number") {
        r.push(`${f || "(root)"} should be a number`);
        return;
      }
      if (u === "integer" && o != null && !Number.isInteger(o)) {
        r.push(`${f || "(root)"} should be an integer`);
        return;
      }
      n(l, o, f);
      return;
    }
    if (u === "boolean") {
      if (o != null && typeof o != "boolean") {
        r.push(`${f || "(root)"} should be a boolean`);
        return;
      }
      n(l, o, f);
      return;
    }
    if (u === "array") {
      if (!Array.isArray(o)) {
        r.push(`${f || "(root)"} should be an array`);
        return;
      }
      const h = l.items;
      h && (Array.isArray(h) && h.length > 0 ? o.forEach((_, p) => s(h[0], _, `${f}[${p}]`)) : Array.isArray(h) || o.forEach((_, p) => s(h, _, `${f}[${p}]`))), n(l, o, f);
      return;
    }
    n(l, o, f);
  }
  return s(e, t, ""), r.length ? { ok: !1, errors: r } : { ok: !0 };
}
var Sa = /* @__PURE__ */ N('<h3 class="af-title svelte-18268fr"> </h3>'), Oa = /* @__PURE__ */ N("<p> </p>"), ka = /* @__PURE__ */ N('<div class="af-errors svelte-18268fr"></div>'), Ta = /* @__PURE__ */ N('<form class="af-form svelte-18268fr"><!> <!> <!> <div class="af-actions svelte-18268fr"><button type="button" class="af-btn af-btn-secondary svelte-18268fr"> </button> <button type="submit" class="af-btn af-btn-primary svelte-18268fr"> </button></div></form>');
function ja(e, t) {
  Ne(t, !0);
  var r = Ta(), i = T(r);
  {
    var n = (p) => {
      var m = Sa(), v = T(m);
      R(() => F(v, t.title)), E(p, m);
    };
    H(i, (p) => {
      t.title && p(n);
    });
  }
  var a = M(i, 2);
  Mt(a, () => t.children);
  var s = M(a, 2);
  {
    var l = (p) => {
      var m = ka();
      bt(m, 23, () => t.errors, (v, d) => `${d}-${v}`, (v, d) => {
        var w = Oa(), x = T(w);
        R(() => F(x, c(d))), E(v, w);
      }), E(p, m);
    };
    H(s, (p) => {
      t.errors.length && p(l);
    });
  }
  var o = M(s, 2), f = T(o), u = T(f), h = M(f, 2), _ = T(h);
  R(() => {
    F(u, t.cancelLabel), F(_, t.submitLabel);
  }), Zi("submit", r, (p) => {
    p.preventDefault(), t.onsubmit();
  }), ce("click", f, function(...p) {
    t.oncancel?.apply(this, p);
  }), E(e, r), Pe();
}
et(["click"]);
var Na = /* @__PURE__ */ N('<p class="af-help svelte-yr0bu8"> </p>'), Pa = /* @__PURE__ */ N('<textarea class="af-input svelte-yr0bu8"></textarea>'), Da = /* @__PURE__ */ N('<input class="af-input svelte-yr0bu8" type="text"/>'), Ma = /* @__PURE__ */ N('<p class="af-label svelte-yr0bu8"> </p> <!> <!>', 1);
function Ca(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field)), i = /* @__PURE__ */ S(() => ha(t.field)), n = /* @__PURE__ */ S(() => tr(t.field));
  var a = Ma(), s = C(a), l = T(s), o = M(s, 2);
  {
    var f = (p) => {
      var m = Na(), v = T(m);
      R(() => F(v, t.field.description)), E(p, m);
    };
    H(o, (p) => {
      t.field.description && p(f);
    });
  }
  var u = M(o, 2);
  {
    var h = (p) => {
      var m = Pa();
      st(m, "rows", 3), R(() => {
        Ct(m, t.value ?? ""), st(m, "placeholder", c(n));
      }), ce("input", m, (v) => t.onchange(v.currentTarget.value)), E(p, m);
    }, _ = (p) => {
      var m = Da();
      R(() => {
        Ct(m, t.value ?? ""), st(m, "placeholder", c(n));
      }), ce("input", m, (v) => t.onchange(v.currentTarget.value)), E(p, m);
    };
    H(u, (p) => {
      c(i) === "textarea" ? p(h) : p(_, !1);
    });
  }
  R(() => F(l, c(r))), E(e, a), Pe();
}
et(["input"]);
var Ra = /* @__PURE__ */ N('<p class="af-help svelte-1cde0jg"> </p>'), Ia = /* @__PURE__ */ N('<p class="af-label svelte-1cde0jg"> </p> <!> <input class="af-input svelte-1cde0jg" type="number"/>', 1);
function Fa(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field)), i = /* @__PURE__ */ S(() => tr(t.field));
  var n = Ia(), a = C(n), s = T(a), l = M(a, 2);
  {
    var o = (u) => {
      var h = Ra(), _ = T(h);
      R(() => F(_, t.field.description)), E(u, h);
    };
    H(l, (u) => {
      t.field.description && u(o);
    });
  }
  var f = M(l, 2);
  R(
    (u) => {
      F(s, c(r)), st(f, "step", t.field.type === "integer" ? 1 : "any"), Ct(f, u), st(f, "placeholder", c(i));
    },
    [() => ga(t.value)]
  ), ce("input", f, (u) => {
    const h = wa(u.currentTarget.value);
    t.onchange(t.field.type === "integer" && h != null ? Math.trunc(h) : h);
  }), E(e, n), Pe();
}
et(["input"]);
var Ka = /* @__PURE__ */ N('<p class="af-help svelte-1onbcyh"> </p>'), La = /* @__PURE__ */ N('<label class="af-checkbox-row svelte-1onbcyh"><input type="checkbox"/> <span> </span></label> <!>', 1);
function Va(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field));
  var i = La(), n = C(i), a = T(n), s = M(a, 2), l = T(s), o = M(n, 2);
  {
    var f = (u) => {
      var h = Ka(), _ = T(h);
      R(() => F(_, t.field.description)), E(u, h);
    };
    H(o, (u) => {
      t.field.description && u(f);
    });
  }
  R(() => {
    la(a, !!t.value), F(l, c(r));
  }), ce("input", a, (u) => t.onchange(u.currentTarget.checked)), E(e, i), Pe();
}
et(["input"]);
var Ua = /* @__PURE__ */ N('<p class="af-help svelte-6rq2q9"> </p>'), qa = /* @__PURE__ */ N('<p class="af-label svelte-6rq2q9"> </p> <!> <input class="af-input svelte-6rq2q9" type="datetime-local"/>', 1);
function za(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field)), i = /* @__PURE__ */ S(() => tr(t.field));
  var n = qa(), a = C(n), s = T(a), l = M(a, 2);
  {
    var o = (u) => {
      var h = Ua(), _ = T(h);
      R(() => F(_, t.field.description)), E(u, h);
    };
    H(l, (u) => {
      t.field.description && u(o);
    });
  }
  var f = M(l, 2);
  R(
    (u) => {
      F(s, c(r)), Ct(f, u), st(f, "placeholder", c(i));
    },
    [() => Aa(t.value)]
  ), ce("input", f, (u) => t.onchange(new Date(u.currentTarget.value))), E(e, n), Pe();
}
et(["input"]);
var Ba = /* @__PURE__ */ N('<p class="af-help svelte-5p4vbg"> </p>'), Ja = /* @__PURE__ */ N('<option disabled=""> </option>'), Ha = /* @__PURE__ */ N("<option> </option>"), Ga = /* @__PURE__ */ N('<p class="af-label svelte-5p4vbg"> </p> <!> <select class="af-input svelte-5p4vbg"><!><!></select>', 1);
function Ya(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field)), i = /* @__PURE__ */ S(() => tr(t.field) ?? "Select an option");
  var n = Ga(), a = C(n), s = T(a), l = M(a, 2);
  {
    var o = (m) => {
      var v = Ba(), d = T(v);
      R(() => F(d, t.field.description)), E(m, v);
    };
    H(l, (m) => {
      t.field.description && m(o);
    });
  }
  var f = M(l, 2), u = T(f);
  {
    var h = (m) => {
      var v = Ja(), d = T(v);
      v.value = v.__value = "", R(() => F(d, c(i))), E(m, v);
    };
    H(u, (m) => {
      t.selectedKey === "" && m(h);
    });
  }
  var _ = M(u);
  bt(_, 17, () => t.options, (m) => m.key, (m, v) => {
    var d = Ha(), w = T(d), x = {};
    R(() => {
      F(w, c(v).label), x !== (x = c(v).key) && (d.value = (d.__value = c(v).key) ?? "");
    }), E(m, d);
  });
  var p;
  On(f), R(() => {
    F(s, c(r)), p !== (p = t.selectedKey) && (f.value = (f.__value = t.selectedKey) ?? "", Mr(f, t.selectedKey));
  }), ce("input", f, (m) => {
    const v = m.currentTarget.value;
    if (!v) return;
    const d = t.options.find((x) => x.key === v);
    if (!d) return;
    const w = d.value !== null && typeof d.value == "object" ? structuredClone(d.value) : d.value;
    t.onchange(w);
  }), E(e, n), Pe();
}
et(["input"]);
var Wa = /* @__PURE__ */ N('<button type="button" class="af-btn af-btn-secondary svelte-1c6lbe6">+ Property</button>'), Za = /* @__PURE__ */ N('<p class="af-help svelte-1c6lbe6"> </p>'), Xa = /* @__PURE__ */ N("<option> </option>"), Qa = /* @__PURE__ */ N('<p class="af-help svelte-1c6lbe6"> </p> <select class="af-input svelte-1c6lbe6"></select>', 1), $a = /* @__PURE__ */ N('<button type="button" class="af-btn af-btn-secondary svelte-1c6lbe6">Up</button> <button type="button" class="af-btn af-btn-secondary svelte-1c6lbe6">Down</button>', 1), eo = /* @__PURE__ */ N('<button type="button" class="af-btn af-btn-danger svelte-1c6lbe6">Remove</button>'), to = /* @__PURE__ */ N('<div class="af-move-row svelte-1c6lbe6"><!> <!></div>'), ro = /* @__PURE__ */ N('<p class="af-label svelte-1c6lbe6"> </p> <textarea class="af-input svelte-1c6lbe6"></textarea>', 1), no = /* @__PURE__ */ N('<div class="af-nested svelte-1c6lbe6"><!> <!></div>'), io = /* @__PURE__ */ N('<div class="af-label-row svelte-1c6lbe6"><p class="af-label svelte-1c6lbe6"> </p> <!></div> <!> <!> <!>', 1);
function ao(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field)), i = /* @__PURE__ */ S(() => t.value && typeof t.value == "object" && !Array.isArray(t.value) ? t.value : {});
  var n = io(), a = C(n), s = T(a), l = T(s), o = M(s, 2);
  {
    var f = (v) => {
      var d = Wa();
      ce("click", d, function(...w) {
        t.onAddProperty?.apply(this, w);
      }), E(v, d);
    };
    H(o, (v) => {
      t.onAddProperty && v(f);
    });
  }
  var u = M(a, 2);
  {
    var h = (v) => {
      var d = Za(), w = T(d);
      R(() => F(w, t.field.description)), E(v, d);
    };
    H(u, (v) => {
      t.field.description && v(h);
    });
  }
  var _ = M(u, 2);
  {
    var p = (v) => {
      var d = Qa(), w = C(d), x = T(w), D = M(w, 2);
      bt(D, 21, () => t.discriminator.options, (L) => L.value, (L, $) => {
        var V = Xa(), G = T(V), xe = {};
        R(() => {
          F(G, c($).label), xe !== (xe = c($).value) && (V.value = (V.__value = c($).value) ?? "");
        }), E(L, V);
      });
      var I;
      On(D), R(() => {
        F(x, t.discriminator.key), I !== (I = t.discriminator.value) && (D.value = (D.__value = t.discriminator.value) ?? "", Mr(D, t.discriminator.value));
      }), ce("input", D, (L) => t.discriminator.onchange(L.currentTarget.value)), E(v, d);
    };
    H(_, (v) => {
      t.discriminator && v(p);
    });
  }
  var m = M(_, 2);
  bt(m, 18, () => t.orderedKeys, (v) => v, (v, d, w) => {
    const x = /* @__PURE__ */ S(() => t.childLookup.get(d)), D = /* @__PURE__ */ S(() => c(w) === 0), I = /* @__PURE__ */ S(() => c(w) === t.orderedKeys.length - 1);
    var L = no(), $ = T(L);
    {
      var V = (le) => {
        var fe = to(), Le = T(fe);
        {
          var rt = (ye) => {
            var de = $a(), Se = C(de), De = M(Se, 2);
            R(() => {
              Se.disabled = c(D), De.disabled = c(I);
            }), ce("click", Se, () => t.onMoveKey?.(d, -1)), ce("click", De, () => t.onMoveKey?.(d, 1)), E(ye, de);
          };
          H(Le, (ye) => {
            t.onMoveKey && t.orderedKeys.length > 1 && ye(rt);
          });
        }
        var ut = M(Le, 2);
        {
          var At = (ye) => {
            var de = eo();
            ce("click", de, () => t.onRemoveProperty?.(d)), E(ye, de);
          };
          H(ut, (ye) => {
            c(x) || ye(At);
          });
        }
        E(le, fe);
      };
      H($, (le) => {
        (t.onMoveKey && t.orderedKeys.length > 1 || !c(x)) && le(V);
      });
    }
    var G = M($, 2);
    {
      var xe = (le) => {
        var fe = re(), Le = C(fe);
        Mt(Le, () => t.renderField, () => c(x), () => [c(x).key]), E(le, fe);
      }, W = (le) => {
        const fe = /* @__PURE__ */ S(() => c(i)[d]), Le = /* @__PURE__ */ S(() => (() => {
          if (typeof c(fe) == "string") return c(fe);
          if (c(fe) === void 0) return "";
          try {
            return JSON.stringify(c(fe), null, 2);
          } catch {
            return String(c(fe));
          }
        })());
        var rt = re(), ut = C(rt);
        {
          var At = (de) => {
            var Se = re(), De = C(Se);
            Mt(De, () => t.renderField, () => t.resolved.additionalProperties.schema, () => [d], () => ({ showLabel: !1 })), E(de, Se);
          }, ye = (de) => {
            var Se = ro(), De = C(Se), rr = T(De), Et = M(De, 2);
            st(Et, "rows", 3), R(() => {
              F(rr, d), Ct(Et, c(Le));
            }), ce("input", Et, (nr) => t.onchange({
              ...c(i),
              [d]: Ea(nr.currentTarget.value)
            })), E(de, Se);
          };
          H(ut, (de) => {
            t.resolved.additionalProperties?.schema ? de(At) : de(ye, !1);
          });
        }
        E(le, rt);
      };
      H(G, (le) => {
        c(x) ? le(xe) : le(W, !1);
      });
    }
    E(v, L);
  }), R(() => F(l, c(r))), E(e, n), Pe();
}
et(["click", "input"]);
var oo = /* @__PURE__ */ N('<p class="af-help svelte-zpgw7y"> </p>'), so = /* @__PURE__ */ N('<p class="af-help svelte-zpgw7y">Array item schema is not supported.</p>'), lo = /* @__PURE__ */ N('<div class="af-nested svelte-zpgw7y"><div class="af-move-row svelte-zpgw7y"><span class="af-help svelte-zpgw7y"></span> <button type="button" class="af-btn af-btn-danger svelte-zpgw7y">Remove</button></div> <!></div>'), fo = /* @__PURE__ */ N('<div class="af-label-row svelte-zpgw7y"><p class="af-label svelte-zpgw7y"> </p> <button type="button" class="af-btn af-btn-secondary svelte-zpgw7y">+ Item</button></div> <!> <!>', 1);
function uo(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field));
  var i = fo(), n = C(i), a = T(n), s = T(a), l = M(a, 2), o = M(n, 2);
  {
    var f = (p) => {
      var m = oo(), v = T(m);
      R(() => F(v, t.field.description)), E(p, m);
    };
    H(o, (p) => {
      t.field.description && p(f);
    });
  }
  var u = M(o, 2);
  {
    var h = (p) => {
      var m = so();
      E(p, m);
    }, _ = (p) => {
      var m = re(), v = C(m);
      bt(v, 17, () => Array(t.count), ta, (d, w, x) => {
        var D = lo(), I = T(D), L = T(I);
        L.textContent = `Item ${x + 1}`;
        var $ = M(L, 2), V = M(I, 2);
        Mt(V, () => t.renderField, () => t.items, () => [x], () => ({ showLabel: !1 })), ce("click", $, () => t.onRemove(x)), E(d, D);
      }), E(p, m);
    };
    H(u, (p) => {
      t.items ? p(_, !1) : p(h);
    });
  }
  R(() => F(s, c(r))), ce("click", l, function(...p) {
    t.onAdd?.apply(this, p);
  }), E(e, i), Pe();
}
et(["click"]);
var co = /* @__PURE__ */ N('<p class="af-help svelte-1a7i94f"> </p>'), vo = /* @__PURE__ */ N('<p class="af-label svelte-1a7i94f"> </p> <!> <p class="af-help svelte-1a7i94f"> </p>', 1);
function _o(e, t) {
  Ne(t, !0);
  const r = /* @__PURE__ */ S(() => tt(t.field));
  var i = vo(), n = C(i), a = T(n), s = M(n, 2);
  {
    var l = (u) => {
      var h = co(), _ = T(h);
      R(() => F(_, t.field.description)), E(u, h);
    };
    H(s, (u) => {
      t.field.description && u(l);
    });
  }
  var o = M(s, 2), f = T(o);
  R(() => {
    F(a, c(r)), F(f, `Field type "${t.field.type ?? ""}" is not supported.`);
  }), E(e, i), Pe();
}
const ho = {
  Form: ja,
  String: Ca,
  Number: Fa,
  Boolean: Va,
  Date: za,
  Enum: Ya,
  Object: ao,
  Array: uo,
  Unknown: _o
};
function wo(e) {
  return { toJSONSchema: e };
}
function po(e) {
  return "type" in e || "properties" in e || "items" in e || "enum" in e || "anyOf" in e || "oneOf" in e || "required" in e || "additionalProperties" in e || "format" in e || "$ref" in e;
}
const mo = {
  toJSONSchema(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw new Error(
        "jsonSchemaAdapter expected a JSON Schema object. Pass adapter for non-JSON schema libraries."
      );
    if (!po(e))
      throw new Error(
        "Invalid JSON Schema: missing core schema keys. If you are using Zod or another schema library, pass its adapter."
      );
    return e;
  }
};
function Ao(e, t) {
  Ne(t, !0);
  const r = (b, y = Re, g = Re, j = Re) => {
    const A = /* @__PURE__ */ S(() => We(c(v), ...g())), O = /* @__PURE__ */ S(() => y().enumValues && y().enumValues.length > 0 ? y().enumValues : null), k = /* @__PURE__ */ S(() => c(f));
    var Y = re(), ie = C(Y);
    {
      var ae = (q) => {
        const J = /* @__PURE__ */ S(() => c(A) === void 0 ? null : Wt(c(A))), oe = /* @__PURE__ */ S(() => c(J) && c(O).some((Z) => Z.key === c(J)) ? c(J) : "");
        var z = re(), ue = C(z);
        Ve(ue, () => c(k).Enum, (Z, nt) => {
          nt(Z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Me) => W(g(), Me),
            get options() {
              return c(O);
            },
            get selectedKey() {
              return c(oe);
            }
          });
        }), E(q, z);
      }, U = (q) => {
        const J = (Ge, or = Re, sr = Re, Ce = Re) => {
          {
            let xt = /* @__PURE__ */ S(() => [...g(), ...sr()]);
            r(Ge, or, () => c(xt), Ce);
          }
        }, oe = /* @__PURE__ */ S(() => c(A) && typeof c(A) == "object" && !Array.isArray(c(A)) ? c(A) : {}), z = /* @__PURE__ */ S(() => dr(y(), c(oe))), ue = /* @__PURE__ */ S(() => pa(y())), Z = /* @__PURE__ */ S(() => rt(g(), y(), c(oe), c(z).children, c(z).discriminatorKey ? [c(z).discriminatorKey] : [])), nt = /* @__PURE__ */ S(() => new Map(c(z).children.map((Ge) => [Ge.key, Ge])));
        var Me = re(), ar = C(Me);
        {
          let Ge = /* @__PURE__ */ S(() => c(z).additionalProperties?.allowAny ? () => rr(g(), y(), c(z).additionalProperties) : void 0), or = /* @__PURE__ */ S(() => c(ue) ? (Ce, xt) => At(g(), y(), Ce, xt) : void 0), sr = /* @__PURE__ */ S(() => y().discriminatedUnion ? {
            key: y().discriminatedUnion.discriminatorKey,
            value: c(z).activeOption?.value ?? "",
            options: y().discriminatedUnion.options.map((Ce) => ({ value: Ce.value, label: Ce.label })),
            onchange: (Ce) => de(g(), y(), Ce)
          } : void 0);
          Ve(ar, () => c(k).Object, (Ce, xt) => {
            xt(Ce, {
              get field() {
                return y();
              },
              get value() {
                return c(A);
              },
              onchange: (lr) => W(g(), lr),
              get resolved() {
                return c(z);
              },
              get orderedKeys() {
                return c(Z);
              },
              get childLookup() {
                return c(nt);
              },
              get renderField() {
                return J;
              },
              get onAddProperty() {
                return c(Ge);
              },
              onRemoveProperty: (lr) => Et(g(), lr),
              get onMoveKey() {
                return c(or);
              },
              get discriminator() {
                return c(sr);
              }
            });
          });
        }
        E(q, Me);
      }, _e = (q) => {
        const J = (Z, nt = Re, Me = Re, ar = Re) => {
          {
            let Ge = /* @__PURE__ */ S(() => [...g(), ...Me()]);
            r(Z, nt, () => c(Ge), ar);
          }
        }, oe = /* @__PURE__ */ S(() => Array.isArray(c(A)) ? c(A) : []);
        var z = re(), ue = C(z);
        Ve(ue, () => c(k).Array, (Z, nt) => {
          nt(Z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Me) => W(g(), Me),
            get items() {
              return y().items;
            },
            get count() {
              return c(oe).length;
            },
            get renderField() {
              return J;
            },
            onAdd: () => Se(g(), y()),
            onRemove: (Me) => ba(c(v), g(), Me)
          });
        }), E(q, z);
      }, he = (q) => {
        var J = re(), oe = C(J);
        Ve(oe, () => c(k).Boolean, (z, ue) => {
          ue(z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Z) => W(g(), Z)
          });
        }), E(q, J);
      }, ir = (q) => {
        var J = re(), oe = C(J);
        Ve(oe, () => c(k).Number, (z, ue) => {
          ue(z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Z) => W(g(), Z)
          });
        }), E(q, J);
      }, Mn = (q) => {
        var J = re(), oe = C(J);
        Ve(oe, () => c(k).String, (z, ue) => {
          ue(z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Z) => W(g(), Z)
          });
        }), E(q, J);
      }, Cn = (q) => {
        var J = re(), oe = C(J);
        Ve(oe, () => c(k).Date, (z, ue) => {
          ue(z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Z) => W(g(), Z)
          });
        }), E(q, J);
      }, Rn = (q) => {
        var J = re(), oe = C(J);
        Ve(oe, () => c(k).Unknown, (z, ue) => {
          ue(z, {
            get field() {
              return y();
            },
            get value() {
              return c(A);
            },
            onchange: (Z) => W(g(), Z)
          });
        }), E(q, J);
      };
      H(ie, (q) => {
        c(O) ? q(ae) : y().type === "object" ? q(U, 1) : y().type === "array" ? q(_e, 2) : y().type === "boolean" ? q(he, 3) : y().type === "number" || y().type === "integer" ? q(ir, 4) : y().type === "string" ? q(Mn, 5) : y().type === "date" ? q(Cn, 6) : q(Rn, !1);
      });
    }
    E(b, Y);
  }, i = In();
  let n = cr(t, "data", 31, () => ke({})), a = cr(t, "submitLabel", 3, "Save"), s = cr(t, "cancelLabel", 3, "Cancel");
  const l = Ir("autoform-theme"), o = Ir("autoform-adapter"), f = /* @__PURE__ */ S(() => t.theme ?? l?.() ?? ho), u = /* @__PURE__ */ S(() => t.adapter ?? o?.() ?? mo);
  function h() {
    return { type: "object", properties: {} };
  }
  function _(b, y) {
    try {
      const g = b.toJSONSchema(y);
      return !g || typeof g != "object" || Array.isArray(g) ? h() : g;
    } catch {
      return h();
    }
  }
  const p = /* @__PURE__ */ S(() => _(c(u), t.schema)), m = /* @__PURE__ */ S(() => _a(c(p)).fields);
  let v = /* @__PURE__ */ we(ke(structuredClone(ct(n()) || {}))), d = /* @__PURE__ */ we(ke(structuredClone(ct(n()) || {}))), w = /* @__PURE__ */ we(ke([])), x = /* @__PURE__ */ we(ke(/* @__PURE__ */ new Map()));
  const D = /* @__PURE__ */ new Map();
  let I = !1, L = !1;
  function $(b, y) {
    return Object.prototype.hasOwnProperty.call(b, y);
  }
  function V(b, y) {
    if (!b || typeof b != "object" || Array.isArray(b)) return !1;
    const g = $(b, y.key), j = g ? b[y.key] : void 0;
    if (!g || j === void 0)
      return b[y.key] = pt(y), !0;
    if (y.type !== "object" || !j || typeof j != "object" || Array.isArray(j)) return !1;
    const A = j;
    let O = !1;
    if (y.discriminatedUnion) {
      const k = dr(y, A), Y = k.discriminatorKey;
      Y && A[Y] === void 0 && k.activeOption && (A[Y] = k.activeOption.value, O = !0);
      for (const ie of k.children)
        O = V(A, ie) || O;
      return O;
    }
    for (const k of y.children ?? [])
      O = V(A, k) || O;
    return O;
  }
  function G(b, y) {
    let g = !1;
    for (const j of y)
      g = V(b, j) || g;
    return g;
  }
  function xe() {
    const b = structuredClone(ct(c(v)) || {});
    return L = !0, n(b), b;
  }
  ur(() => {
    const b = structuredClone(ct(n()) || {});
    if (G(b, c(m)), L) {
      L = !1;
      return;
    }
    I = !0, X(v, b, !0), X(d, structuredClone(b), !0), X(x, /* @__PURE__ */ new Map(), !0), X(w, [], !0), queueMicrotask(() => {
      I = !1;
    });
  }), ur(() => {
    I || xe();
  }), ur(() => {
    G(c(v), c(m)), G(c(d), c(m));
  });
  function W(b, y) {
    Ot(c(v), b, y), ye(b.slice(0, -1));
  }
  function le(b) {
    return b.length ? b.map((y) => typeof y == "number" ? `[${y}]` : y).join(".") : "__root__";
  }
  function fe(b, y) {
    const g = le(b), j = c(x).get(g);
    if (j && j.length === y.length && j.every((O, k) => O === y[k]))
      return;
    const A = new Map(c(x));
    A.set(g, y), X(x, A, !0), D.delete(g);
  }
  function Le(b, y) {
    const g = le(b), j = D.get(g);
    j && j.length === y.length && j.every((A, O) => A === y[O]) || (D.set(g, y), queueMicrotask(() => {
      const A = D.get(g);
      A && (D.delete(g), fe(b, A));
    }));
  }
  function rt(b, y, g, j, A = []) {
    const O = le(b), k = j.map((he) => he.key), Y = new Set(A), ie = g && typeof g == "object" && !Array.isArray(g) ? Object.keys(g).filter((he) => !k.includes(he) && !Y.has(he)) : [], ae = [...k, ...ie], U = c(x).get(O);
    if (!U)
      return Le(b, ae), ae;
    const _e = U.filter((he) => ae.includes(he));
    for (const he of ae)
      _e.includes(he) || _e.push(he);
    return _e.length !== U.length || _e.some((he, ir) => he !== U[ir]) ? (Le(b, _e), _e) : U;
  }
  function ut(b, y) {
    if (!y.length) return;
    const g = We(c(v), ...b);
    if (!g || typeof g != "object" || Array.isArray(g)) return;
    const j = {};
    for (const A of y)
      A in g && (j[A] = g[A]);
    for (const A of Object.keys(g))
      y.includes(A) || (j[A] = g[A]);
    Ot(c(v), b, j);
  }
  function At(b, y, g, j) {
    const A = We(c(v), ...b), O = dr(y, A), k = rt(b, y, A, O.children, O.discriminatorKey ? [O.discriminatorKey] : []), Y = k.indexOf(g);
    if (Y === -1) return;
    const ie = Y + j;
    if (ie < 0 || ie >= k.length) return;
    const ae = k.slice();
    ae.splice(Y, 1), ae.splice(ie, 0, g), fe(b, ae), ut(b, ae);
  }
  function ye(b) {
    if (!b.length) return;
    const y = c(x).get(le(b));
    y && ut(b, y);
  }
  function de(b, y, g) {
    const j = y.discriminatedUnion;
    if (!j) return;
    const A = j.options.find((U) => U.value === g);
    if (!A) return;
    De(b);
    const O = We(c(v), ...b), k = j.discriminatorKey, Y = {};
    Y[k] = A.value;
    const ie = /* @__PURE__ */ new Set();
    for (const U of A.field.children ?? []) {
      if (ie.add(U.key), U.key === k) continue;
      const _e = O && Object.prototype.hasOwnProperty.call(O, U.key) ? O[U.key] : void 0;
      Y[U.key] = _e === void 0 ? pt(U) : _e;
    }
    if (O && typeof O == "object" && !Array.isArray(O))
      for (const [U, _e] of Object.entries(O))
        U !== k && (ie.has(U) || (Y[U] = _e));
    Ot(c(v), b, Y);
    const ae = (A.field.children ?? []).map((U) => U.key).filter((U) => U !== k);
    fe(b, ae), ye(b);
  }
  function Se(b, y) {
    ya(c(v), b, y);
  }
  function De(b) {
    const y = We(c(v), ...b);
    (y == null || typeof y != "object" || Array.isArray(y)) && Ot(c(v), b, {});
  }
  function rr(b, y, g) {
    const j = g ?? y.additionalProperties;
    if (!j?.allowAny) return;
    const A = prompt("Property name");
    if (!A) return;
    const O = A.trim();
    if (!O) return;
    De(b);
    const k = We(c(v), ...b);
    if (!k) return;
    if (O in k) {
      X(w, [`Property "${O}" already exists.`], !0);
      return;
    }
    const Y = j.schema ? pt(j.schema) : null;
    Ot(c(v), [...b, O], Y);
  }
  function Et(b, y) {
    const g = We(c(v), ...b);
    !g || typeof g != "object" || Array.isArray(g) || delete g[y];
  }
  function nr() {
    X(w, [], !0);
    const b = xa(c(p), c(v));
    if (!b.ok) {
      X(w, b.errors, !0), i("error", { errors: b.errors });
      return;
    }
    X(d, structuredClone(ct(c(v)) || {}), !0);
    const y = xe();
    i("submit", { data: structuredClone(y) });
  }
  function Nn() {
    X(v, structuredClone(ct(c(d)) || {}), !0), X(w, [], !0), i("cancel");
  }
  var Rr = re(), Pn = C(Rr);
  {
    var Dn = (b) => {
      const y = /* @__PURE__ */ S(() => c(f));
      var g = re(), j = C(g);
      {
        const A = (O) => {
          var k = re(), Y = C(k);
          bt(Y, 17, () => c(m), (ie) => ie.key, (ie, ae) => {
            r(ie, () => c(ae), () => [c(ae).key]);
          }), E(O, k);
        };
        Ve(j, () => c(y).Form, (O, k) => {
          k(O, {
            get title() {
              return t.title;
            },
            get errors() {
              return c(w);
            },
            get submitLabel() {
              return a();
            },
            get cancelLabel() {
              return s();
            },
            onsubmit: nr,
            oncancel: Nn,
            children: A,
            $$slots: { default: !0 }
          });
        });
      }
      E(b, g);
    };
    H(Pn, (b) => {
      b(Dn);
    });
  }
  E(e, Rr), Pe();
}
function Eo(e, t) {
  Ne(t, !0), Fr("autoform-theme", () => t.theme), Fr("autoform-adapter", () => t.adapter);
  var r = re(), i = C(r);
  Mt(i, () => t.children), E(e, r), Pe();
}
export {
  Ao as Autoform,
  Eo as AutoformProvider,
  ya as arrayPush,
  ba as arrayRemove,
  Ot as assignSafeObject,
  wo as createCustomAdapter,
  Ao as default,
  pt as defaultForParsed,
  ma as ensureArray,
  Wt as enumValueKey,
  kn as enumValueLabel,
  go as fieldWithKey,
  wa as fromNumberInput,
  We as getNestedValue,
  pa as isObjectReorderable,
  mo as jsonSchemaAdapter,
  ho as nativeTheme,
  ht as parseField,
  _a as parseJsonSchema,
  tt as resolveFieldLabel,
  dr as resolveObjectSchema,
  tr as resolvePlaceholder,
  ha as resolveStringWidget,
  Ea as safeParseJson,
  Rt as schemaNodeType,
  Aa as toDatetimeLocal,
  ga as toNumberInput,
  xa as validateJson
};
