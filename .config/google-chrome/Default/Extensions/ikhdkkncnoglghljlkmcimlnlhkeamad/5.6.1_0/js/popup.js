require(["js/lib/jquery"],function(a){var b=function(){var b={},c=document.querySelectorAll("[id]");return[].forEach.call(c,function(c){b[c.id]=a(c)}),b}();setTimeout(function(){b.translateText.trigger("focus")},200),require(["js/module/languages"],function(b){b.attach("#from,#to",function(b,c){c.value=b.textContent,a.data(c,"lang",b.dataset.value)})}),require(["js/module/apis","js/lib/doT"],function(a,c){function d(){var c=b.translateText.val().trim();if(c){var d={text:c,apiId:b.chooseApi.val(),from:b.from.data("lang")||"",to:b.to.data("lang")||""};b.translate.text("翻译中…").prop("disabled",!0),a.ts(d,function(a){b.result.html(f(a)),b.translate.text("翻译").prop("disabled",!1)})}}var e,f=c.template(b.template.html());b.translateForm.on("submit",function(a){a.preventDefault(),d()}),b.translateText.on("keydown",function(a){clearTimeout(e),a.ctrlKey&&13===a.keyCode?d():e=setTimeout(d,600)})}),require(["js/module/storage"],function(a){a.get(["autoClipboard","defaultApi"]).done(function(a){b.chooseApi.val(a.defaultApi),a.autoClipboard&&require(["js/module/clipboard"],function(a){var c=a.read();c&&(b.translateText.val(c),b.translate.trigger("click"))})})}),require(["js/module/storage"],function(b){var c=a("#switch");b.get("enable").done(function(a){a.enable?c.removeClass("now-is-close"):c.addClass("now-is-close")}),c.on("click",function(){b.get("enable").done(function(a){b.set("enable",!a.enable),a.enable?c.addClass("now-is-close"):c.removeClass("now-is-close")})})}),require(["js/module/clipboard","js/module/apis"],function(c,d){a(document).on("click","[data-action]",function(){var e=a(this),f=e.parent().prev(".text").text(),g=e.data("action");switch(g){case"copy":c.write(f),e.text("已复制"),setTimeout(function(){e.text("复制")},3e3);break;case"read":d.speak({text:f,apiId:b.chooseApi.val(),from:b.from.data("lang")||""})}}),b.read.on("click",function(){var a=b.translateText.val().trim();a?d.speak({text:a,apiId:b.chooseApi.val(),from:b.from.data("lang")||""}):b.translate.trigger("click")})})});