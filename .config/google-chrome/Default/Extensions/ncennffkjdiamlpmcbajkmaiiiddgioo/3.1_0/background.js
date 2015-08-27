/*
	thunder network
*/

var port = null;
var bPluginEnabled = true;
var bException = false;
var bMoniterDynamicLinks = true;
var blackListWebsites;
var blackListPages;

var bMonitorEmule = false;
var bMonitorMagnet = false;
var bMonitorTradition = false;
var bMonitorIE = false;

var strMonitorDemain;
var strFilterDemain;
var strMonitorFileExt;

var bUseChromeDownloadAPI = chrome.downloads ? true : false;
var bSelfQuit = false;
//var bUseChromeDownloadAPI = false;

var linkItem = "" // 记录page传过来的ctrl+link的项

function GetIsMonitorProtocol(protocolType)
{
    var getIsMonitorProtocol = { "funcName": "GetIsMonitorProtocol", "paramters": [protocolType] };

    sendNativeMsg(getIsMonitorProtocol);
}

function GetFiters(fitersType) {
    var getFiters = { "funcName": "GetFiters", "paramters": [fitersType] };

    sendNativeMsg(getFiters);
}

function GetBlackListWebsites()
{
    var getBlackListWebSites = { "funcName": "GetBlackListWebsites", "paramters": [] };

    sendNativeMsg(getBlackListWebSites);
}

function GetBlackListPages()
{
	var getBlackListPages = { "funcName": "GetBlackListPages", "paramters": [] };

    sendNativeMsg(getBlackListPages);
}

function SetPluginEnabled(bEnabled) {

    connectNativeApp();	
    
	chrome.tabs.getSelected(null,
			function(tab)
			{
				chrome.tabs.sendMessage(tab.id, {name:"UpdatePluginEnabled", enable:bEnabled});
			}
		);
	
	
	bPluginEnabled = bEnabled;
	
	bPluginEnabled ? SetToolbarEnableStatus() : SetToolbarDisableStatus();
	
	UpdateContextMenu(bEnabled);	

	var setPluginEnabled = { "funcName": "SetPluginEnabled", "paramters": [bEnabled] };

	sendNativeMsg(setPluginEnabled);

	SendQuitChrome();
}

function SetMoniterDynamicLinks(bMonitor) {

    connectNativeApp();
    
    chrome.tabs.getSelected(null,
		function(tab) {
		    chrome.tabs.sendMessage(tab.id, { name: "UpdateMoniterDynamicLinks", enable: bMonitor });
		}
	);

    bMoniterDynamicLinks = bMonitor;

    var setMoniterDynamicLinks = { "funcName": "SetMoniterDynamicLinks", "paramters": [bMonitor] };

    sendNativeMsg(setMoniterDynamicLinks);

    SendQuitChrome();
}

function InitPluginEnabled()
{	
    var getEnabled = { "funcName": "GetPluginEnabled", "paramters": [] };

    sendNativeMsg(getEnabled);
}

function GetMoniterDynamicLinks() {
    var getMoniterDynamicLinks = { "funcName": "GetMoniterDynamicLinks", "paramters": [] };

    sendNativeMsg(getMoniterDynamicLinks);
}


function OnFeedback() {
    connectNativeApp();
    var feedback = { "funcName": "Feedback", "paramters": [] };

    sendNativeMsg(feedback);
}

function AddBlackListPage(url) {
    connectNativeApp();
    
	for (var i in blackListPages)
	{
		if (blackListPages[i] == url)
		{
			// 去重
			return;
		}
	}	

	var addBlackListPage = { "funcName": "AddBlackListPage", "paramters": [url] };
	sendNativeMsg(addBlackListPage);
	
	SetToolbarStatus(bException, bPluginEnabled, true, false);
}

function RemoveBlackListPage(url) {
    connectNativeApp();
	for (var i in blackListPages)
	{
		if (blackListPages[i] == url)
		{			
			var removeBlackListPage = { "funcName": "RemoveBlackListPage", "paramters": [url] };
	        sendNativeMsg(removeBlackListPage);
			
			SetToolbarStatus(bException, bPluginEnabled, true, true);
	
			return;
		}
	}
}

