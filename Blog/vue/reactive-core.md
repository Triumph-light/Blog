# 前置知识
3.5版本响应式核心换成了 双向链表 + 版本计数。原来是Map + set的形式，形成一个树结构。

切换到双向链表带来的好处：
1、内存有较大优化。
  * 原因：当每次effect执行时会进行依赖关系的清空，目的是为了保证每次形成的依赖是正确的。在这个时候会有对象的创建和销毁，这个开销较大。

2、优化computed的执行性能开销。
  * 原因：对于computed后续的effect执行都免除了。effect执行之后会进行track等依赖建立的执行过程。

在 双向链表 的版本下：
主要涉及核心的三个对象（Dep、Sub、Link）：

1、Dep(dep.ts)
```ts
/**
 * 
 */
export let globalVersion = 0

export class Dep {
  /**
   * 记录依赖是否发生更新
   */
  version = 0
  /**
   * Link between this dep and the current active effect
   */
  activeLink?: Link = undefined

  /**
   * subs 订阅者的最后一个sub
   */
  subs?: Link = undefined

  /**
   * subs 订阅者的第一个sub
   */
  subsHead?: Link

  /**
   * 统计有多少个 subs
   */
  sc: number = 0

  /**
   * For object property deps cleanup
   * 这是一个主 WeakMap，用来存储响应式对象 target 到其属性 key 再到依赖 dep 的映射关系。
从概念上讲，把依赖看成是一个 Dep 类（里面维护一个订阅者集合）会更好理解，但为了降低内存开销，我们用原始的 Map 和 Set 来存储它们。
   */
  
  map?: KeyToDepMap = undefined
  key?: unknown = undefined

  /**
   * @internal
   */
  readonly __v_skip = true
  // TODO isolatedDeclarations ReactiveFlags.SKIP

  constructor(public computed?: ComputedRefImpl | undefined) {
    if (__DEV__) {
      this.subsHead = undefined
    }
  }

  track(debugInfo?: DebuggerEventExtraInfo): Link | undefined {}

  trigger(debugInfo?: DebuggerEventExtraInfo): void {}

  notify(debugInfo?: DebuggerEventExtraInfo): void {}
}
```
2、Link(dep.ts)
Link 是 Dep（依赖）和 Effect/Computed（订阅者）之间的一个连接节点（“桥梁”）。
* Vue 响应式系统中：
  * 一个 Dep 可能对应多个 Effect（订阅者）
  * 一个 Effect 可能依赖多个 Dep
  * 这种关系是多对多的，不能单纯用数组表示效率太低，所以用 Link 来高效维护关系。
* Link 作为数据结构节点存在于两条双向链表中：
  * 一条链表维护该 Effect 订阅的所有 Dep（方便清理 Effect 的依赖）
  * 另一条链表维护 Dep 的所有订阅者 Effect（方便触发更新时遍历）

```ts
export class Link {
  /**
   * - 在每次副作用（effect）执行前，所有该 effect 之前记录的依赖链（Link）上的版本号都被重置为 -1
   * - 当 effect 运行过程中访问依赖（dep）时，当前 Link 的版本号会被同步更新（通常是更新成当前的 dep 版本号或全局版本号）。
   * - 副作用执行完毕后，那些版本号仍是 -1 的 Link 表示未被使用过，即不再是当前 effect 的依赖这些 Link 会被清理掉（从 dep 和 effect 的依赖链表中移除），避免内存泄漏，也保证依赖关系准确。
   */
  version: number

  /**
   * Pointers for doubly-linked lists
   */
  nextDep?: Link
  prevDep?: Link
  nextSub?: Link
  prevSub?: Link
  /**
   * 上一次在使用的Link
   */
  prevActiveLink?: Link

  /**
   * Link在初始化时，便会保存 sub 和 dep 对象
   */
  constructor(
    public sub: Subscriber, 
    public dep: Dep,
  ) {
    this.version = dep.version
    this.nextDep =
      this.prevDep =
      this.nextSub =
      this.prevSub =
      this.prevActiveLink =
        undefined
  }
}
```
3、Sub(effect.ts)
```ts
export class ReactiveEffect<T = any>
  implements Subscriber, ReactiveEffectOptions
{
  /**
   * @internal
   * 第一个依赖
   */
  deps?: Link = undefined
  /**
   * @internal
   * 最后一个依赖
   */
  depsTail?: Link = undefined
  /**
   * @internal
   * 当前 sub 的状态
   */
  flags: EffectFlags = EffectFlags.ACTIVE | EffectFlags.TRACKING
  /**
   * @internal
   * 下一个sub
   */
  next?: Subscriber = undefined
  /**
   * @internal
   */
  cleanup?: () => void = undefined

  scheduler?: EffectScheduler = undefined
  onStop?: () => void
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void

  constructor(public fn: () => T) {
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this)
    }
  }

  pause(): void {}

  resume(): void {}

  /**
   * @internal
   */
  notify(): void {}

  run(): T {}

  stop(): void {}

  trigger(): void {}

  /**
   * @internal
   */
  runIfDirty(): void {}

  get dirty(): boolean {
    return isDirty(this)
  }
}
```


