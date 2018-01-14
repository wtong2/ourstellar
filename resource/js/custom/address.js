function get_xlm_addr_info(){
		/* ajax call to get address information */

		$.ajax({
	  		url: "https://horizon.stellar.org/accounts/" + $('#xlm_addr').val(),
	  		async: true,
	  		cache: false,
	  		contentType: "application/json",
	  		dataType: "json",
	  		method: "GET"
		})
		.done(function(data) {
			/* set address as valid and set address balance */
			valid_address = 1;
			xlm = data.balances[0].balance;

			/* set inflation address */
			if(data.inflation_destination) inflation_address = data.inflation_destination;

			/* display address information in card */
			display_addr_info();
		})
		.fail(function() {
			valid_address = 0;
			console.log("An error has occurred - Failed to get address info from Stellar network.");
		});
}

function submit_address(){
	valid_address =0;
	$('#addr_balance').html("");

	get_xlm_addr_info();
}

function update_addr_balance(){
	/* Display balance information of address */

	$('#addr_balance').html("Balance: " + numeral(xlm).format('0,0.0000000') +" XLMs<br>($" + numeral(xlm * xlm_usd).format('0,0.00') + ")");
}

function display_addr_info(){
	$('#input_addr_group').hide(1000);
	$('#addr_info_card').show(1000);

	update_addr_balance();
}

function form_xlm_addr_submit(){
	/* Validation for address field */
	if($('#xlm_addr').val()==""){
		alert("Please enter your XLM address.");
	}else{
		window.location.replace("/?pk="+$('#xlm_addr').val());
	}
}

$(document).ready(function (){
	$('#btn-submit-addr').on('click',function (){
		/* button to submit address */
		form_xlm_addr_submit();
		return false;
	});

	$('#form_xlm_addr').on('submit',function (){
		/* form submission for address */
		form_xlm_addr_submit();
		return false;
	});

	$('#btn_transactions').on('click',function (){
		/* Get account operations */
		get_account_operations();
	});

	$('#btn_inflations').on('click',function (){
		/* Get account operations */
		if(inflation_address!=""){
			get_account_operations();
			$('#modal_inflations').modal('show');
		}else{
			alert("This address has not voted to any inflation pool.\nPlease refer to http://xlmpool.com/en.html.");
		}
	});
	
	if($('#xlm_addr').val()!=""){
		/* Using pre-defined xlm address in url, submit address */
		submit_address();
	}
});