function AddBlackListWebsite(url) {
    connectNativeApp();
	for (var i in blackListWebsites)
	{
		if (blackListWebsites[i] == url)
		{
			// 去重
			return;
		}
	}	

	var addBlackListWebsite = { "funcName": "AddBlackListWebsite", "paramters": [url] };
	sendNativeMsg(addBlackListWebsite);
	
	SetToolbarStatus(bException, bPluginEnabled, false, true);
}

function RemoveBlackListWebsite(url) {
    connectNativeApp();
	for (var i in blackListWebsites)
	{
		if (blackListWebsites[i] == url)
		{
		    var removeBlackListWebsite = { "funcName": "RemoveBlackListWebsite", "paramters": [url] };
		    sendNativeMsg(removeBlackListWebsite);
			
			SetToolbarStatus(bException, bPluginEnabled, true, true);
		    
			return;
		}
	}
}

function CheckIsWebsiteInUserBlackList(url)
{
	for (var i in blackListWebsites)
	{
		if (url.indexOf(blackListWebsites[i]) == 0)
		{
			// 匹配
			return true;
		}
	}
	
	return false;
}

function CheckIsPageInUserBlackList(url)
{
	for (var i in blackListPages)
	{
		if (url == blackListPages[i])
		{
			// 匹配
			return true;
		}
	}
	
	return false;
}

function CanDownload(refUrl, url)
{
	if (!bPluginEnabled)
	{
		return false;
	}
	
	if (CheckIsWebsiteInUserBlackList(refUrl))
	{
		return false;
	}
	
	if (CheckIsPageInUserBlackList(refUrl))
	{
		return false;
	}
	
	if (!IsMoniterUrl(url, refUrl))
	{
		return false;
	}
	
	return true;
}

// menu click
function onStartupThunder(info, tab) {
    chrome.cookies.getAll({ url: info.pageUrl }, function(cookies) {
        var cookie = "";
        for (i in cookies) {
            cookie = cookie.concat(cookies[i].name, "=", cookies[i].value, "; ");
        };

        InvokeThunder(info.linkUrl, cookie, info.pageUrl, 3);        
    });
}

/*
* 打印 JavaScript 函数调用堆栈
*/
function printCallStack() {
    var i = 0;
    var fun = arguments.callee;
    do {
        fun = fun.arguments.callee.caller;
        console.log(++i + ': ' + fun);
    } while (fun);
}  


// invoke thunder
function InvokeThunder(link, cookie, referurl, sourceNum) {
	var g_strSplitter = "#@$@#";
	var strUrls = referurl;
	strUrls = strUrls.concat(g_strSplitter);
	strUrls = strUrls.concat(1, g_strSplitter);
	
	strUrls = strUrls.concat(link, g_strSplitter);
	strUrls = strUrls.concat("", g_strSplitter);
	strUrls = strUrls.concat("", g_strSplitter);
	strUrls = strUrls.concat(cookie, g_strSplitter);
	strUrls = strUrls.concat("", g_strSplitter);
	strUrls = strUrls.concat("", g_strSplitter);

	connectNativeApp();	

	var sendBhoLaunchSourceStat = { "funcName": "SendBhoLaunchSourceStat", "paramters": [sourceNum, link] };

	sendNativeMsg(sendBhoLaunchSourceStat);

	var downLoadByThunder = { "funcName": "DownLoadByThunder", "paramters": [strUrls] };

	sendNativeMsg(downLoadByThunder);

	SendQuitChrome();

	//printCallStack();
}

function IsValidUrlAndMonitorProtocol(url) {
    var s_strTraditionSchemeHeaders = "HTTP://FTP://THUNDER://MMS://MMST://RTSP://RTSPU://XLAPP://";
    var s_strEmuleSchemeHeader = "ED2K://";
    var s_strMagentSchemeHeader = "MAGNET:?";

    if (url.length == 0) {
        return false;
    }

    var strUrl = url;
    var nPos = strUrl.indexOf(':');
    if (nPos == -1) {
        return false;
    }

    var strScheme = strUrl.substr(0, nPos + 1);
    var scheme = strScheme.toUpperCase();
    if (scheme == "") {
        return false;
    }

    var bRet = true;

    if (s_strEmuleSchemeHeader.indexOf(scheme) != -1) {
        if (bMonitorEmule == false) {
            bRet = false;
        }

    }
    else if (s_strMagentSchemeHeader.indexOf(scheme) != -1) {
        if (bMonitorMagnet == false) {
            bRet = false;
        }

    }
    else if (s_strTraditionSchemeHeaders.indexOf(scheme) != -1) {
        if (bMonitorTradition == false) {
            bRet = false;
        }

    }
    else {
        bRet = false;
    }

    return bRet;
}

