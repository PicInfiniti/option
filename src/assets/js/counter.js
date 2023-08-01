var taxes = 1.012512

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}

export function parsJson(data) {
  for (let i of data) {
    let tmp = {}
    for (let j of i.val) {
      tmp[j.t] = j.v
    }

    i.val = tmp
    i.val.ekh = number(i.val.gh_s_p) - number(i.val.ghe)
    i.val.percent = i.val.ekh / number(i.val.gh_s_p) * 100
    i.val.percent.toFixed(2)
    i.val.ghePba_gh = number(i.val.ghe) * taxes + number(i.val.ba_gh)
    i.val.ghePba_gh.toFixed(2)
    i.val.ekh_profit = number(i.val.gh_s_p) - i.val.ghePba_gh
    i.val.p_profit = i.val.ekh_profit / number(i.val.gh_s_p) * 100
    i.val.p_profit.toFixed(2)
    i.val.leverage = number(i.val.ba_gh)!=0 ? number(i.val.gh_s_p) / number(i.val.ba_gh) : 0
    i.val.leverage.toFixed(2)

    i.val.ekh = i.val.ekh.toLocaleString()
    i.val.percent = i.val.percent.toLocaleString()
    i.val.ghePba_gh = i.val.ghePba_gh.toLocaleString()
    i.val.ekh_profit = i.val.ekh_profit.toLocaleString()
    i.val.p_profit = i.val.p_profit.toLocaleString()
    i.val.leverage = i.val.leverage.toLocaleString()

  }

}

function number(a) {
  if(a){
    a = a.replace(',', '').replace('.', '').replace(' M', '00000').replace(' B', '00000000')
    return Number(a)
  } else {
    return 0
  }

}