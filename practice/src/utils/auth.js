// 权限校验函数
export function getCurrentAuthority(){
    return["user","admin"];   //一般这个权限是后台返回给我们的
}
//专门用来做校验的  返回true或false
export function check(authority){
    const current = getCurrentAuthority();
    return current.some(item=>authority.includes(item));
}
//判断登录
export function isLogin(){
    const current = getCurrentAuthority();
    return current && current[0] !== "guest";
}