const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

console.log("speechRecognition Present:" + ("webkitSpeechRecognition" in window))
function startListening(){
  if("webkitSpeechRecognition" in window){
      let speechClient = new webkitSpeechRecognition();
      speechClient.continuous = true;
      speechClient.lang = "en-US";
      speechClient.interimResults = true;

      speechClient.onstart = function (){
        console.log("speech client listening.....")
      }
      speechClient.onend = function (){
        console.log("cleint stopped listening !!");
      }
      speechClient.onerror = function (error){
        console.log(error)
      }
      speechClient.onresult = function (event){
        let final_transcript = "";
        for(let i= event.resultIndex; i < event.results.length; i++){
          if(event.results[i].isFinal){
            final_transcript += event.results[i][0].transcript;
          }
        }
        final_transcript !== "" && console.log(final_transcript);
      }

      startBtn.onclick = () => {
        speechClient.start();
      }

      stopBtn.onclick = () => {
        speechClient.stop();
      }
  }
}

startListening();