import config from '@app/../config'

const CDN_ROOT = config.CDN_CONFIG.ROOT

export default class URLUtils {
  public static getAvatarUrl(key?: string, sex: boolean = true, size: number = 128) {
    if (key && key.indexOf('http') > -1) {
      return key
    }
    return key ? `https://cdn.bob.tech/public/uploads/${key}?x-oss-process=image/resize,w_${size}` : this.getDefaultAvatarUrl(sex)
  }

  public static getDefaultAvatarUrl(sex: boolean) {
    return sex ?
      'https://cdn.bob.tech/public/image/avatar_male.png' :
      'https://cdn.bob.tech/public/image/avatar_female.png'
  }

  public static addWeChatOAuth(appId: string, companyId: number, url: string) {
    const redirectUrl = encodeURIComponent(`https://bob.tech/wechat/oauth?companyId=${companyId}`)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=${encodeURIComponent(url)}`
  }

  public static getLastFileName(url: string) {
    let u: string = url
    if (u.indexOf('/') > -1) {
      u = u.substring(u.lastIndexOf('/') + 1)
    }
    return u
  }

  public static getImgUrl(relativeUrl: string, width?: number) {
    return `${CDN_ROOT}/${relativeUrl}?x-oss-process=image/resize,w_${width || 800}`
  }
}
