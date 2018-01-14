function set_alert_xlm_usd(event, state){
	boo_alert_xlm_usd = state;
	alert_xlm_usd();
}

function alert_xlm_usd(){
	if(boo_alert_xlm_usd==true){
	    Push.create('OurStellar', {
	        body: xlm_usd + ' USD',
	        icon: './resource/favicon.ico',
	        tag: 'ourstellar',
	        vibrate: [200, 100, 200, 100, 200, 100, 200],
		    onClick: function () {
		        window.focus();
		        this.close();
		    }
	    });
	}
}

$(document).ready(function (){
	$("[name='checkbox_alert_xlm_usd']").bootstrapSwitch('state', false);
	$("[name='checkbox_alert_xlm_usd']").on('switchChange.bootstrapSwitch', function(event, state) {
		set_alert_xlm_usd(event, state);
	});

/*
	$("[name='checkbox_alert_custom_xlm_usd_change']").bootstrapSwitch('state', false);
	$("[name='checkbox_alert_custom_xlm_usd_change']").on('switchChange.bootstrapSwitch', function(event, state) {
		
	});
*/
});