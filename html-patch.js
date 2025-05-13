/*
    --- WARNING ---
    This patch will leave you vulnerable to XSS!
    The author (javascript1) will not be responsible for any damage.
    --- WARNING ---

    Made for trollbox (https://windows93.net/trollbox)
*/

var script = document.createElement("script")

script.src = "https://raw.githubusercontent.com/mathiasbynens/he/refs/heads/master/he.js"

while(he == undefined) {
    setTimeout(function(){
        console.log("Waiting for he to load")
    }, 1000)
}

function printMsg (data) {
    if (!data || typeof data.msg !== 'string' || data.msg.trim()=='') return;
    if (data.nick==undefined) {return};
    if (data.nick==null) {return};
    if (data.home==undefined||data.home==null||!data.home) {return;};
    for (var i = 0; i < blocked.length; i++) { if (data.home==blocked[i]) {return} };
    if (typeof data.nick != "string") {return};
    decoded = he.decode(data.msg)
    var containsHTML = (/<\/?[a-z][\s\S]*>/).test(decoded)
    var cmd = getCmd(data.msg);
    var ytplayer = false;
    if (ytShow) {
      if (matchYoutubeUrl(data.msg)) {
          if (data.msg.startsWith('https://www.youtube.com/watch?v=')) {  
             var id = data.msg.slice(32).trim();
             data.msg='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
             ytplayer=true;
          }
      };
    };
    
    if (ytplayer!=true) {
      if ( imgShow ) {
        var test = (/\.(gif|jpg|jpeg|tiff|png|webp)/i).test(data.msg);
        if (test) {  
          message = data.msg.split(" ");
          data.msg = "";
           for (var i = 0; i < message.length; i++) {             
             var testa = (/\.(gif|jpg|jpeg|tiff|png|webp)/i).test(message[i]);
             if (testa) {
               //img
                if ((/\.(php)/i).test(message[i])) {
                  data.msg = data.msg + " <img style='max-width: 98%;' src=''> "
                }else{
                  data.msg = data.msg + " <img style='max-width: 98%;' src='"+ message[i] +"'> "
                }
             }else{
              //txt
              data.msg = data.msg + " " + $io.str.autolink(message[i]);
             }
        };
        }else{data.msg = $io.str.autolink(data.msg);}
        
      }else{
        data.msg = $io.str.autolink(data.msg);
      }
    };
    
    words = data.msg.split(" ");
    if (words[0]=="/sin"){  
      if (words[1]) {
        string = words[1];
        string = string.substring(0, 50); 

      }else{
        string="█";
      }
      if (words[2]) {
      amplitude = words[2];
    }else{
      amplitude = parseInt(Math.random()*100);
    }
      if (data.nick==undefined) {data.nick="anonymous"};
      if (data.color==undefined) {data.color="white"};
      if (data.style==undefined) {data.style=""};
      if (sin) {
        sinFlood(string, amplitude,data.nick,data.color,data.style)
        return  
      };
    }; 
    //
    if (words[0]=="/say"){  

       settings = words[1].split(":")
       words.shift();
       words.shift();
       var temp = words.join(" ").trim();
       say = new SpeechSynthesisUtterance();   
       say.volume = 0.5;
       say.text = temp;
       if (settings[0]<0) {settings[0]=0}; if (settings[0]>=2) {settings[0]=2.0};
       say.pitch = settings[0];
       if (settings[1]<0.1) {settings[1]=0.1}; if (settings[1]>=10) {settings[1]=10.0};
       say.rate=settings[1];
       if (voices.length>0) { say.voice=voices[parseInt(settings[2])%voices.length] };
       if (speech&&temp.length>0) {
        speechSynthesis.speak(say);
         data.msg = "🔈 "+temp;
       }else{
         data.msg = "🔇 "+temp;
       }
       //return;
    }         
    // vintage emoticons, will add moar sets later.
    if (emoticons) {
      substring = "&#175;\\_(&#12484;)_/&#175;";
      if(data.msg.indexOf(substring) == -1){
        emoSet='msn';
        data.msg = replaceEmoticons(data.msg,emoSet);
      }
    };
    //
    if (words[0]=="/zalgo"){  
       var temp = data.msg.slice(6).trim().substring(0, 1000);
       data.msg = zalgo(temp);
    }      
    //
    /*
    if (cmd) {
      if (cmd.cmd === 'exe') {
        data.msg = '<div class="trollbox_exe"><button title="'+warnTxt+'" data-exe="'+cmd.val.replace(/"/g, '\\"')+'">/exe</button>' + cmd.val + '</div>';
      }
    }

    if (data.msg.startsWith('/exe ')) {
      var ex = data.msg.slice(5).trim()
      data.msg = '<div class="trollbox_exe"><button title="'+warnTxt+'" data-exe="'+ex.replace(/"/g, '\\"')+'">/exe</button>' + ex + '</div>';
    }
    */
    var div = document.createElement('div');
    data.nick = data.nick || '●';
    if (data.nick=='●') {pseudo=='●'};
    div.className = 'trollbox_line ui_group';
    if(containsHTML) {
        console.log("Hello world!")
        div.innerHTML = '<span class="trollbox_h">' + h(data.date) + '</span>'
        + (printNick(data))
        + decoded
        // + '<span class="trollbox_msg" style="color:'+data.color+'">' + data.msg + '</span>'
      ;
    } else {
    div.innerHTML = '<span class="trollbox_h">' + h(data.date) + '</span>'
      + (printNick(data))
      + '<span class="trollbox_msg">' + data.msg + '</span>'
      // + '<span class="trollbox_msg" style="color:'+data.color+'">' + data.msg + '</span>'
    ;
    }
    trollbox_scroll.appendChild(div);
    if (getScrollPos()>90) {scrollDown();};
    
  }
