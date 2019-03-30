import AES from 'crypto-js/aes'
import ENC_UTF8 from 'crypto-js/enc-utf8'
import SHA256 from 'crypto-js/sha256'
import APP_CONFIG from '../src_common/electron/APP_CONFIG'
import UserApi from "./webSocket/Api/user"
import Utils from "../src_common/utils/utils";
import AgentMainReqs from '../src_common/electron/AgentMainReqs'

const LSKEY = 'I5HJB7FYCAURKGTN';
const AESKEY = SHA256(APP_CONFIG.CHAOS).toString();
const getLocalUser = () => {
  let cipher = localStorage.getItem(LSKEY)
  if (!cipher) return null;
  let bytes = AES.decrypt(cipher, AESKEY);
  return JSON.parse(bytes.toString(ENC_UTF8));
}
const setLocalUser = (user) => {
  localStorage.setItem(LSKEY, AES.encrypt(JSON.stringify(user), AESKEY).toString())
}
const removeLocalUser = () => {
  localStorage.removeItem(LSKEY)
}

let _user;

const app = {
  setUser(user) {
    const time = new Date().getTime();
    user.__last__ = time;
    if (!user.__first__) user.__first__ = time;
    _user = user;
    setLocalUser(user);
  },
  isLogin() {
    return new Promise((resolve) => {
      if (_user) {
        resolve(_user)
      } else {
        try {
          let user = getLocalUser()
          if (!user) {
            resolve(false)
          } else {
            this.setUser(user)
            UserApi.login(user)
              .then(() => {
                resolve(user);
                AgentMainReqs.reqs.loginAfter();
              })
              .catch((e) => {
                console.error(e)
                app.logout()
                resolve(false)
              })
          }
        } catch (e) {
          resolve(false)
        }
      }
    })
  },
  logout() {
    return UserApi.logout().then(() => {
      _user = null;
      removeLocalUser();
    });
  },
  removeLocalUser() {
    _user = null;
    removeLocalUser();
  },
  removeUser() {
    _user = null;
  },
  otherSysLoginUrl(redirect_uri, client = 'client', state = 'sso') {
    return new Promise((resolve, reject) => {
      UserApi.user_id_code().then(res => {
        const code = res.content.val;
        const url = Utils.url.build(APP_CONFIG.OAUTH_OTHER_SYS_URL,
          (
            `response_type=code&client_id=${client}&`
            + Utils.url.mapToParamString({
              redirect_uri, state,
              id_code: code,
              id_code_url: APP_CONFIG.API_BASE + APP_CONFIG.API_USER_CODE
            })
          )
        )
        resolve(url);
      }).catch(err => reject(err))
    })

  }
}

export default app;
