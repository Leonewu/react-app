### 搭建流程
1. ```yarn create react-app blog```
2. ```npm run eject``` (抽取依赖到外部)
3. ```yarn add antd``` [引入antd](https://ant.design/docs/react/introduce-cn)
4. ```yarn add less-loader less```
5. 在webpack.config.js 添加对less文件的支持 [webpack-less-loader](https://webpack.js.org/loaders/less-loader/#root)
6. ```yarn add babel-plugin-import``` antd 按需引入并自动引入样式 [配置对应的babel](https://ant.design/docs/react/introduce-cn)
7. 抽出package.json里面的babel配置到文件.babelrc[相关阐述](https://babeljs.io/docs/en/configuration)
### 遇到的问题
1. **...**