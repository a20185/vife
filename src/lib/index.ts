import ZhDict from './i18n/zh'
import EnDict from './i18n/zh'

export interface SetupOptions {
    isVerbose: boolean
}

let isVerbose = true
const currentDict = process.env.LANG?.startsWith('zh')
    ? ZhDict
    : EnDict

export const notice = (noticeKey: keyof typeof currentDict) => {
    if (isVerbose) {
        console.log(currentDict[noticeKey])
    }
}

/**
 * Util for setup VIFE running env
 * @param {Partial<SetupOptions>} param
 */
export const setup = (param: Partial<SetupOptions>) => {
    isVerbose = param?.isVerbose ?? true
}
