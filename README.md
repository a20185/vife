### Vife - Vue Inspector Force Enabler
> ⚙ A simple util to swiftly enable Vue inspector in non-developing environment

Vife (pronunced as /vif/) is a simple util for VueInspector which aims to provide a smoother develop experience at non-developing (aka. production, testing) environment.It enables VueInspector `OnNeeded` in runtime to avoid bringing performance overhead while you're not debugging.


### Usage

> Install via your package manager

```shell
# Using Yarn
yarn add vife
# Using NPM
npm install vife
```

> Setup and export vife in your code

```typescript
// import
import { createForceEnabler } from 'vife'
// create your enabler and export it to window or somewhere, simple usage
window.__vife__ = createForceEnabler(
  '#your-root-vue-el-selector'
)

// full usage
import { setup } from 'vife'
setup({ isVerbose: false }) // remove runtime logs
// authorize method to prevent illegal callups
const authorize = async () => {
  const authorized = await axios.get('somewhere/your/user/api')
  if (authorized) return true
  return false
}
window.__vife__ = createForceEnabler(
  '#your-root-vue-el-selector',
  '#root-mfe-portal-container-selector', // no need if not mfe
  { authorize } // custom authorize method
)
```



### API Documentation

> createForceEnabler

```typescript
/**
 * An util to provide a certain enabler for VueInspector
 * @param {string} [domElementOrSelector='#app'] Vue bindings' DOM element or selector
 * @param {string} [microFrontendRootSelector=''] Micro Frontend's root Element or Selector
 * @param {EnablerOptions} configOptions Configurations
 * @returns {AsyncFunction} enabler
 */
const createForceEnabler: (
  domElementOrSelector?: string,
  microFrontendRootSelector?: string,
  configOptions?: EnablerOptions
) => () => Promise<false | void | NodeJS.Timeout>;
```
