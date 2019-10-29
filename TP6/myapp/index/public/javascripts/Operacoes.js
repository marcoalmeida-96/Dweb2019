function apagaItem(ident){
	
	
	axios.delete('/'+ident)
		.then(response=> window.location.assign('/'))
		.catch(error=>console.log(error))
}
function editItem (prov,local,tit,musico,duracao){
	
	
	axios.put('/',{
		tprov:prov,
		tlocal:local,
		ttit:tit,
		tmusico:musico,
		tduracao:duracao
	})
	.then(function(response){
		
		oFormObject.elements["tit"].disabled=false;
		oFormObject.elements["enviar"].type='submit';
		oFormObject.elements["update"].type='hidden';
		window.location.assign('/')
	})
		.catch(error=>console.log(error))
}
function mostrarItem (ident){
	
	
	axios.get('/mostrar/'+ident)
		.then(function(response){
			
			oFormObject = document.forms['form1'];
			oFormObject.elements["prov"].value=response.data.prov;
			oFormObject.elements["local"].value=response.data.local;
			oFormObject.elements["tit"].value=response.data.tit;
			oFormObject.elements["musico"].value=response.data.musico;
			oFormObject.elements["duracao"].value=response.data.duracao;
			oFormObject.elements["tit"].disabled=true;
			oFormObject.elements["enviar"].type='hidden';
			oFormObject.elements["update"].type='button';
			window.scrollTo(0, 0);
			
		})
		.catch(error=>console.log(error))
}