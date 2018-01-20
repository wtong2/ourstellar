function display_rate_xlm_usd(){
	/* Displaying of current XLM/USD rate and the difference in 24hr in percentage */
	$('#xlm-usd').html("XLM/USD: $" + xlm_usd + " (");

	if(xlm_usd>xlm_usd_24hr){
		/* Append '+' sign if current XLM/USD rate is higher than 24hr */
		$('#xlm-usd').append("+");
	}
	$('#xlm-usd').append(numeral((xlm_usd-xlm_usd_24hr)*100/xlm_usd_24hr).format('0,0.00') + "%)");
}

function get_xlm_usd(){
		$.ajax({
	  		url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XLM&tsyms=USD",
	  		async: true,
	  		cache: false,
	  		contentType: "application/json",
	  		dataType: "json",
	  		method: "GET"
		})
		.done(function(data) {
			if(xlm_usd != data.RAW.XLM.USD.PRICE){
				xlm_usd = data.RAW.XLM.USD.PRICE;
				alert_xlm_usd();
			}

			if(xlm_usd_24hr != data.RAW.XLM.USD.OPEN24HOUR){
				xlm_usd_24hr = data.RAW.XLM.USD.OPEN24HOUR;
			}

			display_rate_xlm_usd();

			if(valid_address==1){
				/* if address is valid, get latest xlm balance and update display */
				get_xlm_addr_info();
				update_addr_balance();
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