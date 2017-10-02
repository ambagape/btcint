<?php

require 'vendor/autoload.php';
use Mailgun\Mailgun;

$mailgun = sendMailgun(json_decode(file_get_contents('php://input'), true)); 


if($mailgun) {

ajaxResponse('success', 'Great success.', sendMailgun(json_decode(file_get_contents('php://input'), true)), $mailgun);

} else {

ajaxResponse('error', 'Mailgun did not connect properly.', sendMailgun(json_decode(file_get_contents('php://input'), true)), $mailgun);

}
 

 
function ajaxResponse($status, $message, $data = NULL, $mg = NULL) {
  $response = array (
    'status' => $status,
    'message' => $message,
    'data' => $data,
    'mailgun' => $mg
    );
  $output = json_encode($response);
  exit($output);
}
 
function sendMailgun($data) {
 # Instantiate the client.
  $mgClient = new Mailgun('key-e38f2019428138e4bc2e35c86f98d2d4');
  $domain = 'hosatek.com';
  $activationUrl = "http://localhost/tempo/adminoxadmin-12/frontend/adminapp/app/";
  $messageBody = "<html><p>Hello " . $data['name'] . ",</p>" .
                                    "<p>Welcome to BTC Interest.</p>
									<p>Thanks.</p>
									 <p>  Zack Bryan<br/> CEO, BTC Interest </p>
									</html>";
 
  
  # Make the call to the client.
	$result = $mgClient->sendMessage($domain, array(
		'from'    => 'Btc Interest <admin@hosatek.com>',
		'to'      =>  $data['email'],
		'subject' => "Hello, Thanks For Joining BtcInterest Account",
		'html'    => $messageBody
	));
  
  return $result;
 
}
?>