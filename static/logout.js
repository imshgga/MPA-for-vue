/*! 2016-08-10 */
var p_logout = {
  mainHost: 'm.jd.com',
  appid: '',
  start: 0,
  callback: null,
  getLogoutUrl: function (host, func) {
    var token = encodeURIComponent(p_logout.getCookie("pt_token"));
    if (host == p_logout.mainHost) {
      host = 'plogin.' + host
    } else {
      host = 'plogin.' + host
    }
    return '//' + host + '/cgi-bin/m/logout?callback=' + func + '&appid=' + p_logout.appid + '&pt_token=' + token
  },
  getCookie: function (name) {
    var a = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    return !a ? "" : decodeURIComponent(a[2])
  },
  delCookie: function (name, domain, path) {
    document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + (domain ? "domain=" + domain : "")
  },
  report: function (id, time, status) {
    var guid = encodeURIComponent(p_logout.getCookie('guid'));
    var pin = encodeURIComponent(p_logout.getCookie('pin'));
    var url = 'https://wlmonitor.m.jd.com/web_login_report?appID=' + p_logout.appid + '&interfaceID=' + id + '&uuid=' + guid + '&pin=' + pin + '&guid=' + guid + '&os=5&appVersion=1.3.0&status=' + status + '&callTime=' + time;
    var img = new Image();
    img.src = url
  },
  jsonp: function (host, func) {console.log("host====",host)
    var script = document.createElement('script');
    script.src = p_logout.getLogoutUrl(host, func);

    document.getElementsByTagName('head')[0].appendChild(script);
    console.log("append==success==src",p_logout.getLogoutUrl(host, func))
    script.onerror = function () {
      if (typeof p_logout.callback == 'function') {
        p_logout.callback({
          errcode: 512,
          message: '服务器开小差，请稍后重试'
        })
      }
    }
  },
  setRet: function (rdata) {
    var time = (new Date()).getTime() - p_logout.start;
    p_logout.report(393220, time, rdata.errcode);
    if (typeof p_logout.callback == 'function') {
      if (rdata.errcode != 0) {
        p_logout.callback(rdata)
      } else {
        p_logout.callback({
          errcode: 0,
          message: '注销成功'
        })
      }
    }
  },
  logout: function (callback, host, appid) {
    if (typeof callback == 'function') {
      p_logout.callback = callback
    }
    if (arguments.length == 2) {
      appid = 100
    }
    if ((host == 'jd.com') || (host.indexOf('.jd.com') >= 0)) {
      host = p_logout.mainHost
    }
    p_logout.appid = appid || 100;
    p_logout.start = (new Date()).getTime();
    p_logout.jsonp(host, 'p_logout.setRet')
  }
};
