<?php
$email=$_POST['email'];
$psw=$_POST['psw'];
$psw-repeat=$_POST['psw-repeat'];


$conn=new mysqli('locolhost','root','','ULS');
if($conn->connect_error){
    die('Connection failed:'.$conn->connect_error);
}
else{
    $stmt=$conn->prepare("insert into signup(email,psw,psw-repeat)
    values(?,?,?)");
    $stmt->bind_param("sss",$email,$psw,$psw-repeat);
    $stmt->execute();
    echo "signup successful....";
    $stmt->close();
    $conn->close();
}
?>