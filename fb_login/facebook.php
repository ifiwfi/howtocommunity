<?php
	$con = mysqli_connect('localhost', 'root', '', 'facebook');

	$result = mysqli_query($con, 'SELECT * FROM login WHERE email = "'.$_POST["email"].'" ');

	if( $result && $user_info = mysqli_fetch_array( $result ) ){
		$response_to_send['user_info'] = $user_info;
		$response_to_send['status'] = 'already saved';
	}
	else{

		$res = mysqli_query($con, "INSERT INTO login (first_name, last_name, email) VALUES ('".$_POST['first_name']."', '".$_POST['last_name']."', '".$_POST['email']."')");
		$response_to_send['status'] = 'saved';
	}

	echo json_encode($response_to_send);
?>