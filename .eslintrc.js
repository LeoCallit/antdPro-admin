module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    "strict": 2,// 使用严格模式
    "id-match": 1,// 命名检测
    "quotes": [2, "double"], // 引号类型 `` "" ''
    "prefer-const": 2,// 首选const
    "no-const-assign": 2,// 禁止修改const声明的变量
    "semi": [2, "always"],// 语句强制分号结尾
    "no-extra-semi": 2,// 禁止多余的冒号
    "no-implicit-coercion": 2,// 禁止隐式转换
    "no-eval": 2,//禁止使用eval
    "no-implied-eval": 2,// 禁止使用隐式eval
    "no-lone-blocks": 2,// 禁止不必要的嵌套块
    "no-mixed-spaces-and-tabs": [2, false],// 禁止混用tab和空格
    "no-multiple-empty-lines": [2, {"max": 2}],// 空行最多不能超过2行
    "no-console": 2,// 禁止使用console
    "no-debugger": 2,// 禁止使用debugger
    "camelcase": 1,// 强制驼峰法命名
    "complexity": [1, 5],// 循环复杂度
  }
};
