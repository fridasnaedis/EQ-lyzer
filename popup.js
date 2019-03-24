// var app = chrome.runtime.getBackgroundPage();
let analyzeableText = "Test sentence";

function analyze() {
    // This searches for the active tabs in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
            analyzeableText = response;
            analyzeText();
        });
    });

}
  
function analyzeText() {
  $(function() {
    var params ={
    "documents": [
    {
    "language": "en",
     "id": "1",
     "text": analyzeableText
    }
    ]
    };
    
    
    $.ajax({
    url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?",
    beforeSend: function(xhrObj){
    // Request headers
    xhrObj.setRequestHeader("Content-Type","application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","e98789b3aa27412897bc2933b53ba6a3");
    xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    // Request body
    data: JSON.stringify(params)
    })
    .done(function(data) {
    
            var num = Math.round(data.documents[0].score * 100) / 100;
            if (num >= 0.8 && num <=1){
                document.getElementById("rating_5").style.display = "inline";
                document.getElementById("rating_4").style.display = "none";
                document.getElementById("rating_3").style.display = "none";
                document.getElementById("rating_2").style.display = "none";
                document.getElementById("rating_1").style.display = "none";
            }if (num >=0.6  && num <=0.79){
                document.getElementById("rating_5").style.display = "none";
                document.getElementById("rating_4").style.display = "inline";
                document.getElementById("rating_3").style.display = "none";
                document.getElementById("rating_2").style.display = "none";
                document.getElementById("rating_1").style.display = "none";
            }if (num >=0.4  && num <=0.59){
                document.getElementById("rating_5").style.display = "none";
                document.getElementById("rating_4").style.display = "none";
                document.getElementById("rating_3").style.display = "inline";
                document.getElementById("rating_2").style.display = "none";
                document.getElementById("rating_1").style.display = "none";
            }if (num >=0.2  && num <=0.39){
                document.getElementById("rating_5").style.display = "none";
                document.getElementById("rating_4").style.display = "none";
                document.getElementById("rating_3").style.display = "none";
                document.getElementById("rating_2").style.display = "inline";
                document.getElementById("rating_1").style.display = "none";
            }if (num >=0  && num <=0.19){
                document.getElementById("rating_5").style.display = "none";
                document.getElementById("rating_4").style.display = "none";
                document.getElementById("rating_3").style.display = "none";
                document.getElementById("rating_2").style.display = "none";
                document.getElementById("rating_1").style.display = "inline";
            }
        })
        .fail(function(err) {
          console.log(err)
            alert("error");
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('analyze').addEventListener('click', analyze);
}); 