function IsMonitorDemain(referer) {
    if (referer.length == 0) {
        return true;
    }

    //取得黑名单列表
    var arrDemain = new Array();
    var arrTemp = strMonitorDemain.split("||");
    for (var i in arrTemp) {
        var t = arrTemp[i].slice(2);
        var t2 = t.trimRight('|');
        arrDemain.push(t2);
    }

    //检查
    var bMonitor = true;
    var strUrl = referer;

    for (var j in arrDemain) {
        if (arrDemain[j].length > 0 && strUrl.indexOf(arrDemain[j]) != -1) {
            bMonitor = false;
            break;
        }
    }

    return bMonitor;
}


function IsFilterDemain(url) {
    if (url.length == 0) {
        return false;
    }

    if (strFilterDemain.length == 0) {
        return false;
    }

    var arrFilterDemain = new Array();
    var arrTemp = strFilterDemain.split("||");
    for (var i in arrTemp) {
        var t = (arrTemp[i].slice(2)).toLowerCase();
        var t2 = t.trimRight('|');
        arrFilterDemain.push(t2);
    }

    var bFilterDemain = false;
    var strUrl = url.toLowerCase();

    for (var j in arrFilterDemain) {
        if (arrFilterDemain[j] > 0 && strUrl.indexOf(arrFilterDemain[j]) != -1) {
            bFilterDemain = true;
            break;
        }
    }

    return bFilterDemain;
}

function GetExtensionFileName(pathfilename) {
    var reg = /(\\+)/g;
    var pfn = pathfilename.replace(reg, "#");
    var arrpfn = pfn.split("#");
    var fn = arrpfn[arrpfn.length - 1];
    var arrfn = fn.split(".");

    return arrfn[arrfn.length - 1];
}

function IsMonitorFileExt(url) {
    if (url.length == 0) {
        return false;
    }

    var nPos = url.indexOf(':');
    if (nPos == -1) {
        return false;
    }

    var strUrl = url.toLowerCase();
    var strScheme = strUrl.substr(0, nPos + 3);
    var scheme = strScheme.trimLeft(' ');

    if (scheme == ("xlapp://")) {
        //插件专用链   不检查后缀
        return true;
    }

    //电驴和磁力链接任务不需要比较后缀名
    if ((strUrl.indexOf("ed2k://") != -1) || (strUrl.indexOf("magnet:?") != -1)) {
        return true;
    }

    var bRet = false;
    var strExt = GetExtensionFileName(strUrl);
    if (strExt.length > 0) {
        strExt += ";";
        if (strMonitorFileExt.indexOf(strExt) != -1) {
            bRet = true;
        }
    }


    return bRet;
}

function IsMoniterUrl(url, referer) {

    if (url.length == 0) {
        return false;
    }

    if (bMonitorIE == false)				//不监视浏览器
    {
        return false;
    }

    if (IsValidUrlAndMonitorProtocol(url) == false)	//非法URL
    {
        return false;
    }

    if (IsMonitorDemain(referer) == false)	//不监视域名(配置面板的)
    {
        return false;
    }

    if (IsFilterDemain(referer))	//过滤的域名(服务器更新的)
    {
        return false;
    }

//    if (IsMonitorFileExt(url) == false)	//不监视后缀
//    {
//        return false;
//    }
   
    return true;

    //var isMoniterURL = { "funcName": "IsMoniterURL", "paramters": [url, referUrl] };

    //sendNativeMsg(isMoniterURL);
}

function IsDownloadURL(linkUrl, cookie, href) {
    connectNativeApp();
    var isDownloadURL = { "funcName": "IsDownloadURL", "paramters": [linkUrl, cookie, href] };

    sendNativeMsg(isDownloadURL);
}

// 创建右键菜单
function CreateContextMenu(bEnableMenu)
{
	chrome.contextMenus.create({id:"ThunderContextMenu", type:"normal", title:chrome.i18n.getMessage("context_title"), contexts:["link"], onclick:onStartupThunder, enabled:bEnableMenu});
}

