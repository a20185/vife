declare type AnyFunction = (...args: any[]) => any;
declare type RecursiveCtor = {
    config?: any;
    super?: RecursiveCtor;
};
declare type MaybeVueElement = HTMLElement & {
    __vue__?: {
        constructor: {
            config?: any;
            super?: RecursiveCtor;
        };
    };
};
interface EnablerOptions {
    /** Authorize method to check enable user's identity */
    authorize?: (...args: any[]) => Promise<boolean>;
}
/**
 * Vue debugger force enabler
 * a useful tool for quick debug vue applications online (aka. production / testing envs)
 * @param {(HTMLElement | string)} [domElementOrSelector='#app']
 * @param {(HTMLElement | string)} [microFrontendRootSelector='']
 * @returns {void}
 */
declare const forceEnable: (domElementOrSelector?: HTMLElement | string, microFrontendRootSelector?: HTMLElement | string) => false | NodeJS.Timeout | undefined;
/**
 * An util to provide a certain enabler for VueInspector
 * @param {string} [domElementOrSelector='#app'] Vue bindings' DOM element or selector
 * @param {string} [microFrontendRootSelector=''] Micro Frontend's root Element or Selector
 * @param {EnablerOptions} configOptions Configurations
 * @returns {AsyncFunction} enabler
 */
declare const createForceEnabler: (domElementOrSelector?: string, microFrontendRootSelector?: string, configOptions?: EnablerOptions) => () => Promise<false | void | NodeJS.Timeout>;

interface SetupOptions {
    isVerbose: boolean;
}
/**
 * Util for setup VIFE running env
 * @param {Partial<SetupOptions>} param
 */
declare const setup: (param: Partial<SetupOptions>) => void;

export default createForceEnabler;
export { AnyFunction, EnablerOptions, MaybeVueElement, RecursiveCtor, createForceEnabler, forceEnable, setup };
