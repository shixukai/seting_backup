chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    var hostid = "com.alipay.edit";
    switch (request.command) {
      case "cert":
      case "check_alicert":
        hostid = "com.alipay.cert";
        break;
    }
    chrome.runtime.sendNativeMessage(
      hostid,
      request,
      function(response) {
        if (response === undefined) {
          response = {existence: false};
        }
        sendResponse(response);
      }
    );
    return true;
  }
);
