function showFicheiro(f){
    console.log('olaola')
    /*if(f.mimetype == 'image/png')
        var ficheiro = $('<img src="/ficheiros/' + f.name + '" width="80%"/>')
    else*/
        var ficheiro = $('<p>'+f.name + '</p>')
    var download = $('<a href="/download/' + f.name + '">Download</a>')
    $("#display").empty()
    $('#display').append(ficheiro, download)
    $('#display').modal()
}

