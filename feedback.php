<?php

/*

feedback.php v1.0.0

Copyright (c)2014 Sergey Serafimovich

This script handles AJAX requests from a conact form
and sends a message via email with a selected transport.

*/

/************************************************

Configuration

************************************************/

// Hide errors from users. Set '1' for debugging purposes.
ini_set('display_errors', 0);

// Recipient e-mail
$TO_EMAIL = 'yourname@gmail.com';

// Recipient name
$TO_NAME = 'Your Name';

// Subject
$SUBJECT = 'Message from yoursite.com';

// Body before
$BODY_BEFORE = '<p>You have a message:</p><hr/>';

// Body after
$BODY_AFTER = '<hr/><p>This message was sent via contact form on your site.</p>';

// Transport (available transports are: 'smtp', 'sendmail' and 'mail')
$TRANSPORT = 'smtp';


// SMTP Settings

// SMTP host
$SMTP_HOST = 'tls://smtp.gmail.com';

// SMTP port
$SMTP_PORT = 465;

// SMTP username
$SMTP_USERNAME = 'yourname@gmail.com';

// SMTP password
$SMTP_PASSWORD = 'Y0urPa55w0rd';


// Sendmail settings

// Linux command to run Sendmail
$SENDMAIL_RUN = '/usr/sbin/sendmail -bs';


/************************************************

Process sending

************************************************/


// Allow only post method
if($_SERVER["REQUEST_METHOD"] == "POST") {
	// Send headers
	header('HTTP/1.1 200 OK');
	header('Status: 200 OK');
	header('Content-type: application/json');
	
	
	/************************************************
	
	Validating parameters
	
	************************************************/

	$email = $_POST["email"];
	$name = $_POST["name"];
	$message = $_POST["message"];
	
	$nonValid = array();
	
	// Check if fields are valid
	if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $nonValid[] = "email";
	if(empty($name)) $nonValid[] = "name";
	if(empty($message)) $nonValid[] = "message";
	
	// If some of them are not valid then return error
	if(!empty($nonValid)) {
		echo json_encode(array(
			"status" => "error",
			"type" => "ValidationError",
			"fields" => $nonValid
		));
		
		die();
	}


	/************************************************
	
	Senging the message
	
	************************************************/
	
	
	// Include SwiftMailer library
	require_once 'assets/libs/SwiftMailer/lib/swift_required.php';
	
	
	// Create transport
	if($TRANSPORT == "smtp" && !empty($SMTP_HOST) && !empty($SMTP_PORT) && !empty($SMTP_USERNAME) && isset($SMTP_PASSWORD)) {
	
		// SMTP
		$swift_transport = Swift_SmtpTransport::newInstance($SMTP_HOST, $SMTP_PORT)
			->setUsername($SMTP_USERNAME)
			->setPassword($SMTP_PASSWORD)
			;
	} elseif ($TRANSPORT == "sendmail" && !empty($SENDMAIL_RUN)) {
		// Sendmail
		$swift_transport = Swift_SendmailTransport::newInstance($SENDMAIL_RUN);
	} elseif($TRANSPORT == "mail") {
		// Mail
		$swift_transport = Swift_MailTransport::newInstance();
	}
	
	
	// Create the message
	$message = Swift_Message::newInstance($SUBJECT)
	
	  // Set the From address with an associative array
	  ->setFrom(array($email => $name))
	
	  // Set the From address with an associative array
	  ->setReplyTo(array($email => $name))

	  // Set the To addresses with an associative array
	  ->setTo(array($TO_EMAIL => $TO_NAME))
	
	  // Give it a body
	  ->setBody($BODY_BEFORE.$message.$BODY_AFTER, 'text/html')
	  ;

	
	try {
		// Create the Mailer using your created Transport
		$mailer = Swift_Mailer::newInstance($swift_transport);
		
		// Send the message
		$result = $mailer->send($message);
	} catch (Exception $e) {
		echo json_encode(array(
				"status" => "error",
				"type" => "TransportError"
			));
		die();
	}	
	
	// If message was sent
	if($result) {
		echo json_encode(array(
				"status" => "success"
			));
	} else {
		echo json_encode(array(
				"status" => "error",
				"type" => "SendingError"
			));
	}

} else {
	header('HTTP/1.1 403 Forbidden');
	header('Status: 403 Forbidden');
}


