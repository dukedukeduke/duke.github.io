var winners = new Array()

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};


Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

$("#winners p").each(function(){
    winners.push($(this).html());
});

var xinm_new = new Array();
xinm_new = xinm;
var phone_new = new Array();
phone_new = phone;

var nametxt = $('.slot');
var phonetxt = $('.name');
var runing = true;
var trigger = true;
var num = 0;
var Lotterynumber;
var Count;
var pcount;


$(function () {
	// nametxt.css('background-image','url('+xinm_new[0]+')');
	// phonetxt.html(phone_new[0]);
});




// 开始停止
function start(val) {
	if(!val || isNaN(Number(val)) || Number(val) < 1)
	{
		alert("输入错误");
		return false
	}
	if(lottery_level==1)
	{
	    if(Number(val) > max_winners)
        {
            alert("输入错误，剩余名额：" + (max_winners).toString());
            return false
        }
	}
	if(lottery_level==2)
	{
	    if(Number(val) > max_winners)
        {
            alert("输入错误，剩余名额：" + (max_winners).toString());
            return false
        }
	}
	if(lottery_level==3)
	{
	    if(Number(val) > max_winners)
        {
            alert("输入错误，剩余名额：" + (max_winners).toString());
            return false
        }
	}
	if(lottery_level==0)
	{
	    if(Number(val) > max_winners)
        {
            alert("输入错误，剩余名额：" + (max_winners).toString());
            return false
        }
	}

	for (i=0;i<winners.length;i++){
			temp = phone_new.indexOf(winners[i]);
			if (temp > -1)
			{
					phone_new.remove(winners[i]);
					xinm_new.remove(xinm_new[temp])
			}
	}
	pcount = xinm_new.length-1;//参加人数
	Lotterynumber = val;
	Count = val;
	if (runing) {
		if ( pcount <= Lotterynumber ) {
			alert("抽奖人数不足");
		}else{
			runing = false;
			$('#start').text('停止');
			startNum()
		}
	} else {
		$('#start').text('自动抽取中('+ Lotterynumber+')');
		zd();

	}
}

// 开始抽奖

function startLuck() {
	runing = false;
	$('#btntxt').removeClass('start').addClass('stop');
	startNum()
}

// 循环参加名单
function startNum() {
	num = Math.floor(Math.random() * pcount);
	nametxt.css('background-image','url('+xinm_new[num]+')');
	phonetxt.html(phone_new[num]);
	t = setTimeout(startNum, 0);
}

// 停止跳动
function stop() {
	pcount = xinm_new.length-1;
	clearInterval(t);
	t = 0;
}

// 打印中奖人

function zd() {
	if (trigger) {

		trigger = false;
		var i = 0;
		var last = Count;

		if ( pcount >= Lotterynumber ) {
			stopTime = window.setInterval(function () {
				if (runing) {
					runing = false;
					$('#btntxt').removeClass('start').addClass('stop');
					startNum();
				} else {
					$("#start").removeAttr("onclick");
					runing = true;
					$('#btntxt').removeClass('stop').addClass('start');
					stop();

					i++;
					Lotterynumber--;

					$('#start').text('自动抽取中('+ Lotterynumber+')');

					if ( i == Count ) {
						console.log("抽奖结束");
						window.clearInterval(stopTime);
						$('#start').text("开始");
						Lotterynumber = Count;
						trigger = true;
						$("#start").attr("onclick",'start($("#count_set").val())');
						max_winners = max_winners - Number(Count);

						if (lottery_level==0){
						    count_lucky_winner_selected = count_lucky_winner_selected + Number(Count);
						}
						if (lottery_level==1){
						    count_first_winner_selected = count_first_winner_selected + Number(Count);
						}
						if (lottery_level==2){
						    count_second_winner_selected = count_second_winner_selected + Number(Count);
						}
						if (lottery_level==3){
						    count_third_winner_selected = count_third_winner_selected + Number(Count);
						}
					};

					$('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url("+xinm_new[num]+")'></div><div class='luckuserName'>"+phone_new[num]+"</div></li>");
					if ( i == Count ){
						$('.luck-user-list').prepend("<li><div></div><div>"+lotterylevel+"</div></li>");
					}
					//将已中奖者从数组中"删除",防止二次中奖
					console.log(num);
					console.log("即将删除：");
					console.log(xinm_new[num]);
					console.log(phone_new[num]);
					console.log("删除前：");
					console.log(xinm_new);
					console.log(phone_new);
					xinm_new.splice(num, 1);
					phone_new.splice(num, 1);
					console.log("删除后：");
					console.log(xinm_new);
					console.log(phone_new);

				}
			},1000);
		};
	}
}

