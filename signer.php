<?php
include "LiqPay.php";
$public_key = 'sandbox_i87078030762';
$private_key = 'sandbox_kND4HBerzNqiMYWjZzoqTJGNYD32ON8otLxP5zm0';

$amount = $_GET['amount'];
$currency = $_GET['currency'];

$liqpay = new LiqPay($public_key, $private_key);
$phpdata = $liqpay->ptb_form(array(
'action'         => 'pay',
'amount'         => $amount,
'currency'       => $currency,
'description'    => 'description text',
'order_id'       => 'order_id_1',
'version'        => '3'
));


// Повертаємо JSON відповідь
echo json_encode(array(
  'data' => $phpdata['data'],
  'signature' => $phpdata['signature']
));