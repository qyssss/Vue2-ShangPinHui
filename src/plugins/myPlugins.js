// Vue 插件必须暴露对象
let myPlugins = {}

myPlugins.install = function(Vue,options){
    // Vue.prototype.$bus 
    // Vue.directive Vue.component
    // 自定义指定把小写变成大写 v-sqy 
    Vue.directive(options.name,(element,params)=>{
        element.innerHtml = params.value.toUpperCase()
    })
}
export default myPlugins