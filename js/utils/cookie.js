const cookie = {
  get(name) {
    // 读取COOKIE
    const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
    const val = document.cookie.match(reg);
    if (!val || !val[2]) {
      return '';
    }
    const res = val[2];
    try {
      if (/(%[0-9A-F]{2}){2,}/.test(res)) { // utf8编码
        return decodeURIComponent(res);
      } // unicode编码
      return unescape(res);
    } catch (e) {
      return unescape(res);
    }
  },
  set(name, value, expires = null, path = '/', domain = null, secure = false) {
    // 写入COOKIES
    const exp = new Date();
    if (expires) {
      exp.setMinutes(exp.getMinutes() + parseInt(expires, 10));
    }
    document.cookie = `${name}=${escape(value)}${expires ? `;expires=${exp.toGMTString()}` : ''}${path ? `;path=${path}` : ''}${domain ? `;domain=${domain}` : ''}${secure ? ';secure' : ''}`;
  },
  del(name, path = '/', domain, secure) {
    // 删除cookie
    const value = this.get(name);
    if (value != null) {
      const exp = new Date();
      exp.setMinutes(exp.getMinutes() - 1000);
      document.cookie = `${name}=;expires=${exp.toGMTString()}${path ? `;path=${path}` : ''}${domain ? `;domain=${domain}` : ''}${secure ? ';secure' : ''}`;
    }
  },
};
export default cookie;
