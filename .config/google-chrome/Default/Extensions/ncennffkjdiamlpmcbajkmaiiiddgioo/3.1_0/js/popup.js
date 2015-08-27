// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var extension;
var bPluginEnabled;
var bMoniterDynamicLinks;
var bIsInWebsiteBlackList;
var bIsInPageBlackList;

function OnClickThunderChromeSupport(e)
{
	extension.SetPluginEnabled(!bPluginEnabled);
	window.close();
}

function OnClickMoniterDynamicLinks(e) {
    if (bPluginEnabled) {
        extension.SetMoniterDynamicLinks(!bMoniterDynamicLinks);
        window.close();
    }
}

function OnClickThisPageDisableThunder(e)
{
	if (bPluginEnabled)
	{
		chrome.tabs.getSelected(null,
			function(tab)
			{
				if (bIsInPageBlackList)
				{
					// 从网页黑名单里移除
					extension.RemoveBlackListPage(tab.url);
				}
				
				if (bIsInWebsiteBlackList)
				{
					// 从网站黑名单里移除
					var tmpUrl = tab.url;
					var idx1 = tmpUrl.indexOf("http://");
					var idx2 = tmpUrl.indexOf("/", idx1+7);
					var url = tmpUrl.substring(0, idx2);
					extension.RemoveBlackListWebsite(url);
				}
				else
				{
					if (!bIsInPageBlackList)
					{
						// 添加进网页黑名单
						extension.AddBlackListPage(tab.url);
					}
				}
			}
		);
		
		window.close();
	}
}

function OnClickThisWebsiteDisableThunder(e)
{
	if (bPluginEnabled)
	{
		chrome.tabs.getSelected(null,
			function(tab)
			{
				var tmpUrl = tab.url;
				var idx1 = tmpUrl.indexOf("http://");
				var idx2 = tmpUrl.indexOf("/", idx1+7);
				var url = tmpUrl.substring(0, idx2);
				
				if (bIsInWebsiteBlackList)
				{
					// 从网站黑名单里移除
					extension.RemoveBlackListWebsite(url)
				}
				else
				{
					// 添加进网站黑名单
					extension.AddBlackListWebsite(url);
				}
			}
		);
		
		window.close();
	}
}

function OnClickFeedback(e)
{
	extension.OnFeedback();
}

function OnClickDownloadNewClientInstallExe(e)
{
	var url = "http://plugin.xl7.xunlei.com/7.9/func/xl_ext_chrome_setup.exe";
	chrome.tabs.create({url:url},
		function(){}
	);
}

function ShowGuidePage()
{
	var thunderChromeSupportNode = document.getElementById('ThunderChromeSupport');
	document.body.removeChild(thunderChromeSupportNode.parentNode);
	
	var moniterDynamicLinksNode = document.getElementById('MoniterDynamicLinks');
	document.body.removeChild(moniterDynamicLinksNode.parentNode);
	
	var thisPageDisableThunderNode = document.getElementById('ThisPageDisableThunder');
	document.body.removeChild(thisPageDisableThunderNode.parentNode);
	
	// 与ThisPageDisableThunder父节点相同
	// var thisWebsiteDisableThunderNode = document.getElementById('ThisWebsiteDisableThunder');
	// document.body.removeChild(thisWebsiteDisableThunderNode.parentNode);
	
	var feedbackNode = document.getElementById('Feedback');
	document.body.removeChild(feedbackNode.parentNode);
	
	var newTitleNode = document.createElement("p");
	newTitleNode.innerHTML = "<div class=\"guide\"><b><h3><font color='red'>迅雷Chrome支持异常</font></h3></b></div>";
	document.body.appendChild(newTitleNode)
	
	var newTextNode = document.createElement("p");
	newTextNode.innerHTML = "<div class=\"guide\">您的迅雷支持组件存在异常，需要下载安装程序进行修复，是否立即下载？<br>（下载完成后请手动运行修复程序，并重启Chrome浏览器）</div>";
	document.body.appendChild(newTextNode)
	
	var downloadBtnNode = document.createElement("p");
	downloadBtnNode.setAttribute("align","center");
	align = downloadBtnNode.attributes.getNamedItem("align").value = "center";
	downloadBtnNode.innerHTML = "<div class=\"downloadBtn\">立即下载</div>";
	//downloadBtnNode.innerHTML = "<a href=\"http://window.location.href/plugin.xl7.xunlei.com/7.9/func/xl_ext_chrome_setup.exe\">立即下载</a>";
	document.body.appendChild(downloadBtnNode)
	downloadBtnNode.addEventListener('click', OnClickDownloadNewClientInstallExe);
}

function Init()
{
	extension = chrome.extension.getBackgroundPage();
	
	if (extension.bException)
	{
		ShowGuidePage();
		return;
	}
	
	bPluginEnabled = extension.bPluginEnabled;
	if (bPluginEnabled)
	{
	    document.getElementById('ThunderChromeSupport').className = 'item item-select';

	    var bUseChromeDownloadAPI = extension.bUseChromeDownloadAPI
	    if (bUseChromeDownloadAPI) {
	        bMoniterDynamicLinks = extension.bMoniterDynamicLinks
	        if (bMoniterDynamicLinks) {
	            document.getElementById('MoniterDynamicLinks').className = 'item item-select';
	        }
	    }
	    else {
	        document.getElementById('MoniterDynamicLinks').className = 'item-disable';
	    }

	    chrome.tabs.getSelected(null,
			function(tab)
			{
				bIsInWebsiteBlackList = extension.CheckIsWebsiteInUserBlackList(tab.url);
				bIsInPageBlackList = extension.CheckIsPageInUserBlackList(tab.url);
				if (bIsInWebsiteBlackList)
				{
					document.getElementById('ThisPageDisableThunder').className= 'item item-select';
					document.getElementById('ThisWebsiteDisableThunder').className= 'item item-select';
				}
				else
				{
					if (bIsInPageBlackList)
					{
						document.getElementById('ThisPageDisableThunder').className= 'item item-select';
					}
				}
			}
		);
	}
	else
	{
	    document.getElementById('ThunderChromeSupport').className = 'item';
	    document.getElementById('MoniterDynamicLinks').className = 'item-disable';
		document.getElementById('ThisPageDisableThunder').className= 'item-disable';
		document.getElementById('ThisWebsiteDisableThunder').className= 'item-disable';
	}
}

document.addEventListener('DOMContentLoaded',
	function ()
	{
	    document.getElementById('ThunderChromeSupport').addEventListener('click', OnClickThunderChromeSupport);
	    document.getElementById('MoniterDynamicLinks').addEventListener('click', OnClickMoniterDynamicLinks);
		document.getElementById('ThisPageDisableThunder').addEventListener('click', OnClickThisPageDisableThunder);
		document.getElementById('ThisWebsiteDisableThunder').addEventListener('click', OnClickThisWebsiteDisableThunder);
		document.getElementById('Feedback').addEventListener('click', OnClickFeedback);

		Init();
	}
);
