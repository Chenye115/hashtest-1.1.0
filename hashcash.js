
var tabs = {
  hash : 1,
};
var solution="solution ";

var hasher = {
  tab : tabs.hash,
  elements: {
    h1 : {
      id : tabs.hash+"md5",
      tab : tabs.hash,
      title : "MD5",
      calculate : function (input) {
        return CryptoJS.MD5(input);
      }
    },
    h2 : {
      id: tabs.hash+"sha1",
      tab : tabs.hash,
      title: "SHA-1",
      calculate: function (input) {
        return CryptoJS.SHA1(input);
      }
    },
   
    h3 : {
      id: tabs.hash+"sha256",
      tab : tabs.hash,
      title: "SHA-256",
      calculate: function (input) {
			var num_zeros='12';/*调节零的位数*/
			string_num='';
			for(i=0;i<num_zeros;i++){string_num += 0;}
			var random_server='12345678';/*暂时没有实现随机数*/
			var num_random='10';//暂时没有加入字母形成完整的哈希puzzle
			string_random='';
			for(i=0;i<num_random;i++){string_random += parseInt(Math.random()*10);}
			var puzzle=string_num+':'+string_random+':';//puzzle不完全
			var count=1;		
			while(1){
			count=count.toString(16)
			console.log(puzzle+count)
			solution=CryptoJS.SHA256(puzzle+count)
			console.log(solution)
			if(String(solution).slice(0,2)=='00'){
				console.log("得到solution")
        console.log(puzzle+count)
        console.log(String(solution))
        break
    }
    else{
		console.log("继续计算")
        count=parseInt(count,16)
        count=parseInt(count)

        count+=1

    }
}
        return solution;
      }
    },



  },
  getElementById : function (id) {
    for (i in this.elements) {
      if (this.elements[i].id == id) {
        return this.elements[i];
      }
    }
    return null;
  },
  /*
   */
  init : function () {
    // render HTML
    this.render();
    // Register click events
    for (var i in this.elements) {
      if (this.elements[i].tab == this.tab) {
        // expand textarea
        $("#"+this.elements[i].id+"-expand").click(function () {
          var id = this.id.toString().replace("-expand", "");
          if (!$("#"+this.id).hasClass("on")) {
            var element = hasher.getElementById(id);
            if (element) {
              $("#"+id).attr("rows", element.rows);
            }
            //var h = $("#"+id)[0].scrollHeight;
            //$("#"+id).height(h);
          } else {
            $("#"+id).attr("rows", "1");
            //$("#"+id).height("auto");
          }
          $("#"+this.id).toggleClass("on");
        });
        // copy to clibboard on click
        $("#"+this.elements[i].id+"-value").click(function () {
          $("#output .note").hide();
          var id = this.id.toString().replace("-value", "");
          if ($("#"+id).val().length > 0) {
            $("#"+id+"-note").text("copied").show('fast');
            copyToClipboard(id);
          }
        });
      }
    }
  },
  /*
   * Recalculate
   */
  update : function () {
    $("#output .note").hide();
    var input = $("#input-value").val();
    var password = $("#input-password").val();
    for (var i in this.elements) {
      this.elements[i].rows = 0;
      if (this.elements[i].tab == this.tab) {
        // main calculation
        var value = this.elements[i].calculate(input, password);
        $("#"+this.elements[i].id).val(value);

        // expand
        var res = value.toString().match(/(\n\r|\r\n|\n|\r)/g);
        var rows = 1;
        if (res != null && res.length != undefined) {
          rows = res.length + 1;
        }
        
        this.elements[i].rows = rows;
        if (rows > 1) {
          $("#"+this.elements[i].id+"-expand").show().text(rows + " lines").show();
        } else {
          $("#"+this.elements[i].id+"-expand").text("").hide();
        }

        // show ruler
        if (this.elements[i].ruler != undefined) {
          $("#"+this.elements[i].id+"-ruler").html(this.ruler(value, this.elements[i].ruler));
        }
      }
    }
  },
  /*
   * 
   */
  render : function () {
    $("#output").html("");
    for (var i in this.elements) {
      if (this.elements[i].tab == this.tab) {
        var html = 
          '<div class="element">'+
            '<div>'+
              '<span id="'+this.elements[i].id+'-title" class="title">'+
                this.elements[i].title+
              '</span>'+
              '<span id="'+this.elements[i].id+'-expand" class="expand"></span>'+
              '<span id="'+this.elements[i].id+'-note" class="note"></span>'+
            '</div>'+
            '<div id="'+this.elements[i].id+'-value" class="value">'+
              //'<input id="'+this.elements[i].id+'" type="text" />';
              '<textarea id="'+this.elements[i].id+'" rows="1"></textarea>';
              // ruler
              if (this.elements[i].ruler != undefined) {
                html += '<div id="'+this.elements[i].id+'-ruler" class="ruler"></div>'
              }
        html += 
            '</div>'+
          '</div>';
        $("#output").append(html);
      }
    }
  },
}