// 更新右键菜单
function UpdateContextMenu(bEnableMenu)
{
	chrome.contextMenus.update("ThunderContextMenu", {enabled:bEnableMenu});
}

// 更新工具栏标记
function UpdataToolbarBadgeText(text)
{
	chrome.browserAction.setBadgeText({text:text});
}

// 更新工具栏tips
function UpdataToolbarTips(text)
{
	chrome.browserAction.setTitle({title:text});
}

// 更新工具栏图标
function UpdateBrowserActionIcon(iconPath)
{
	chrome.browserAction.setIcon({path:iconPath});
}

function RegisterEventListener()
{
	chrome.tabs.onActivated.addListener(
		function (activeInfo)
		{
			chrome.tabs.sendMessage(activeInfo.tabId, {name:"OnActivated"});
		}
	);

	chrome.extension.onRequest.addListener(
		function(request, sender, response) {
		    if (request.name == "xl_download") {
		        InvokeThunder(request.link, request.cookie, request.referurl, 1);
		    }
		    else if (request.name == "CheckEnabled") {
		        var bPlugin = bPluginEnabled;
		        var bWebsite = !CheckIsWebsiteInUserBlackList(request.url);
		        var bPage = !CheckIsPageInUserBlackList(request.url);

		        response({ bPlugin: bPlugin, bWebsite: bWebsite, bPage: bPage });
				
				SetToolbarStatus(bException, bPluginEnabled, bWebsite, bPage);
		    }
		    else if (request.name == "CheckbMoniterDynamicLinks") {
		        response({ bMoniterDynamicLinks: bMoniterDynamicLinks });
		    }
		    else if (request.name == "CheckChromeDownloadAPIEnabled") {
		        response({ bEnabled: bUseChromeDownloadAPI });
		    }
		    else if (request.name == "xl_check_url") {
		        IsDownloadURL(request.link, request.cookie, request.referurl);
		    }
		    else if (request.name == "GetConfig") {
		        response({ bMonitorEmule: bMonitorEmule, bMonitorMagnet: bMonitorMagnet, bMonitorTradition: bMonitorTradition, bMonitorIE: bMonitorIE, strMonitorDemain: strMonitorDemain, strFilterDemain: strFilterDemain, strMonitorFileExt: strMonitorFileExt });
		    }
			else if (request.name == "CtrlLinkItem")
			{
				linkItem = request.link;
			}
		}
	);

	if (bUseChromeDownloadAPI)
	{
		chrome.downloads.onCreated.addListener(
			function callback(item)
			{
				if (item.state == "complete" || item.state == "interrupted") {
					// 此api的一个坑，首次安装会将下载列表已下载过的东西全部下一遍
					// console.debug("%s %s %s", item.state, " :", item.url);
					return;
				}
				if (linkItem == item.url)
				{
					// 按ctrl键，则不监视
					linkItem = "";
					return;
				}
				
				if (!CanDownload(item.referrer, item.url)) {
					return;
				}

				connectNativeApp();
				var sendBhoLaunchSourceStat = { "funcName": "SendBhoLaunchSourceStat", "paramters": [2, item.url] };

				sendNativeMsg(sendBhoLaunchSourceStat);

				SendQuitChrome();		    

				if (!bMoniterDynamicLinks)
				{
					return;
				}

				// 取消chrome默认下载
				chrome.downloads.cancel(item.id);

				// 删除下载记录，有时默认下载会先执行，因为异步，防止出现默认下载框
				chrome.downloads.erase({ id: item.id },
					function(ids) {
						//
					}
				);

				// 关闭chrome新建下载留存的tab
				chrome.tabs.query({ url: item.url },
					function queryResult(tabArray) {
						if (tabArray[0]) {
							chrome.tabs.remove(tabArray[0].id);
						}
					}
				);

				// 获取引用页的cookie
				chrome.tabs.query({ url: item.referrer },
					function queryResult(tabArray)
					{
						if (tabArray[0])
						{
							chrome.tabs.sendMessage(tabArray[0].id, { name: "GetCookie" },
								function(resp)
								{
									var realCookie = "";
									if (resp.cookie)
									{
										realCookie = resp.cookie;
									}
									InvokeThunder(item.url, realCookie, item.referrer, 1);
								}
							);
						}
						else {
							// 引用页未查到，使用空cookie
							InvokeThunder(item.url, "", item.referrer, 1);
						}
					}
				);
			}
		);
	}
}

