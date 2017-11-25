/*!
     * online
     * Copyright(c) 2016 luojia <luojia@luojia.me>
     * MIT Licensed
     */
class Online {
  constructor(addr) {
    this.addr = addr;
    this.groups = new Set();
    this.on = false;
    this.waiting = false;
    this.onOnlineChange = null;
    this.pinger = setInterval(() => { this.opened && this.ws.send(''); }, 20000);
    this.user = `${conv(Date.now(), 10, 62)}-${randomUser()}`;
    this.ws = null;
    if (window.localStorage) {//use stored user sign
      var user = localStorage.getItem('online_user');
      if (!user) localStorage.setItem('online_user', this.user);//save the user
      else { this.user = user; }//restore the user
    }
    if (addr) {
      this.on = true;
      this.connet();
    }
  }
  get opened () { return this.ws && this.ws.readyState === 1; }
  enter (name) {
    if (typeof name !== 'string') throw ('name is not a string:' + name);
    this.groups.add(name);
    if (this.opened)
      this.ws.send(JSON.stringify({ _: 'enter', g: name, u: this.user }));
    return this;
  }
  leave (name) {
    if (typeof name !== 'string') throw ('name is not a string:' + name);
    if (this.opened && this.groups.delete(name)) {
      this.ws.send(JSON.stringify({ _: 'leave', g: name }));
    }
    return this;
  }
  leaveAll () {
    if (this.opened)
      for (let g of this.groups) this.leave(g);
    return this;
  }
  _report (data) {
    this.onOnlineChange && this.onOnlineChange(data);
  }
  connet (addr) {
    this.waiting = false;
    if (addr) this.addr = addr;
    if (this.on === false) return;
    if (this.opened) return;
    let ws = this.ws = new WebSocket(this.addr);
    ws.onmessage = m => {
      if (m.data === 'connected') {
        for (let g of this.groups) this.enter(g);
        return;
      }
      let msg = JSON.parse(m.data);
      switch (msg._) {
        case 'ol': {
          msg.c = parseInt(msg.c, 32);
          msg.u = parseInt(msg.u, 32);
          this._report(msg);
          break;
        }
      }
    }
    ws.onclose = e => {
      if (this.waiting) return;
      for (let g of this.groups) this._report({ g: g, c: 0, u: 0 });
      this.waiting = true;
      setTimeout(() => { this.connet() }, 5000);
    }
    ws.onerror = e => {
      ws.onclose();
    }
    return this;
  }
  close () {
    this.on = false;
    this.ws.close();
    clearInterval(this.pinger);
  }
}

function randomUser () {
  return conv(Math.round(99999999 * Math.random()), 10, 62);
}

//gist: https://gist.coding.net/u/luojia/c33a7e50d9634a1d9084ebd71c468114/
function conv (n, o, t, olist, tlist) {//数,原进制,目标进制[,原数所用字符表,目标字符表]
  var dlist = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    tnum = [], m, negative = ((n += '').trim()[0] == '-'), decnum = 0;
  olist || (olist = dlist);
  tlist || (tlist = dlist);
  if (negative) n = n.slice(1);
  for (var i = n.length; i--;)
    decnum += olist.indexOf(n[i]) * Math.pow(o, n.length - i - 1);
  for (; decnum != 0; tnum.unshift(tlist[m])) {
    m = decnum % t;
    decnum = Math.floor(decnum / t);
  }
  decnum && tnum.unshift(tlist[decnum]);
  return (negative ? '-' : '') + tnum.join('');
}

if (window.CONFIG.onlineAPI && !NexT.utils.isMobile()) {
  var ol = new Online(window.CONFIG.onlineAPI);
  ol.enter(document.domain);
  ol.onOnlineChange = function (data) {
    // console.log(data)
    document.getElementById('online-count').innerHTML = data.u;
  }
}
