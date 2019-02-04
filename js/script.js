function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
function get(){
    setTimeout(function(){
        $.get(url+"msgs?k="+k+"&timeout=1", function(data,status){
            da = data.data.replace(/\\/g, '');
            da = JSON.parse(da);
            console.log(da);
            time = Date.now();
            if(da.time > time-10000 && da.turn == turn+1){
                nbAllum-=da.num;
                if(nbAllum<=0){
                    end(false);
                }else{
                    turn=true;
                    nbTurn++;
                }
            }
            get();
        });
    }, 500);
    
}
function post(x, nbTurn){
    var time = Date.now();
    obj = { num: x, turn: nbTurn, time: time };
    data = JSON.stringify(obj);
    $.post(url+"msgs?k="+k+"&to="+k2+"&data="+data,
    function(result){
        
    });
}
function detectMove(event){
    if(turn == true){
        console.log("nyess");
        all = 0;
        if (event.keyCode === 49) {
            all = 1;
        }
        if (event.keyCode === 50) {
            all = 2;
        }
        if (event.keyCode === 51) {
            all = 3;
        }
        if(all!=0){
            nbTurn++;
            nbAllum-=all;
            if(nbAllum<=0){
                end(true);
            }else{
                post(all,nbTurn);
                afficher();
                turn = false;
            }
        }
    }
}
function afficher(){
    e = "";
    for(x=0;x<nbAllum;x++){
        e+="<div class='black'></div>";
    }
    $('#gamescreen').html(e);
}
function end(b){
    if(b==true){
        $('#gamescreen').html("WINNER"); 
    }else if(b==false){
        $('#gamescreen').html("LOSER");
    }
}