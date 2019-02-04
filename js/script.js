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
    console.log("yee");
    setTimeout(function(){
        $.get(url+"msgs?k="+k+"&timeout=1", function(data,status){
            da = JSON.parse(data.data);
            var x = $("#p"+player2).position();
            console.log(da);
            if(da.left!=x.left || da.top!=x.top){
                move(player2,da.direction);
            }
            get();
        });
    }, 1000);
    
}
function post(pos,x){
    var time = Date.now();
    data = JSON.stringify({ direction: x, left: pos.left, top: pos.top, time: time });
    $.post(url+"msgs?k="+k+"&to="+k2+"&data="+data,
    function(result){
        
    });
    console.log(data);
}
function detectMove(event,player,player2){
    var x = $("#p"+player).position();
    var x2 = $("#p"+player2).position();
    if (event.keyCode === 90) {
        //up
        return true;
    }
    if (event.keyCode === 83) {
        //down
        return true;
    }
    if (event.keyCode === 81) {
        //left
        post(x,0);
        $('#p'+player).addClass('reverse');
        x.left-=100;
        if(x.left>0){
            move(player,0);
        }
        return true;
    }
    if (event.keyCode === 68) {
        //right
        post(x,1);
        $('#p'+player).removeClass('reverse');
        x.left+=100;
        if(x.left<700){
            move(player,1);
        }
        return true;
    }
    
    if(x.left>=x2.left){

    }else if(x.left<=x2.left){

    }
    
}
function move(player,pos){
    if(pos == 0){
        pos = "-";
    }
    if(pos == 1){
        pos = "+";
    }
    $('#p'+player).animate({left: pos+"=100"}, 300);
    setTimeout(function(){
        $('#p'+player).attr('src','img/2.png');
    }, 50);
    setTimeout(function(){
        $('#p'+player).attr('src','img/3.png');
    }, 100);
    setTimeout(function(){
        $('#p'+player).attr('src','img/4.png');
    }, 150);
    setTimeout(function(){
        $('#p'+player).attr('src','img/3.png');
    }, 200);
    setTimeout(function(){
        $('#p'+player).attr('src','img/2.png');
    }, 250);
    setTimeout(function(){
        $('#p'+player).attr('src','img/1.png');
        action = false;
    }, 300);
}