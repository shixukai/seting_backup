define(function(){"use strict";var a=document.createElement("input");return a.style.position="absolute",a.style.top="-99999px",document.body.appendChild(a),Object.freeze({write:function(b){return a.value=b,a.select(),document.execCommand("copy"),this},read:function(){return a.value="",a.focus(),document.execCommand("paste"),a.value}})});