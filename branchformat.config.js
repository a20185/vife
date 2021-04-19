module.exports = {
    config: [
        {
            name: 'type',
            type: 'list',
            optional: false,
            default: 'feature',
            envDefault: '',
            message: '请选择分支类型（默认：feature）：',
            prefix: '',
            options: ['feature', 'bugfix', 'hotfix'],
            regExp: '(feature|bugfix|hotfix)'
        },
        {
            name: 'swimlane',
            type: 'input',
            optional: true,
            default: '',
            envDefault: '',
            message: '请输入使用的泳道名称（例如 1787-qkgku、ouyifeng-hhhhh 等）：',
            prefix: 'sl-',
            regExp: 'sl-([0-9a-z]{4,}-[a-z]{5})'
        },
        {
            name: 'packageName',
            type: 'input',
            optional: true,
            envDefault: '',
            default: '',
            message: '请输入子目录名称（例如 product-gx 等）：',
            prefix: '@',
            regExp: '@([0-9a-z-]+)'
        },
        {
            name: 'businessKey',
            type: 'input',
            optional: true,
            envDefault: '',
            default: '',
            message: '请输入业务变量名称（例如 AgentOrder 等）：',
            prefix: '#',
            regExp: '#([0-9a-zA-Z_]+)'
        },
        {
            name: 'id',
            type: 'input',
            optional: true,
            envDefault: '',
            default: '',
            message: '请输入关联ID（例如 ones-xxx, km-xxx, tt-xxx）：',
            prefix: '',
            regExp: '(km-[0-9]+|ones-[0-9]+|tt-[0-9]+)'
        }
    ],
    skip: [
        'master',
        'staging',
        'test'
    ]
}