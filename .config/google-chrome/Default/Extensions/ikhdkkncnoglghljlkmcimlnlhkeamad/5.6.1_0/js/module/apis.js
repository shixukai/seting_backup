define(["./ga","./storage","../lib/jquery","./apis/baidu","./apis/youdao","./apis/google","./apis/google_cn","./apis/bing"],function(a,b,c){"use strict";var d=document.createElement("audio"),e={defaultApi:"google_cn",defaultSpeak:"google_cn",defaultTo:"auto"},f={},g={ts:function(b,c){var d=b.apiId||e.defaultApi;return a.push(["_trackEvent","展示次数","使用"+d+"翻译次数"]),b.hasOwnProperty("to")||(b.to=e.defaultTo),f[d].translate(b,function(a){a.api=f[d],a.query=b.text,c(a)}),this},speak:function(b){var c=b.apiId||e.defaultSpeak;a.push(["_trackEvent","朗读次数","使用"+c+"朗读次数"]),f[c].speakUrl(b.text,b.from,function(a){a?(d.src=a,d.play()):(b.apiId="google",g.speak(b))})}};return b.get(e).done(function(a){c.extend(e,a)}),b.onChange(function(a){c.extend(e,a)},e),Array.prototype.slice.call(arguments,3).forEach(function(a){f[a.id]=a}),Object.freeze(g)});