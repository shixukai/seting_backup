/*! Copyright 2009-2015 Evernote Corporation. All rights reserved. */
function WorkchatBackground(){"use strict";function a(a,b){D&&D.removeTab(b.tab)}function b(a){var b=new Thrift.BinaryHttpTransport(extension.getOption("secureProto")+extension.getBootstrapInfo("serviceHost")+"/shard/"+a+"/messagestore"),c=new Thrift.BinaryProtocol(b);return new MessageStoreClient(c)}function c(a,b){var c=/^<msg>(.+?)<\/msg>$/i.exec(a);return c?b?c[1].replace(z,function(a,b,c){if(B.test(b))return a.replace(/<a /,'<a target="_blank" ');var d=A.exec(c);if(d){d=d[0];var e=c.split(d);return c=e.shift(),b+"<a href='"+c+"' target='_blank'>"+c+"</a>"+d+e.join(d)}return b+"<a href='"+c+"' target='_blank'>"+c+"</a>"}):c[1].replace(C,"$1"):""}function d(a){var b=auth.getCurrentUser(),c=[],d=Persistent.get("userIdToIdentityId"),e=Persistent.get("userIdToEmail"),f=Persistent.get("emailToIdentityId"),g=Persistent.get("identities");if(a.userId&&d&&d[b]&&e&&e[b]&&f&&f[b]&&g&&g[b])if(a.contact.type===ContactType.EMAIL){var h=d[b][a.userId];h&&g[b][h]&&c.push(g[b][h])}else if(a.contact.type===ContactType.EVERNOTE){var i=e[b][a.userId];if(i){var h=f[b][i];h&&g[b][h]&&c.push(g[b][h])}}return c}function e(a,b){var c=auth.getCurrentUser();if(c){var d=Persistent.get("emailToUserId"),e=Persistent.get("userIdToIdentityId"),f=Persistent.get("identities");if(d&&d[c]&&e&&e[c]&&f&&f[c]){var g=d[c][a.email];if(g){var h=e[c][g];if(h){var i=f[c][h];Browser.sendToTab(b.tab,{name:"updateEmailContactWithUserId",email:a.email,user:{id:g,name:i.contact.name}})}}}}}function f(a){var b=auth.getCurrentUser(),c=Persistent.get("identities");if(c&&c[b]){var d=g(a);if(c[b][d])return c[b][d]}return null}function g(a){var b=auth.getCurrentUser(),c=Persistent.get("userIdToIdentityId"),d=Persistent.get("emailToUserId"),e=Persistent.get("emailToIdentityId"),f=null;if(c&&c[b]&&d&&d[b]&&e&&e[b])if(a.type===ContactType.EVERNOTE){var g=a.id;f=c[b][g]}else if(a.type===ContactType.EMAIL){var h=a.id,g=d[b][h];f=g?c[b][g]:e[b][h]}return f}function h(a,b,c){function d(a,b){for(var c=0;c<a.length;c++){var d=g(a[c]);if(!d||b.messageThread.participantIds.indexOf(d)<0)return!1}return!0}var e=auth.getCurrentUser();if(e){var f=[];if(a.nameQuery){for(var h=Persistent.get("threadTries"),i=new Trie(h?h[e]:null),j=a.nameQuery.split(/\s+/),k=[],l=0;l<j.length;l++){var m=i.getMatching(j[l],10);k.push([]);for(var o=0;o<m.length;o++)k[k.length-1]=k[k.length-1].concat(m[o][1])}if(k.length)a:for(var l=0;l<k[0].length;l++){for(var o=1;o<k.length;o++)if(k[o].indexOf(k[0][l])<0)continue a;f.push(k[0][l])}}if(a.contacts){var p=Persistent.get("userIdToIdentityId"),q=Persistent.get("emailToUserId"),r=Persistent.get("emailToIdentityId"),s=Persistent.get("identities"),t=Persistent.get("threads");if(p&&p[e]&&q&&q[e]&&r&&r[e]&&s&&s[e]&&t&&t[e])for(var l=0;l<a.contacts.length;l++){var u=g(a.contacts[l]);if(u)for(var v=s[e][u].threadIds,o=0;o<v.length;o++)t[e][v[o]].messageThread.participantIds.length>2&&f.indexOf(v[o])<0&&d(a.requiredContacts,t[e][v[o]])&&f.push(v[o])}}n({threadIds:f,contactSearchNum:a.contactSearchNum},b,c)}}function i(a,b){var c=auth.getCurrentUser();if(c){var e=null,f=Persistent.get("userIdToIdentityId"),g=Persistent.get("emailToUserId"),h=Persistent.get("emailToIdentityId"),i=Persistent.get("identities"),j=Persistent.get("threads"),k=[],l=null;if(i&&i[c]&&j&&j[c]){f&&f[c]||(f={},f[c]={}),g&&g[c]||(g={},g[c]={}),h&&h[c]||(h={},h[c]={});for(var m=0;m<a.contacts.length;m++){var n=null;if(a.contacts[m].type===ContactType.EVERNOTE)n=f[c][a.contacts[m].id];else if(a.contacts[m].type===ContactType.EMAIL){var o=g[c][a.contacts[m].id];n=o?f[c][o]:h[c][a.contacts[m].id]}if(!n){l=[];break}for(var p=i[c][n],q=p.threadIds||[],r=d(p),s=0;s<r.length;s++)r[s].threadIds&&r[s].threadIds.length&&(q=q.concat(r[s].threadIds));if(k.length)k.push(q);else{k.push([]);for(var s=0;s<q.length;s++)k[0].indexOf(q[s])<0&&j[c][q[s]].messageThread.participantIds.length===a.contacts.length+1&&k[0].push(q[s])}}if(k.length||(l=[]),l||(l=k[0].filter(function(a){for(var b=1;b<this.length;b++)if(this[b].indexOf(a)<0)return!1;return!0},k)),l.length){e={id:l[0],participants:[]};for(var t=j[c][e.id].messageThread.participantIds,s=0;s<t.length;s++){var p=i[c][t[s]];p.userId!=c&&e.participants.push({id:p.contact.id,name:p.contact.name,type:p.contact.type})}}}Browser.sendToTab(b.tab,{name:"receiveThreadByGivenContacts",thread:e,updateViewNum:a.updateViewNum})}}function j(a){var b=auth.getCurrentUser(),c=Persistent.get("userProfiles"),d=Persistent.get("emailToUserId");if(c&&c[b]&&d&&d[b])if(a.type===ContactType.EMAIL){var e=d[b][a.id];if(e)return c[b][e]}else if(a.type===ContactType.EVERNOTE){var e=a.id-0;if(c[b][e])return c[b][e]}return null}function k(a,b){function c(){for(var c=[],d=0;d<i.length;d++)if(i[d].type===ContactType.EMAIL){var e=j(i[d]);if(e){e.id!=auth.getCurrentUser()&&c.push({id:e.id,name:e.name,email:e.email,photoUrl:e.photoUrl,role:e.attributes?e.attributes.title:null,sameBusiness:!0,type:ContactType.EVERNOTE});continue}var g=f(i[d]);if(g){g.contact.type===ContactType.EVERNOTE?g.contact.id!=auth.getCurrentUser()&&c.push({id:g.contact.id,name:g.contact.name,email:i[d].id,photoUrl:g.contact.photoUrl,sameBusiness:g.sameBusiness,type:ContactType.EVERNOTE}):c.push(g.contact.type===ContactType.EMAIL?{id:i[d].id,name:i[d].name,email:i[d].id,type:ContactType.EMAIL}:{id:i[d].id,name:i[d].name,email:i[d].id,type:ContactType.EMAIL});continue}for(var h=null,l=0;l<k.length;l++)if(i[d].id===k[l].email){h=k[l];break}if(h){c.push({id:i[d].id,name:i[d].name,email:i[d].id,photoUrl:h.photoUrl,google:!0,type:ContactType.EMAIL});continue}c.push({id:i[d].id,name:i[d].name,email:i[d].id,type:ContactType.EMAIL})}else if(i[d].type===ContactType.EVERNOTE){var e=j(i[d]);e?e.id!=auth.getCurrentUser()&&c.push({id:e.id,name:e.name,email:e.email,photoUrl:e.photoUrl,role:e.attributes?e.attributes.title:null,sameBusiness:!0,type:ContactType.EVERNOTE}):i[d].id!=auth.getCurrentUser()&&c.push({id:i[d].id,name:i[d].name,photoUrl:i[d].photoUrl,type:ContactType.EVERNOTE})}Browser.sendToTab(b.tab,{name:"receiveContacts",contacts:c,contactSearchNum:a.contactSearchNum,query:a.query})}var d=auth.getCurrentUser();if(d){var e=auth.getUserInfo(),g=extension.createNoteStoreClient(e.shardId),h=new ContactsQuery({maxEntries:w,prefix:a.query}),i=null,k=null;g.findContacts(e.authenticationToken,h,function(a){i=a,k&&c()},function(a){console.log(a),i=[],k&&c()});var l=Persistent.get("googleConnection");if(l&&l[d]&&l[d].connected){var m=new JsonRpc(null,["NoteStoreExtra.getGoogleContacts"],extension.getOption("secureProto")+extension.getBootstrapInfo("serviceHost"),extension.getOption("secureProto"),extension.getBootstrapInfo("serviceHost"),extension.getOption("overrideServiceURL"));m.initWithAuthToken(e.authenticationToken,function(){m.client.NoteStoreExtra.getGoogleContacts(function(a,b){a?k=a.contacts&&a.contacts.list?a.contacts.list:[]:(console.log(b),k=[]),i&&c()},e.authenticationToken,null,h.prefix,5)})}else k=[],i&&c()}}function l(a,b){var d=auth.getCurrentUser();if(d){for(var e=Persistent.get("threads"),f=Persistent.get("messages"),g=Persistent.get("threadChanges"),h=Persistent.get("identities"),i=Persistent.get("userIdToIdentityId"),j=Persistent.get("userIdToEmail"),k=Persistent.get("emailToIdentityId"),l=e[d][a.threadId],m=(l.messageThread.messageIds||[]).concat(l.messageThread.threadChangeIds||[]),n=[],o=0;o<m.length;o++){var p=m[o];if(!(p<=(a.afterMessageId||0))){var q=f[d][p]||g[d][p],r=q.senderId||q.changedByUserId,s=null,t=i[d][r];if(t)s=h[d][t];else{var u=j[d][r];if(u){var v=k[d][u];v&&(s=h[d][v])}}n.push({attachments:q.attachments,body:q.body?c(q.body,!0):null,changeType:q.changeType,changeValue:function(){if(q.identityValue){var a=q.identityValue;if(h[d][a.id]){var b=h[d][a.id].userId;if(b){var c=i[d][b];if(c){var e=h[d][c];e&&(a=e)}}}return{name:a.contact.name,email:a.contact.type===ContactType.EMAIL?a.contact.id:null,id:a.userId,self:a.userId==d}}return q.stringValue?q.stringValue:void 0}(),id:q.id,reshareMessage:q.reshareMessage,sender:s?{name:s.contact.name,email:s.contact.type===ContactType.EMAIL?s.contact.id:null,photoUrl:s.contact.photoUrl,self:d==r,id:r}:null,time:q.sentAt||q.changedAt,threadName:q.stringValue})}}n.sort(function(a,b){return a.time>b.time?1:a.time<b.time?-1:0}),Browser.sendToTab(b.tab,{name:"receiveMessagesOfThread",authToken:auth.getUserInfo().authenticationToken,baseUrl:extension.getOption("secureProto")+extension.getBootstrapInfo("serviceHost"),lastReadMessageId:l.lastReadMessageId,threadId:a.threadId,messages:n,update:a.afterMessageId?!0:!1,updateViewNum:a.updateViewNum})}}function m(a,b){var c=auth.getCurrentUser();if(c){var d=Persistent.get("threads"),e=Persistent.get("identities");if(d&&d[c]){var f=d[c][a.threadId];if(f){for(var g=[],h=0;h<f.messageThread.participantIds.length;h++){var i=f.messageThread.participantIds[h];if(e[c][i].userId!=c){var k=e[c][i].contact,l=j(k);g.push({id:k.id,name:k.name,type:k.type,sameBusiness:!!l})}}Browser.sendToTab(b.tab,{name:"receiveMetadataOfThread",participants:g,title:f.messageThread.name})}}}}function n(a,b){var c=auth.getCurrentUser();if(c){var d=Persistent.get("threads");if(d&&d[c]){var e=[];if(a.threadIds)for(var f=0;f<a.threadIds.length;f++){var g=d[c][a.threadIds[f]];g&&e.push(g.messageThread)}else{for(var h in d[c])e.push(d[c][h].messageThread);e.sort(function(a,b){var c=a.messageIds||[],d=a.threadChangeIds||[],e=b.messageIds||[],f=b.threadChangeIds||[],g=a.threadMaxMessageId||Math.max(c[c.length-1],d[d.length-1]),h=b.threadMaxMessageId||Math.max(e[e.length-1],f[f.length-1]);return g>h?-1:h>g?1:0})}for(var i=[],k=Persistent.get("identities"),f=0;f<e.length;f++)if(e[f].messageIds&&e[f].messageIds.length||e[f].threadChangeIds&&e[f].threadChangeIds.length){for(var l=e[f].participantIds,m=[],n=[],o=0;o<l.length;o++){var p=l[o];if(k[c][p].userId!=c){var q=k[c][p].contact,r=j(q);m.push({id:q.id,name:q.name,type:q.type,sameBusiness:!!r}),n.push(q.photoUrl)}}if(i.push({id:e[f].id,name:e[f].name,snippet:e[f].snippet,participants:m,photos:n}),i.length===v)break}Browser.sendToTab(b.tab,{name:"receiveThreads",threads:i,contactSearchNum:a.contactSearchNum})}}}function o(a,b){if(!extension.getBootstrapInfo("enableGoogle"))return void Browser.sendToTab(b.tab,{name:"isGoogleConnected",connected:!0});var c=auth.getCurrentUser();if(c){var d=Persistent.get("googleConnection");d&&d[c]&&d[c].connected?Browser.sendToTab(b.tab,{name:"isGoogleConnected",connected:!0}):Browser.sendToTab(b.tab,{name:"isGoogleConnected",connected:!1,connectUrl:extension.getOption("secureProto")+extension.getBootstrapInfo("serviceHost")+"/GoogleData.action?connect&oauthSourcePage=connectedServices"})}}function p(a,b){if(window.WebSocket){var c=auth.getUserInfo().shardId,d=auth.getUserInfo().authenticationToken;(!D||D.getShardId()!==c||D.getAuthToken()!==d||D.isClosed())&&(D=new WebSocketManager(c,d,function(a){if(a.messageNotification){var b=auth.getCurrentUser(),c=auth.getUserInfo();E&&E.getAuthToken()===c.authenticationToken||(E=r(b,c)),E.setSyncCompleteHandler(function(){for(var a=D.getTabs(),b=0;b<a.length;b++)Browser.sendToTab(a[b],{name:"updateView"})});var d=Persistent.get("messageEventUSN");!d||!d[b]||a.messageNotification.previousEventId>d[b]?E.sync():E.applySyncChunk(a.messageNotification.syncChunk)}})),D.addTabs(b.tab)}}function q(a){function c(a){console.log(a)}function d(a){console.log(a)}function e(){a.threadRecipient?(j.messageThreadId=a.threadRecipient,i.sendMessageToThread(h.authenticationToken,j,c,function(a){"EDAMSystemException"===a.__proto__.name&&a.errorCode===EDAMErrorCode.UNSUPPORTED_OPERATION?f():d(a)})):i.createMessageThread(h.authenticationToken,new CreateMessageThreadSpec({message:j,participants:m,groupThread:m.length+1>2}),c,function(a){"EDAMSystemException"===a.__proto__.name&&a.errorCode===EDAMErrorCode.UNSUPPORTED_OPERATION?f():d(a)})}function f(){var b=new Destination;a.threadRecipient?b.messageThreadId=a.threadRecipient:b.recipients=m,i.sendMessage(h.authenticationToken,j,b,c,d)}var g=auth.getCurrentUser();if(g){var h=auth.getUserInfo(),i=b(h.shardId);a.body=GlobalUtils.escapeXML(a.body).replace(/\n/g,"<br/>");var j=new Message({body:"<msg>"+a.body+"</msg>"});if(a.attachments&&a.attachments.length){j.attachments=[];for(var k=0;k<a.attachments.length;k++){var l=new MessageAttachment({guid:a.attachments[k].guid,shardId:a.attachments[k].shardId,title:a.attachments[k].title,type:MessageAttachmentType.NOTE,userId:a.attachments[k].userId-0});j.attachments.push(l)}}for(var m=[],k=0;k<a.contactRecipients.length;k++)m.push(new Contact({id:a.contactRecipients[k].id,type:a.contactRecipients[k].type}));if(j.attachments&&j.attachments[0]){var n=extension.createNoteStoreClient(a.noteShardId);n.createOrUpdateSharedNotes(a.noteToken,new SharedNoteTemplate({noteGuid:j.attachments[0].guid,recipients:m,privilege:a.noteSharePrivilege}),e,function(b){extension.isThriftError(b)&&"EDAMInvalidContactsException"===b.__proto__.name?(m=m.filter(function(a){for(var c=0;c<b.contacts.length;c++)if(b.contacts[c].id===a.id&&b.contacts[c].type===a.type)return!1;return!0}),n.createOrUpdateSharedNotes(a.noteToken,new SharedNoteTemplate({noteGuid:j.attachments[0].guid,recipients:m,privilege:a.noteSharePrivilege}),e,function(a){console.log(a)})):console.log(b)})}else e()}}function r(a,d){return new Syncer(a,d.authenticationToken,"messageEvent",[{name:"identities",idPropertyChain:["id"],updateItem:function(a,b){return a&&(b.threadIds=a.threadIds),b},extraHandling:function(b){if(b.userId){if(b.contact.type===ContactType.EVERNOTE){var c=Persistent.get("userIdToIdentityId");c||(c={}),c[a]||(c[a]={}),c[a][b.userId]||(c[a][b.userId]=b.id,Persistent.set("userIdToIdentityId",c))}else if(b.contact.type===ContactType.EMAIL){var d=Persistent.get("emailToUserId");d||(d={}),d[a]||(d[a]={}),d[a][b.contact.id]=b.userId,Persistent.set("emailToUserId",d);var e=Persistent.get("userIdToEmail");e||(e={}),e[a]||(e[a]={}),e[a][b.userId]=b.contact.id,Persistent.set("userIdToEmail",e);var f=Persistent.get("emailToIdentityId");f||(f={}),f[a]||(f[a]={}),f[a][b.contact.id]=b.id,Persistent.set("emailToIdentityId",f)}}else if(b.contact.type===ContactType.EVERNOTE);else if(b.contact.type===ContactType.EMAIL){var f=Persistent.get("emailToIdentityId");f||(f={}),f[a]||(f[a]={}),f[a][b.contact.id]=b.id,Persistent.set("emailToIdentityId",f)}return{}}},{name:"threads",idPropertyChain:["messageThread","id"],updateItem:function(a,b){return a&&(b.messageThread.messageIds=a.messageThread.messageIds,b.messageThread.threadChangeIds=a.messageThread.threadChangeIds,b.messageThread.snippet=a.messageThread.snippet),b},extraHandling:function(b,c){var d={};if(b.maxDeletedMessageId){var e=Persistent.get("messages");if(e&&e[a]&&b.messageThread.messageIds){for(;b.messageThread.messageIds.length;){var f=b.messageThread.messageIds[0];if(!(f<=b.maxDeletedMessageId))break;delete e[a][f],b.messageThread.messageIds.shift()}d.item=b,d.messages=e[a]}}for(var g=b.messageThread.id,h=0;h<b.messageThread.participantIds.length;h++){var i=b.messageThread.participantIds[h];c.identities[i].threadIds||(c.identities[i].threadIds=[]),c.identities[i].threadIds.indexOf(g)<0&&(c.identities[i].threadIds.push(g),d.identities=c.identities)}var j=Persistent.get("threadTries");j||(j={});var k=new Trie(j[a]),l=b.messageThread.name;if(l)for(var m=l.split(/\s+/),h=0;h<m.length;h++)k.insert(m[h],b.messageThread.id);return j[a]=k.getPersistableForm(),Persistent.set("threadTries",j),d}},{name:"messages",idPropertyChain:["id"],updateItem:function(a,b){return b},extraHandling:function(a,b){var d=b.threads[a.messageThreadId];d.messageThread.messageIds||(d.messageThread.messageIds=[]);var e=d.messageThread.messageIds.length;if(!e||a.id>d.messageThread.messageIds[e-1]){a.reshareMessage||(d.messageThread.snippet=c(a.body,!1)),a.id>d.maxDeletedMessageId&&d.messageThread.messageIds.push(a.id);var f={threads:b.threads};return a.id<=d.maxDeletedMessageId&&(f.item=null),f}return{}}},{name:"threadChanges",idPropertyChain:["id"],updateItem:function(a,b){return b},extraHandling:function(a,b){var c=b.threads[a.messageThreadId];if(a.changeType===MessageThreadChangeType.PARTICIPANT_REMOVED&&a.identityValue.userId==auth.getCurrentUser())return c.messageThread.messageIds=[],c.messageThread.threadChangeIds=[],{threads:b.threads};c.messageThread.threadChangeIds||(c.messageThread.threadChangeIds=[]);var d=c.messageThread.threadChangeIds.length;if(!d||a.id>c.messageThread.threadChangeIds[d-1]){a.id>c.maxDeletedMessageId&&c.messageThread.threadChangeIds.push(a.id);var e={threads:b.threads};return a.id<=c.maxDeletedMessageId&&(e.item=null),e}return{}}}],"chunkMaxEventId","userMaxEventId",function(a,c,e){var f=b(d.shardId);f.getMessageSyncChunk(d.authenticationToken,new MessageSyncFilter({afterEventId:a}),c,e)},y,function(){for(var b=["emailToIdentityId","userIdToIdentityId","threadTries"],c=0;c<b.length;c++){var d=Persistent.get(b[c]);d&&delete d[a],Persistent.set(b[c],d)}})}function s(a,b){var c=auth.getCurrentUser();if(c){var d=auth.getUserInfo();E&&E.getAuthToken()===d.authenticationToken||(E=r(c,d)),E.setSyncCompleteHandler(function(){a&&a.responseName&&b&&b.tab&&Browser.sendToTab(b.tab,{name:a.responseName})}),E.sync(),d.bizAuthenticationToken&&t()}}function t(){var a=auth.getCurrentUser(),b=auth.getUserInfo().bizAuthenticationToken,c=Persistent.get("businessUsersSynced");if(!c||!c[a]||c[a].version<x||c[a].lastDay+864e5+c[a].offset<=new Date){var d=extension.createUserStoreClient(/S=(.+?):/.exec(b)[1]);d.listBusinessUsers(b,function(a){var b=auth.getCurrentUser(),c=Persistent.get("emailToUserId");c||(c={}),c[b]||(c[b]={});var d=Persistent.get("userIdToEmail");d||(d={}),d[b]||(d[b]={});var e=Persistent.get("userProfiles");e||(e={}),e[b]||(e[b]={});for(var f=0;f<a.length;f++)e[b][a[f].id]=a[f],c[b][a[f].email]=a[f].id,d[b][a[f].id]=a[f].email;Persistent.set("emailToUserId",c),Persistent.set("userIdToEmail",d),Persistent.set("userProfiles",e);var g=Persistent.get("businessUsersSynced");g||(g={}),g[b]||(g[b]={}),g[b].version=x;var h=new Date;g[b].lastDay=new Date(h.getFullYear(),h.getMonth(),h.getDate())-0,g[b].offset&&(g[b].offset=Math.floor(24*Math.random()*60*60*1e3)),Persistent.set("businessUsersSynced",g)},function(a){console.log(a)})}}function u(a){var c=b(auth.getUserInfo().shardId);c.updateReadStatus(auth.getUserInfo().authenticationToken,a.threadId,a.messageId,function(a){console.log(a)},function(a){console.log(a)})}var v=3,w=10,x=1,y=1,z=/(.*?)(https?:\/\/\S+)/gi,A=/'|&#x27;|"|&quot;|\(|\)|<|&lt;|&#x3c;|&#60;|>|&gt;|&#x3e;|&#62;/i,B=/<a\s+href\s*=\s*['"]\s*$/i,C=/<a\s+href\s*=\s*['"][^'"]+['"][^>]*>([^<]*)<\/a>/gi,D=null,E=null;Browser.addMessageHandlers({closeWebSocket:a,findContactByEmail:e,findThreads:h,findThreadByGivenContacts:i,findWorkchatContacts:k,getMessagesOfThread:l,getMetadataOfThread:m,getThreads:n,isGoogleConnected:o,openWebSocket:p,sendChat:q,syncMessages:s,updateThreadReadStatus:u}),this.sync=s,Object.preventExtensions(this)}Object.preventExtensions(WorkchatBackground);