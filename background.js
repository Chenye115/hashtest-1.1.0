// 在web请求头里面修改字段
//background.js

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) 
  {
	var bfind = false;
    for (var i = 0; i < details.requestHeaders.length; ++i) 
	{
      if (details.requestHeaders[i].name == 'Referer' ||
		details.requestHeaders[i].name == 'referer')
		{
			bfind = true;
			details.requestHeaders[i].value = 'test hashcash';
        break;
      }
    }
	
	if(!bfind)
	{
		var obj = new Object();
		obj.name = "Referer";
		obj.value = 'test demo111';
		details.requestHeaders.push(obj);
	}
	
	details.requestHeaders.push({
        name:"hash-chenye",
        value:"solution"
    });
		
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders","extraHeaders"]);
