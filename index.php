<!doctype html>
<html lang="en">
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37619065-3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-37619065-3');
    </script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="OurStellar">
    <meta name="author" content="OurStellar">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="OurStellar">
    <link rel="icon" href="./resource/favicon.ico">

    <link rel="icon" href="./resource/favicon.ico">
    <link rel="apple-touch-icon" href="./resource/favicon.ico">
    <link rel="apple-touch-startup-image" href="./resource/favicon.ico">
    <title>OurStellar</title>

    <!-- Bootstrap core CSS -->
    <link href="./resource/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap switch CSS -->
    <link href="./resource/css/bootstrapswitch/bootstrap-switch.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./resource/css/bootstrap/cover.css" rel="stylesheet">

    <script defer src="./resource/js/fontawesome/fontawesome-all.min.js"></script>
  </head>

  <body>
    <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <header class="masthead clearfix">
            <div class="inner">
              <a href="https://ourstellar.com"> 
                <h3 class="masthead-brand"><img class="coin-page__icon-img" src="./resource/img/stellar.svg" height="40" width="40"> OurStellar</h3>
              </a>
              <nav class="nav nav-masthead">
                <a class="nav-link active" href="https://ourstellar.com">Home</a>
              </nav>
            </div>
          </header>

          <main role="main" class="inner cover">
            <p><i class="far fa-briefcase fa-7x"></i></p>
            <h2 class="cover-heading">Your Stellar Wallet</h2>
            <h5><small class="text-muted">Wallet of truth.</small></h5>
            <p class="lead">
              <form onsubmit="submit_address(); return false;">
              <div class="input-group mb-3" id="input_addr_group">
                <input type="text" id="xlm_addr" class="form-control alert-dark" href="#" placeholder="Your public key. DO NOT GIVE YOUR SECRET KEY." aria-label="Your public key" aria-describedby="basic-addon2" value="<?php if(isset($_GET['pk'])){ echo $_GET['pk']; } ?>">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary alert-light" id="btn-submit-addr" type="button">GO!</button>
                </div>
              </div>
              </form>
            </p>
            <p class="lead">
              <div class="h6" id="xlm-usd">
              </div>
            </p>
            <div class="card" id="addr_info_card" style="display: none;">
              <div class="card-body" id="addr_info_card_content">
                <div class="h6" id="addr_balance"></div>
                <hr>
                <p class="card-text">How can I help you?</p>
                <p class="card-text">
                  <div class="btn-group-vertical">
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal_transactions" id="btn_transactions">View Transactions</button>
                    <button type="button" class="btn btn-info" data-target="#modal_inflations" id="btn_inflations">View Inflations Received</button>
                  </div>
                </p>
                <small class="text-muted">*Currently supporting up to past 100 transactions.</small>
                <hr>
                <p class="card-text">You may also do the following:</p>
                  <div class="btn-group-vertical">
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal_alerts" id="btn_alerts">Set Alerts</button>
                  </div>
              </div>
            </div>
          </main>
          <footer class="mastfoot">
            <div class="inner">
              <p>Donation for <a href="#" id="a_modal_donations">OurStellar</a></p>
            </div>
          </footer>
        </div>
      </div>
    </div>

    <!--
    Modals here
    -->
    <div class="modal fade" id="modal_transactions" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Transactions</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modal_transactions_body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_inflations" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inflations</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modal_inflations_body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_alerts" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Alerts (Beta)</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modal_alerts_body">
            <ul class="list-group">
              <li class="list-group-item">
                <container>
                  <div class="row">
                      <small class="col-12 text-muted">Works on non-iOS devices only. Leave page open at background.</small>
                  </div>
                </container>
              </li>
              <li class="list-group-item">
                <container>
                  <div class="row">
                    <div class="col-6 text-left">
                      XLM/USD Price Updates
                    </div>
                    <div class="col-6 text-right">
                      <input type="checkbox" name="checkbox_alert_xlm_usd" data-size="small">
                    </div>
                  </div>
                </container>
              </li>
              <!--
              <li class="list-group-item">
                <container>
                  <div class="row">
                    <div class="col-6 text-left">
                      <input type="text" id="percent_xlm_usd" class="form-control alert-dark" href="#" placeholder="%" value=""> price change in XLM/USD
                    </div>
                    <div class="col-6 text-right">
                      <input type="checkbox" name="checkbox_alert_custom_xlm_usd_change" data-size="small">
                    </div>
                  </div>
                </container>
              </li>
            -->
              <li class="list-group-item"><small class="text-muted">More Coming Soon...</small></li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_donations" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">You may buy me a coffee!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modal_donations_body">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-left">XLM Address:</h5>
                <p class="small card-text text-muted text-center">GAIHEKTLFHQZYSOB77QE4Q2VFR7PG7UN5JJFLOTKZMMPORVEXPMCUWP3</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script>window.jQuery || document.write('<script src="./resource/js/jquery/jquery-3.2.1.min.js"><\/script>')</script>
    <script>
      var xlm_usd = 0;
      var xlm_usd_ori = 0;
      var boo_alert_xlm_usd = false;
      var xlm = 0;
      var valid_address = 0;
      var inflation_address = "";

      /*
      Add all inflation pool address here.
      */
      var inflation_addresses = ["GA3FUYFOPWZ25YXTCA73RK2UGONHCO27OHQRSGV3VCE67UEPEFEDCOPA"];
    </script>
    <script src="./resource/js/bootstrap/popper.min.js"></script>
    <script src="./resource/js/bootstrap/bootstrap.min.js"></script>
    <script src="./resource/js/bootstrapswitch/bootstrap-switch.min.js"></script>
    <script src="./resource/js/push/push.min.js"></script>
    <script src="./resource/js/numeral/numeral.min.js"></script>
    <script src="./resource/js/custom/price.js"></script>
    <script src="./resource/js/custom/address.js"></script>
    <script src="./resource/js/custom/operation.js"></script>
    <script src="./resource/js/custom/alerts.js"></script>
    <script>
      $('#a_modal_donations').click(function(){
        $('#modal_donations').modal('show');
      });
    </script>
  </body>
</html>
