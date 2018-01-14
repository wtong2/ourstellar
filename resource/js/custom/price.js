function display_rate_xlm_usd(){
	$('#xlm-usd').html("XLM/USD: $" + xlm_usd);
}

function get_xlm_usd(){
		$.ajax({
	  		url: "https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=USD,SGD,BTC",
	  		async: true,
	  		cache: false,
	  		contentType: "application/json",
	  		dataType: "json",
	  		method: "GET"
		})
		.done(function(data) {
			if(xlm_usd != data.USD){
				xlm_usd = data.USD;
				alert_xlm_usd();
			}

			display_rate_xlm_usd();

			if(valid_address==1){
				get_xlm_addr_info();
				update_addr_balance();
			}

			if(xlm_usd_ori=0){
				/* setting the starting value of xlm when the session starts */
				xlm_usd_ori = data.USD;
			}
		})
		.fail(function() {
			console.log("An error has occurred - Failed to get price (XLM-USD).");
		});
}

$(document).ready(function (){
	get_xlm_usd();
	setInterval(get_xlm_usd, 10000);
});