function sendNativeMsg(msg) {
    if (port != null) {
        port.postMessage(msg);
        console.log("sendNativeMsg msg:%s sucess!", msg);
    }
    else {
        console.log("sendNativeMsg failed!");
    }
}

function onNativeMessage(message) 
{
    console.log(JSON.stringify(message) );
    //alert(JSON.stringify(message) );

    if (message.funcName == "GetPluginEnabled") {
        var ret = message.result;
        bPluginEnabled = ret[0].retVal;


        UpdateContextMenu(bPluginEnabled);
		
		bPluginEnabled ? SetToolbarEnableStatus() : SetToolbarDisableStatus();

		GetMoniterDynamicLinks();
		GetBlackListWebsites();
		GetBlackListPages();
		GetIsMonitorProtocol("MonitorEmule");
		GetIsMonitorProtocol("MonitorMagnet");
		GetIsMonitorProtocol("MonitorTradition");
		GetIsMonitorProtocol("MonitorIE");
		GetFiters("MonitorDemain");
		GetFiters("FilterDemain");
		GetFiters("MonitorFileExt");         
    }
    else if (message.funcName == "GetMoniterDynamicLinks") {
        var ret = message.result;
        bMoniterDynamicLinks = ret[0].retVal;
    }
    else if (message.funcName == "GetIsMonitorProtocol") {
        var ret = message.result;

        if (ret[0].retVal) {
            var val = message.paramters;
            if (val[0] == "MonitorEmule") {
                bMonitorEmule = ret[1].value;
            }
            else if (val[0] == "MonitorMagnet") {
                bMonitorMagnet = ret[1].value;
            }
            else if (val[0] == "MonitorTradition") {
                bMonitorTradition = ret[1].value;
            }
            else if (val[0] == "MonitorIE") {
                bMonitorIE = ret[1].value;
            }
        }
    }
    else if (message.funcName == "GetFiters") {
        var ret = message.result;

        if (ret[0].retVal) {
            var val = message.paramters;
            if (val[0] == "MonitorDemain") {
                strMonitorDemain = ret[1].value;
            }
            else if (val[0] == "FilterDemain") {
                strFilterDemain = ret[1].value;
            }
            else if (val[0] == "MonitorFileExt") {
                strMonitorFileExt = ret[1].value;
            }
        }

        SendQuitChrome();
    }
    else if (message.funcName == "GetBlackListWebsites") {
        var ret = message.result;

        if (ret[0].retVal) {
            blackListWebsites = ret[1].blackList;
        }
        else {
            blackListWebsites = new Array();
        }
    }
    else if (message.funcName == "GetBlackListPages") {
        var ret = message.result;

        if (ret[0].retVal) {
            blackListPages = ret[1].blackList;
        }
        else {
            blackListPages = new Array();
        }
    }
    else if (message.funcName == "Feedback") {
        var ret = message.result;

        bPluginEnabled = ret[0].retVal;

        SendQuitChrome();
    }
    else if (message.funcName == "AddBlackListPage") {
        var ret = message.result;

        if (ret[0].retVal) {
			chrome.tabs.getSelected(null,
				function(tab) {
					chrome.tabs.sendMessage(tab.id, { name: "UpdatePageEnabled", enable: false });
				}
			);
            
            var val = message.paramters;

            blackListPages[blackListPages.length] = val[0];
        }

        SendQuitChrome();
    }
    else if (message.funcName == "RemoveBlackListPage") {
        var ret = message.result;

        if (ret[0].retVal) {            
			chrome.tabs.getSelected(null,
				function(tab) {
					chrome.tabs.sendMessage(tab.id, { name: "UpdatePageEnabled", enable: true });
				}
			);
            
            var val = message.paramters;
            for (var i in blackListPages) {
                if (blackListPages[i] == val[0]) {
                    delete blackListPages[i];
                }
            }
        }

        SendQuitChrome();
    }
    else if (message.funcName == "AddBlackListWebsite") {
        var ret = message.result;

        if (ret[0].retVal)
		{            
			chrome.tabs.getSelected(null,
				function(tab) {
					chrome.tabs.sendMessage(tab.id, { name: "UpdateWebsiteEnabled", enable: false });
				}
			);
			
            var val = message.paramters;
            blackListWebsites[blackListWebsites.length] = val[0];
        }

        SendQuitChrome();
    }
    else if (message.funcName == "RemoveBlackListWebsite") {
        var ret = message.result;

        if (ret[0].retVal)
		{            
			chrome.tabs.getSelected(null,
				function(tab) {
					chrome.tabs.sendMessage(tab.id, { name: "UpdateWebsiteEnabled", enable: true });
				}
			);            

            var val = message.paramters;
            for (var i in blackListWebsites)
			{
                if (blackListWebsites[i] == val[0])
				{
                    delete blackListWebsites[i];
                }
            }
        }

        SendQuitChrome();
    }
//    else if (message.funcName == "SendBhoLaunchSourceStat") {
//        var ret = message.result;

//        if (ret[0].retVal) {

//            var val = message.paramters;

//            var sendBhoLaunchSourceStat = { "funcName": "SendBhoLaunchSourceStat", "paramters": [2, val[0]] };

//            sendNativeMsg(sendBhoLaunchSourceStat);
//        }

//    }
    else if (message.funcName == "IsDownloadURL")
	{
        var ret = message.result;

        var val = message.paramters;
        if (ret[0].retVal) {
            InvokeThunder(val[0], val[1], val[2], 1);
        }
        else {
            window.open(val[0]);
        }
        SendQuitChrome();
    }
}

