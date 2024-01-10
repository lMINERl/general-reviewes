/* eslint-disable eqeqeq */
import { DeepReadonly } from "ts-essentials";

export function deepFreez<T extends object & { [key: string]: any }>(obj: T): DeepReadonly<T> {
  if (typeof obj == "object") {
    if (Array.isArray(obj)) {
      return Object.freeze(obj.map((v: any) => deepFreez<any>(v))) as any;
    }
    const nObj = Object.keys(obj).reduce((prev, curr: string) => {
      return { ...prev, [curr]: deepFreez(obj[curr]) };
    }, {});
    return Object.freeze(nObj) as any;
  }
  return obj;
}

type Cons<H, T> = T extends readonly any[]
  ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
    ? R
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];
type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: [K] | (Paths<T[K], Prev[D]> extends infer P ? (P extends [] ? never : Cons<K, P>) : never);
    }[keyof T]
  : [];

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

/**
 *
 * @param obj
 * @param param1
 * @param v
 * @returns
 * @description just update nested object based on path you provide without changing refrences of other paths
 * @example
 * var t_obj = { x: { x1: "1" }, y: { y1: 3, y2: 2 }, z: [1, { z: 1 }] };
 * const newobj = update(t_obj, ["z", 1, "z"], (old) => old + 1);
 * console.log(newobj); //{ x: { x1: '1' }, y: { y1: 3, y2: 2 }, z: [ 1, { z: 2 } ] }
 * console.log(t_obj.y == newobj.y); // true
 * console.log(t_obj.x == newobj.x); // true
 * console.log(t_obj.z == newobj.z); // false
 * 
 * const newobj2 = update(t_obj, ["y", "y1"], "a new val");
 * console.log(newobj2); //{ x: { x1: '1' }, y: { y1: "a new val", y2: 2 }, z: [ 1, { z: 1 } ] }
 * 
 * @note if you access out of index array update function will just add your value
 * @example
 * const newobj3 = update(t_obj, ["z", 30, "z"], 100); 
 * console.log(newobj3); //{ x: { x1: '1' }, y: { y1: 3, y2: 2 }, z: [ 1, { z: 1 }, { z: 100 } ] }
 * 
 * const newobj4 = update(t_obj, ["z", 30, "z"], (old)=>old+100);
 * console.log(newobj4); 
 * //{
 * //x: { x1: '1' },
 * //y: { y1: 3, y2: 2 },
 * //z: [ 1, { z: 1 }, { z: [Function (anonymous)] } ]
 * //}
 
 */
export function update<T extends DeepReadonly<object>>(obj: T, [...t]: Paths<T> | [], v: any): DeepReadonly<T> {
  function updateAux<K extends DeepReadonly<object>>(nObj: K, [...path]: (keyof K)[]): DeepReadonly<T> {
    if (!path.length) {
      return Object.freeze(typeof v == "function" ? v(nObj) : v);
    }
    if (Array.isArray(nObj)) {
      return Object.freeze([
        ...nObj.filter((val: any) => val != Reflect.get(nObj, path[0])),
        updateAux(Reflect.get(nObj, path[0]), path.slice(1, path.length)),
      ]) as any;
    }
    if (!nObj && typeof path[0] == "number") {
      return deepFreez([v] as any);
    }
    return Object.freeze({
      ...nObj,
      [Reflect.get(path, 0)]: nObj
        ? Object.freeze(updateAux(Reflect.get(nObj, path[0]) as any, path.slice(1, path.length)))
        : deepFreez(v),
    }) as any;
  }
  return updateAux(obj, [...t]);
}

export function updateMutable<T extends object>(obj: T, [...t]: Paths<T> | [], v: unknown) {
  function updateAux<K extends object>(nObj: K, [...path]: (keyof K)[]): T {
    if (!path.length) {
      return typeof v == "function" ? v(nObj as unknown) : v;
    }
    if (Array.isArray(nObj)) {
      return [
        ...nObj.filter((val) => val != Reflect.get(nObj, path[0])),
        updateAux(Reflect.get(nObj, path[0]), path.slice(1, path.length)),
      ] as any;
    }
    if (!nObj && typeof path[0] == "number") {
      return [v] as any;
    }
    return {
      ...nObj,
      [Reflect.get(path, 0)]: nObj ? updateAux(Reflect.get(nObj, path[0]) as any, path.slice(1, path.length)) : v,
    } as any;
  }
  return updateAux(obj, [...t]);
}

