$(document).ready(function() {

  /*
   * Events registration
  */
  
  $("#input").keyup(function () {
    hasher.update();
  });
  $("#input").change(function () {
    hasher.update();
  });

  /*
   * Hash navigation
   */
  onHashChange = function () {
    var hash = window.location.hash.slice(1) 
    $("#screen-1").show().scrollTop();
  }
  $(window).bind('hashchange', onHashChange);  

  /*
   * Init
   */
  onHashChange();
  hasher.init();
  hasher.update();
  
   document.addEventListener('DOMContentLoaded', function () {
        Event.beginRequest();
        Event.bindRadio();
    });
  
  var DataManage = {

        getRequestData : function(){
            var result = {
                method : document.querySelector("input[name=method]:checked").value,
                url : document.querySelector("input[name=url]").value,
                data : document.querySelector("textarea[name=data]").value
            };
            return result;
        },
        setResponseData : function(res){
            document.querySelector("textarea[name=responseData]").value = res.responseText;
        }
        
        
    }

    var Ajax = {

        req : function (params, callback) {
            
            var req = Ajax.getRequest(callback);        
            req.open(params.method, params.url, true);
            req.send(params.data);
        },
        getRequest : function (callback) {
        
            var req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if (req.readyState != 4)
                    return;
                if (req.status == 200) {
                    callback(req);
                } else {
                    alert("请求失败:" + req.statusText);
                }
                return true;
            };
            return req;
        }
    };

    var Event = {
        beginRequest : function(){
            var goBtn  = document.querySelector("#go");
            goBtn.addEventListener('click', function(){
                var result = DataManage.getRequestData();
                Ajax.req(result, function(res){
                    DataManage.setResponseData(res);                
                });
            }, false);
        },
        bindRadio : function(){
            var labels = document.querySelectorAll(".reqMethod label");
            
            labels[0].addEventListener('click', function(){    
                document.querySelector("input[value=GET]").checked = true;
            }, false);
            
            labels[1].addEventListener('click', function(){    
                document.querySelector("input[value=POST]").checked = true;
            }, false);
        }
    }
  
  
  

  if (location.search != "?focusHack") location.search = "?focusHack";
  //$("#input-value").focus();
  window.scrollTo(0, 0);
});