function SetToolbarStatus(bPluginException, bPluginEnabled, bWebsiteEnabled, bPageEnabled)
{
	do
	{
		if (bPluginException)
		{
			SetToolbarExceptionStatus();
			break;
		}
		
		if (!bPluginEnabled)
		{
			SetToolbarDisableStatus();
			break;
		}
		
		if (bWebsiteEnabled && bPageEnabled)
		{
			SetToolbarEnableStatus();
			break;
		}
		else
		{
			SetToolbarPageDisableStatus();
			break;
		}
	} while (false);
}

function SetToolbarEnableStatus()
{
	UpdateBrowserActionIcon("images/icon19_normal.png");
	UpdataToolbarTips("迅雷Chrome支持");
	UpdataToolbarBadgeText("");
}

function SetToolbarDisableStatus()
{
	UpdateBrowserActionIcon("images/icon19_disabled.png");
	UpdataToolbarTips("迅雷Chrome支持已被禁用");
	UpdataToolbarBadgeText("");
}

function SetToolbarExceptionStatus()
{
	UpdateBrowserActionIcon("images/icon19_normal.png");
	UpdataToolbarTips("迅雷Chrome支持出现异常");
	UpdataToolbarBadgeText("!");
}

function SetToolbarPageDisableStatus()
{
	UpdateBrowserActionIcon("images/icon19_pageDisable.png");
	UpdataToolbarTips("当前页面已禁用迅雷Chrome支持");
	UpdataToolbarBadgeText("");
}

function onDisconnected() {

    //alert("quit");
    if (!bSelfQuit) {

        port = null;
        bPluginEnabled = false;
		bException = true;
		SetToolbarExceptionStatus();

        chrome.tabs.getAllInWindow(null,
			function(tabs) {
				for (var i in tabs) {
					chrome.tabs.sendMessage(tabs[i].id, { name: "UpdatePluginEnabled", enable: bPluginEnabled });
				}
			}
		);
    }
}

function connectNativeApp() {
    bSelfQuit = false;
    var hostName = "com.xunlei.thunder";
    port = chrome.runtime.connectNative(hostName);

    if (port != null) 
    {
        console.log("connectNativeApp sucessful!");     
        port.onMessage.addListener(onNativeMessage);
        port.onDisconnect.addListener(onDisconnected);
    }
    else 
    {
		bPluginEnabled = false;
		bException = true;
		SetToolbarExceptionStatus();
        console.log("connectNativeApp failed!");
    }
}

function SendQuitChrome() {

    bSelfQuit = true;
    
    var sendQuitChrome = { "funcName": "ChromeQuit", "paramters": [] };

    sendNativeMsg(sendQuitChrome);

    port = null;    
}

function Init()
{
    connectNativeApp();

    InitPluginEnabled();

    CreateContextMenu(false);

    RegisterEventListener();	
}

Init();