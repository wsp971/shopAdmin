

const cookie = {
    get (name) {
        // 读取COOKIE
        const reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)');
        const val = document.cookie.match(reg);
        if (!val || !val[2]) {
            return '';
        }
        const res = val[2];
        try {
            if (/(%[0-9A-F]{2}){2,}/.test(res)) { // utf8编码
                return decodeURIComponent(res);
            } else { // unicode编码
                return unescape(res);
            }
        } catch (e) {
            return unescape(res);
        }
    },
    set (name, value, expires, path, domain, secure) {
        // 写入COOKIES
        const exp = new Date();
        expires = arguments[2] || null;
        path = arguments[3] || '/';
        domain = arguments[4] || null;
        secure = arguments[5] || false;
        if (expires) {
            exp.setMinutes(exp.getMinutes() + parseInt(expires))
        }
        // expires ? (exp.setMinutes(exp.getMinutes() + parseInt(expires))) : '';
        document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    },
    del (name, path, domain, secure) {
        // 删除cookie
        const value = this.get(name);
        if (value != null) {
            const exp = new Date();
            exp.setMinutes(exp.getMinutes() - 1000);
            path = path || '/';
            document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        }
    }
};
export default cookie;
