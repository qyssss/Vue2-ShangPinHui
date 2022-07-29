import { v4 as uuidv4 } from 'uuid';
// uuid不应该变化(放在localStorage)
export const getUUID = () => {
    // 从本地存储获取 uuid(看看有没有)
    let uuid_toekn = localStorage.getItem('uuid_toekn')
    // 如果没有
    if (!uuid_toekn) {
        // 生成游客临时身份
        uuid_toekn = uuidv4()
        // 本地存储存一次
        localStorage.setItem('uuid_toekn', uuid_toekn)
    }
    // 这边切记需要有返回值,否则是undefined
    return uuid_toekn
}