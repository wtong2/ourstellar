function get_effect_amount(operation_id){
	var xlm_amount = 0;

	$.ajax({
  		url: "https://horizon.stellar.org/operations/"+operation_id+"/effects",
  		async: false,
  		cache: false,
  		contentType: "application/json",
  		dataType: "json",
  		method: "GET"
	})
	.done(function(data) {
		xlm_amount = data._embedded.records[1].amount;
	})
	.fail(function() {
		console.log("An error has occurred - Failed to get account operation's effect amount from Stellar network.");
	});

	return xlm_amount;
}

function get_account_operations(){
	/* ajax call to get all transactions from address */
	$('#modal_transactions_body').html("<i class='fal fa-spinner fa-spin fa-2x'></i>");
	$('#modal_inflations_body').html("<i class='fal fa-spinner fa-spin fa-2x'></i>");

	$.ajax({
  		url: "https://horizon.stellar.org/accounts/"+$('#xlm_addr').val()+"/operations?order=desc&limit=100",
  		async: true,
  		cache: false,
  		contentType: "application/json",
  		dataType: "json",
  		method: "GET"
	})
	.done(function(data) {
		$('#modal_transactions_body').html("");
		$('#modal_inflations_body').html("");

		for (var i=0;i<data._embedded.records.length;i++){
			var operation = [];

			/* store operation details in array */
			if(data._embedded.records[i].type=="payment" && ($.inArray(data._embedded.records[i].from,inflation_addresses)==-1) || data._embedded.records[i].from==$('#xlm_addr').val()){
				/* Is a payment and (From address is not from inflation pool/From address is own address as it counts as its own transaction) */
				operation["time"] = new Date(data._embedded.records[i].created_at);
				operation["type"] = data._embedded.records[i].type;
				operation["amount"] = data._embedded.records[i].amount;
				operation["source"] = data._embedded.records[i].from;
				operation["destination"] = data._embedded.records[i].to;
				operation["transaction_hash"] = data._embedded.records[i].transaction_hash;
			}else if(data._embedded.records[i].type=="payment" && ($.inArray(data._embedded.records[i].from,inflation_addresses)!=-1) && data._embedded.records[i].from!==$('#xlm_addr').val()){
				/* Is a payment and (From address is from inflation pool and From address should not be own address as it counts as its own transaction) */
				operation["time"] = new Date(data._embedded.records[i].created_at);
				operation["type"] = "inflation";
				operation["amount"] = data._embedded.records[i].amount;
				operation["source"] = data._embedded.records[i].from;
				operation["destination"] = data._embedded.records[i].to;
				operation["transaction_hash"] = data._embedded.records[i].transaction_hash;
			}else if(data._embedded.records[i].type=="create_account"){
				operation["time"] = new Date(data._embedded.records[i].created_at);
				operation["type"] = data._embedded.records[i].type;
				operation["amount"] = data._embedded.records[i].starting_balance;
				operation["source"] = data._embedded.records[i].funder;
				operation["destination"] = data._embedded.records[i].account;
				operation["transaction_hash"] = data._embedded.records[i].transaction_hash;
			}else if(data._embedded.records[i].type=="account_merge"){
				operation["time"] = new Date(data._embedded.records[i].created_at);
				operation["type"] = data._embedded.records[i].type;
				operation["amount"] = get_effect_amount(data._embedded.records[i].id);
				operation["source"] = data._embedded.records[i].source_account;
				operation["destination"] = data._embedded.records[i].into;
				operation["transaction_hash"] = data._embedded.records[i].transaction_hash;
			}else{
				/* If operation type is not support, skip on. */
				continue;
			}
			display_operation(operation);
		}
	})
	.fail(function() {
		console.log("An error has occurred - Failed to get account operations from Stellar network.");
	});
}

function display_operation(operation){
	/* adding of operation in transactions modal */
	var amount_sign = "";
	var party_address = "";
	if(operation["source"]==$('#xlm_addr').val()){
		amount_sign = "-";
		party_address = operation["destination"];
	}else if(operation["destination"]==$('#xlm_addr').val()){
		amount_sign = "+";
		party_address = operation["source"];
	}
	var div_card = $('<div>').addClass('card');
	var div_card_body = $('<div>').addClass('card-body');
	var h5_amount = $('<h5>').addClass('card-title text-left').html(amount_sign + numeral(operation["amount"]).format('0,0.0000000') + " XLMs (" + amount_sign + "$" + numeral(operation["amount"] * xlm_usd).format('0,0.00') + ")");
	var p_party_address = $('<p>').addClass('small card-text text-muted text-center').html(party_address);
	var p_date_time = $('<p>').addClass('small card-text text-muted text-right').html(operation["time"]);

	div_card_body.append(h5_amount).append(p_party_address).append(p_date_time);
	div_card.append(div_card_body);

	if(operation["type"]=="payment" || operation["type"]=="create_account" || operation["type"]=="account_merge"){
		/* To include creation of account as a form of transaction to address */
		$('#modal_transactions_body').append(div_card);
	}else if(operation["type"]=="inflation"){
		$('#modal_inflations_body').append(div_card);
	}
}