/**
 *
 * @param obj
 * @param refrence
 * @returns
 * @description a super version of update without path but a refrence object to look at
 * @example
 * var t_obj = { x: { x1: "1" }, y: { y1: 3, y2: 2 } };
 * var t_refrence = { n: { n1: 5 }, y: { y2: 100, y3: 100 } };
 * const newobj = updateNested(t_obj, t_refrence);
 * console.log(newobj); //{ x: { x1: '1' }, y: { y1: 3, y2: 100, y3: 100 }, n: { n1: 5 } }
 * console.log(t_obj.y == newobj.y); //fale
 * console.log(t_obj.x == newobj.x); //true
 */
export function updateNested<T extends object, K extends Subset<T>>(obj: T, refrence: K): DeepReadonly<T & K> {
  return Object.entries(refrence ?? {}).reduce((p: any, c: any) => {
    if (Array.isArray(c[1])) {
      return update(p, [c[0]], c[1]);
    }
    return update(
      p,
      [c[0]] as any,
      typeof c[1] == "object" && c[1] != null ? (!p[c[0]] ? c[1] : updateNested(p[c[0]], c[1])) : c[1]
    );
  }, obj ?? {}) as DeepReadonly<T & K>;
}

export function updateNestedMutable<T extends object, K extends Subset<T>>(obj: T, refrence: K): T & K {
  return Object.entries(refrence ?? {}).reduce((p: any, c: any) => {
    if (Array.isArray(c[1])) {
      return update(p, [c[0]], c[1]);
    }
    return updateMutable(
      p,
      [c[0]] as any,
      typeof c[1] == "object" && c[1] != null ? (!p[c[0]] ? c[1] : updateNestedMutable(p[c[0]], c[1])) : c[1]
    );
  }, obj ?? {});
}

/**
 *
 * @param obj normal / deepreadonly object
 * @param refrence normal/ deepreadonly object
 * @returns deepreadonly obj same type of "obj" param
 * @description produce new object from "obj" param with new fields from "refrence" param object without changing refrences of "obj" param fields
 * @example
 * var t_obj = { x: { x1: "1" }, y: { y1: 3, y2: 2 } };
 * var t_refrence = { n: { n1: 5 }, y: { y2: 100, y3: 100 } };
 * const newobj = updateNestedHardSet(t_obj, t_refrence);
 * console.log(newobj); //{ x: { x1: '1' }, y: { y1: 3, y2: 2 }, n: { n1: 5 } }
 * console.log(t_obj.y == newobj.y);//true
 * console.log(t_obj.x == newobj.x);//true
 */
export function updateNestedHardSet<T extends object, K extends Subset<T>>(obj: T, refrence: K): DeepReadonly<T & K> {
  return Object.entries(refrence ?? {}).reduce((p: any, c: any) => {
    if (p[c[0]]) {
      return p;
    }
    return update(
      p,
      [c[0]],
      typeof c[1] == "object" && c[1] != null ? (!p[c[0]] ? c[1] : updateNested(p[c[0]], c[1])) : c[1]
    );
  }, obj) as DeepReadonly<T & K>;
}
export function updateNestedHardSetMutable<T extends object, K extends Subset<T>>(obj: T, refrence: K): T & K {
  return Object.entries(refrence ?? {}).reduce((p: any, c: any) => {
    if (p[c[0]]) {
      return p;
    }
    return updateMutable(
      p,
      [c[0]],
      typeof c[1] == "object" && c[1] != null ? (!p[c[0]] ? c[1] : updateNestedMutable(p[c[0]], c[1])) : c[1]
    );
  }, obj ?? {}) as T & K;
}
