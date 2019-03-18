const {net} = require('electron')
const iconv = require("iconv-lite")
const Get = (url, s, f, d) => {
  const request = net.request(url)
  request.on('response', (response) => {
    if (response.statusCode !== 200) {
      f && f(response)
      return;
    }
    let text = ""
    response.on('data', (chunk) => {
      if (d) {
        text += d(chunk);
      } else {
        text += chunk.toString()
      }
    })
    response.on('end', () => {
      s && s(text)
    })
  })
  request.end()
}
const ips = [
  //太平洋
  () => {
    return new Promise((resolve) => {

      Get('http://whois.pconline.com.cn/ipJson.jsp',
        (text) => {
          let ipInfo = (new Function(
            `let info;let IPCallBack = (json)=> info = json;${text.replace(/[\n\r]/g, '').replace(/if\(window\.IPCallBack\)/, 'if(true)')};return info;`
          ))()
          if (!ipInfo || ipInfo.proCode === "999999") {
            resolve(null);
            return;
          }
          resolve({
            ip: ipInfo.ip,
            country: '中国',
            province: ipInfo.pro,
            city: ipInfo.city,
            isp: ipInfo.addr.split(' ')[1]
          })
        },
        () => {
          resolve(null);
        },
        (chunk) => {
          return iconv.decode(chunk, 'GBK')
        }
      )
    })
  },
  //cip.cc
  () => {
    return new Promise((resolve) => {
      Get('http://www.cip.cc',
        (text) => {
          text = text.replace(/^[\s\S]*<pre>([\s\S]*)<\/pre>[\s\S]*$/, '$1');
          if (text.indexOf('IP') === -1 || text.indexOf('地址') === -1 || text.indexOf('运营商') === -1) {
            resolve(null)
            return;
          }
          let info = text.split(/[\r\n]/);
          if (!info) {
            resolve(null)
            return;
          }
          let ipInfo = {};
          info.forEach(line => {
            if (line.indexOf(':') === -1) {
              return;
            }
            let _i = line.split(":");
            let _s = _i[1].trim();
            if (line.indexOf('IP') > -1) {
              ipInfo.ip = _s;
            } else if (line.indexOf('地址') > -1) {
              let dq = _s.split(' ');
              let _dqi = 0;
              dq.forEach(_t => {
                if (_t.length > 0) {
                  switch (_dqi) {
                    case 0: {
                      ipInfo.country = _t;
                      break
                    }
                    case 1: {
                      ipInfo.province = _t;
                      break
                    }
                    case 2: {
                      ipInfo.city = _t;
                      break
                    }
                  }
                  _dqi++;
                }
              })
            } else if (line.indexOf('运营商') > -1) {
              ipInfo.isp = _s;
            }
          })
          resolve(ipInfo)
        },
        () => {
          resolve(null);
        }
      )

    });
  },
  //http://ip.fbisb.com/
  () => {
    return new Promise((resolve) => {
      Get('http://ip.fbisb.com/',
        (text) => {
          let ip = text.replace(/^[\s\S]*getip[\s\S]*>\s*(\d+\.\d+\.\d+\.\d+)\s*<[\s\S]*$/, '$1');
          Get(`http://ip.fbisb.com/GetInfo.php?type=ipip&ip=${ip}`,
            (text) => {
              const json = JSON.parse(text)
              resolve({
                ip,
                country: json.country,
                province: json.region,
                city: json.city,
                isp: json.isp
              })
            },
            () => {
              resolve(null);
            }
          )
        },
        () => {
          resolve(null);
        }
      )
    });
  }
]


const app = async () => {
  for (let i in ips) {
    try {
      let info = await ips[i]();
      if (info) {
        if (info.province) {
          info.province = info.province.replace(/[省市区县乡镇]/g, '')
        }
        if (info.city) {
          info.city = info.city.replace(/[省市区县乡镇]/g, '')
        }
        return info;
      }
    } catch (e) {
      //
    }
  }
}

module.exports = app;
