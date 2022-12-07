// 構造一個 with 來包裹需要執行的代碼，返回 with 代碼塊的一個函數實例
function withedYourCode(code) {
  code = 'with(globalObj) {' + code + '}'
  return new Function('globalObj', code)
}



// 沒那麼簡陋的沙箱

export function littlePoorSandbox(code, ctx) {

    withedYourCode(code).call(ctx, ctx) // 將 this 指向手動構造的全局代理對象

}

// 執行上下文對象的代理對象
export const CreatectxProxy = (ctx, access_white_list)=>new Proxy(ctx, {
  has: (target, prop) => { // has 可以攔截 with 代碼塊中任意屬性的訪問
    if (access_white_list.includes(prop)) { // 在可訪問的白名單內，可繼續向上查找
        return target.hasOwnProperty(prop)
    }

    if (!target.hasOwnProperty(prop)) {
        throw new Error(`Invalid expression - ${prop}! You can not do that!`)
    }

    return true
  }
})