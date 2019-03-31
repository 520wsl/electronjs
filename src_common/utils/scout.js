/* eslint-disable no-unused-vars */
import Utils from "./utils";
import TQ from "../TaskQueue";
import GBK from "./gbk";

let _1688ItemSelectors = {
  url(item, val, selector) {
    return item.data.url && item.data.url.indexOf(val) !== -1;
  },
  title(item, val, selector) {
    let reg = new RegExp(val);
    return item.data.title && reg.test(item.data.title);
  },
  shopName(item, val, selector) {
    let reg = new RegExp(val);
    return item.data.shopName && reg.test(item.data.shopName);
  },
  shopUrl(item, val, selector) {
    return item.data.shopUrl && item.data.shopUrl.indexOf(val) !== -1;
  },
};
let _1688ItemSelector = (item, selector) => {
  let pass = true;
  let notKey = true;
  for (let key in selector) {
    if (!selector.hasOwnProperty(key)) continue;
    if (!_1688ItemSelectors[key]) continue;
    if(notKey) notKey = false;
    if (!_1688ItemSelectors[key](item, selector[key], selector)) {
      pass = false;
      break;
    }
  }
  return pass && !notKey;
};
let _1688OneItemBase = (data, exception, pNode, selectorOrNode, keys) => {
  let nodes;
  switch (selectorOrNode.constructor) {
    case NodeList: {
      nodes = selectorOrNode;
      break;
    }
    case Array: {
      for (let i = 0, len = selectorOrNode.length; i < len; i++) {
        nodes = pNode.querySelectorAll(selectorOrNode[i]);
        if (nodes && nodes.length > 0) {
          break;
        }
      }
      break;
    }
    case String: {
      nodes = pNode.querySelectorAll(selectorOrNode);
      break;

    }
    default: {
      return;
    }
  }
  if (nodes && nodes.length > 0) {
    for (let key in keys) {
      if (!keys.hasOwnProperty(key)) continue;
      let values = [];
      for (let i = 0; i < nodes.length; i++) {
        let val = keys[key](nodes[i]);
        if (Utils.object.isNotNull(val)) values.push(val);
      }
      if (values.length > 1) {
        exception[key] = values
      }
      data[key] = values[0];
    }
  }

};
let Resolver = {
  _1688OneItem(li) {
    let data = {};
    let exception = {};
    let mainNodes = li.querySelectorAll('.imgofferresult-mainBlock');
    if (!mainNodes || mainNodes.length < 1) {
      mainNodes = li.querySelectorAll('[module-layout="layout-e"]');
    }
    if (mainNodes && mainNodes.length > 0) {
      let mainNode = mainNodes[0];
      let _1b = (selectorOrNode, keys) => {
        _1688OneItemBase(data, exception, mainNode, selectorOrNode, keys);
      };

      //标题、链接
      _1b(['[t-click-item="title"]', '[offer-stat="title"]'], {
        'title': (node) => node.getAttribute('title'),
        'url': (node) => node.getAttribute('href')
      });

      //图片
      _1b('img', {
        'img': (node) => {
          let img = node.getAttribute('src');
          if (!img) {
            img = node.getAttribute('data-lazy-src');
          }
          return img;
        }
      });

      //价格
      _1b('[class*=priceNum]', {
        'price': (node) => {
          let price = node.getAttribute('title');
          if (Utils.string.isNotBlank(price)) {
            return price.replace(/¥/, "");
          } else {
            return null;
          }
        }
      });

      //30天销量
      _1b(['[class*=tradeBt]', '[data-gmv]'], {
        'totalSales30': (node) => {
          let gmv = node.getAttribute('data-gmv');
          if (Utils.string.isBlank(gmv)) {
            gmv = node.getAttribute('title');
          }
          return gmv;
        }
      });

      //店铺名称、店铺链接
      _1b('[class*=companyName]', {
        'shopName': (node) => node.getAttribute('title'),
        'shopUrl': (node) => node.getAttribute('href')
      });

      //广告
      _1b('.wsw-ball', {
        'isAD': (node) => {
          let ad = node.querySelectorAll('[t-click-item="wxb"]');
          if (ad && ad.length > 0) {
            return true;
          }
          ad = node.querySelectorAll('[t-click-item="bw"]');
          if (ad && ad.length > 0) {
            return true;
          }
          return !!0;
        },
      });
    }
    return {data, exception};
  }
};
const DEFAULT_PAGE_SIZE = 60;
let app = {
  _1688RankingSales(keywords, selector, parameter, needItem, maxPage, pageSize = DEFAULT_PAGE_SIZE) {
    if (!parameter) {
      parameter = {}
    }
    parameter = {
      ...parameter,
      descendOrder: true,
      sortType: 'va_rmdarkgmv30rt',
      uniqfield: 'userid'
    }
    return app._1688Ranking(keywords, selector, parameter, needItem, maxPage, pageSize)
  },
  _1688Ranking(keywords, selector, parameter, needItem = false, maxPage = 10, pageSize = DEFAULT_PAGE_SIZE) {
    return new Promise((resolve, reject) => {
      if (Utils.string.isEmpty(keywords)) {
        reject('没有搜索条件(keywords)');
        return;
      }
      if (!selector) {
        reject('没有提供选择器(selector)');
        return;
      }
      switch (selector.constructor) {
        case Array: {
          let s = [];
          for (let i = 0, len = selector.length; i < len; i++) {
            if (Utils.map.isNotEmpty(selector[i])) {
              s.push(selector[i])
            }
          }
          if (s.length < 1) {
            reject({
              msg: '没有提供选择器(selector)'
            });
            return;
          }
          selector = s;
          break;
        }
        case Object: {
          if (Utils.map.isEmpty(selector)) return;
          selector = [selector];
          break;
        }
        default:
          reject({
            msg: '选择器(selector)类型不正确(只能:Map/Array)'
          });
          return;
      }
      app._1688Search(keywords, parameter, maxPage, pageSize).then(itemList => {
        let noADIndex = 0;
        let result = [];
        const _sSize = selector.length;
        itemList.forEach((item, itemI) => {
          !item.data.isAD && noADIndex++;
          let pageNum = parseInt((itemI) / pageSize, 10) + 1;
          let pageIndex = itemI % pageSize + 1;
          for (let _sI = 0; _sI < _sSize; _sI++) {
            if (_1688ItemSelector(item, selector[_sI])) {
              result.push({
                _id_: selector[_sI]._id_,
                selectorIndex: _sI,
                pageIndex,
                pageNum,
                noADIndex: !item.data.isAD ? (noADIndex + 1) : noADIndex,
                item: needItem ? item : null
              });
              break;
            }
          }
        })
        resolve(result);
      }).catch(err => reject(err));
    });
  },
  _1688Search(keywords, parameter, pageTotal = 1, pageSize = DEFAULT_PAGE_SIZE) {
    return new Promise(async (resolve, reject) => {
      let list = [];
      let _run = (i = 0) => {
        i++;
        app._1688SearchPage(keywords, parameter, i, pageSize)
          .then((itemList) => {
            list = list.concat(itemList)
            if (i < pageTotal) {
              _run(i);
            } else {
              resolve(list);
            }
          })
          .catch(err => {
            if (err === '没有搜索结果') {
              if (i < 2) {
                reject(err)
              } else {
                resolve(list);
              }
            } else {
              reject(err);
            }
          });
      };
      _run();
    })
  },
  _1688SearchPage(keywords, parameter, pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) {
    return new Promise(async (resolve, reject) => {
      let paramMap = {
        "button_click": "top",
        "earseDirect": false,
        "n": "y",
        "netType": "1,11",
        "sug": "1_0",
        "beginPage": pageNum,
        // "filterP4pIds": "574116551878,562761429138,578593571877,542318597916,584770672825,576843957376,557249932989",
        "uniqfield": "pic_tag_id",
        "templateConfigName": "marketOfferresult",
        "offset": 8,
        "pageSize": pageSize,
        "asyncCount": pageSize,
        "startIndex": 0,
        "async": true,
        "enableAsync": true,
        // "leftP4PIds": "578593571877,542318597916,584770672825,576843957376,567657112251,557249932989,574749363362",
        "rpcflag": "new",
        "_pageName_": "market",
        "callback": `jQuery1720${Utils.getUUID(16, 10)}_${new Date().getTime()}`
      };
      if (parameter) {
        Object.assign(paramMap, parameter)
      }

      let url = 'https://s.1688.com/selloffer/rpc_async_render.jsonp?';
      url += 'keywords=' + GBK.encode(keywords) + '&' + Utils.url.mapToParamString(paramMap);

      fetch(url)
        .then(response => {
          return response.blob();
        })
        .then(blob => {
          let reader = new FileReader();
          reader.onload = function (e) {
            let text = reader.result;
            handleSearch1688(text.replace(/\r|\n/g, '').replace(/^jQuery[^(]*\(/, '').replace(/\)$/, ''));
          };
          reader.readAsText(blob, 'GBK')
        })
        .catch(err => {
          reject(err)
        });


      function handleSearch1688(resText) {
        if (resText.indexOf('XSS request injection') !== -1) {
          console.error(resText);
          reject(resText);
          return;
        }
        let res;
        try {
          res = JSON.parse(resText);
        } catch (e) {
          if (e.toString().indexOf("Unexpected token ' in JSON") !== -1) {
            try {
              res = JSON.parse(resText.replace(/\\'/g, "\\\\'"));
            } catch (ee) {
              console.error(ee);
              reject(ee.toString());
              return;
            }
          } else {
            console.error(e);
            reject(e.toString());
            return;
          }
        }
        if (res.message !== 'success') {
          if (res.url && res.url.indexOf('login.taobao.com') !== -1) {
            console.error('需要登录');
            reject(`需要登录;${resText}`);
          } else {
            console.error(`请求失败：${res.hasError}`);
            reject(res.hasError);
          }
          return;
        }
        if (res.content && res.content.offerResult && res.content.offerResult.html) {
          let html = res.content.offerResult.html;
          let ul = document.createElement('ul');
          ul.innerHTML = html;
          let cs = ul.children;
          if (!cs) {
            console.log('没有搜索结果');
            reject('没有搜索结果');
            return;
          }
          let dataList = [];
          for (let i = 0; i < cs.length; i++) {
            let c = cs[i];
            if (c.tagName.toLowerCase() === "li") {
              let res = Resolver._1688OneItem(c);
              dataList.push(res);
            }
          }
          resolve(dataList);
        }
      }
    });
  }
};

let _app = [];
for (let fnName in app) {
  if (!app.hasOwnProperty(fnName)) continue;
  const fn = app[fnName];
  _app[fnName] = (...args) => {
    let param;
    let option = {};
    if (args[2] && args[2] === "TQ") {
      param = args[0];
      option.start = args[1];
    } else {
      param = args;
    }
    return new Promise((resolve, reject) => {
      option.fn = () => {
        return new Promise((_TQResolve) => {
          fn.apply(app, param).then(d => {
            resolve(d);
            _TQResolve();
          }).catch(d => {
            reject(d)
            _TQResolve();
          })
        })
      }
      TQ.task(option);
    })

  }

}

export default _app;
