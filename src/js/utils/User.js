import APP_CONFIG from "@/electron/APP_CONFIG"
import UserReq from '@/js/webSocket/Api/user'
import Utils from './utils'

const Users = {
  otherSysLoginUrl(redirect_uri, state) {
    return new Promise((resolve, reject) => {
      UserReq.user_id_code().then(res => {
        const code = res.content.val;
        const url = Utils.url.build(APP_CONFIG.OAUTH_OTHER_SYS_URL,
          (
            'response_type=code&client_id=client&'
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

export default Users;
