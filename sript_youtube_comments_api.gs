/* Script developed by juaristech.com */

function comentariosYoutube(videoId) {
  apikey='XXXXXXXXXXXXXXXXXXX';
  numComentarios = '15';
  
  const url = "https://www.googleapis.com/youtube/v3/commentThreads?key="+apikey+"&textFormat=plainText&part=snippet&videoId="+videoId+"&maxResults=" + numComentarios + "&order=relevance";

  console.log(url);

  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var items = JSON.parse(json)['items'];

  spinComments="{"

  for(i=0; i < items.length; i++){
    comentario = items[i]['snippet']['topLevelComment']['snippet']['textDisplay'].replaceAll('{','(').replaceAll('}',')').replaceAll('|','').replaceAll('\r\n','<br>').replaceAll('\n','<br>').replaceAll('*','')
    if(!comentario.includes("https")){
      spinComments = spinComments + comentario + '|'
    }
  }

  spinComments = spinComments.substring(0,spinComments.length - 1) + '}';
  if(spinComments != '}'){
    if(!spinComments.includes('|')){
        spinComments = spinComments.replace('{','').replace('}','');
      }
      return spinComments;
  }      
  else{
      return 'Sin comentarios';
  }
}