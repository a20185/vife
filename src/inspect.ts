export type AnyFunction = (...args: any[]) => any
export type RecursiveCtor = {
    config?: any
    super?: RecursiveCtor
}
export type MaybeVueElement = HTMLElement & {
    __vue__?: {
        constructor: {
            config?: any
            super?: RecursiveCtor
        }
    }
}
export interface EnablerOptions {
    /** Authorize method to check enable user's identity */
    authorize?: (...args: any[]) => Promise<boolean>
}

/**
 * Vue debugger force enabler
 * a useful tool for quick debug vue applications online (aka. production / testing envs)
 * @param {(HTMLElement | string)} [domElementOrSelector='#app']
 * @param {(HTMLElement | string)} [microFrontendRootSelector='']
 * @returns {void}
 */
export const forceEnable = (
    domElementOrSelector: HTMLElement | string = '#app',
    microFrontendRootSelector: HTMLElement | string = ''
) => {
    const element = (typeof domElementOrSelector === 'string'
        ? document.querySelector(domElementOrSelector)
        : domElementOrSelector) as MaybeVueElement
    if (!element) {
        console.log('❌ 错误：没有找到指定的 DOM 节点，请传入 Vue 组件挂载的根节点或者根元素！')
        return false
    }
    /** 改id为子项目的id或者加载元素 */
    const app = element.__vue__
    // 获取此实例的构造函数
    let Vue = app?.constructor ?? {}
    // 获取 `Vue` 基类，只有基类上有 `Vue.config` 属性
    while (!Vue.config && Vue.super) { Vue = Vue.super }
    // console.log(Vue.config)
    Vue.config.devtools = true
    // @ts-ignore
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        // @ts-ignore
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
    }
    if (microFrontendRootSelector) {
        return setTimeout(() =>{
            const mfeRootEl = (typeof microFrontendRootSelector === 'string'
                ? document.querySelector(microFrontendRootSelector)
                : microFrontendRootSelector) as MaybeVueElement
            // 此为微前端根项目节点的id
            if (mfeRootEl) {
                mfeRootEl.__vue__ = undefined
                console.log('Vue Devtools 开启成功 o(￣▽￣)ｄ，打开 VueInspectTool 查看一下吧~')
            }
        },1000);
    }
    console.log('Vue Devtools 开启成功 o(￣▽￣)ｄ，打开 VueInspectTool 查看一下吧~')
}

/**
 * An util to provide a certain enabler for VueInspector
 * @param {string} [domElementOrSelector='#app'] Vue bindings' DOM element or selector
 * @param {string} [microFrontendRootSelector=''] Micro Frontend's root Element or Selector
 * @param {EnablerOptions} configOptions Configurations
 * @returns {AsyncFunction} enabler
 */
export const createForceEnabler = (
    domElementOrSelector: string = '#app',
    microFrontendRootSelector: string = '',
    configOptions: EnablerOptions = {}
) => {
    /** Authorize user's identity */
    const authorize = configOptions?.authorize ?? (() => Promise.resolve(true))
    return async () => {
        const authorizeResult = await authorize()
        return authorizeResult && forceEnable(domElementOrSelector, microFrontendRootSelector)
    }
}