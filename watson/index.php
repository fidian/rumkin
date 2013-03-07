<?php

require_once(__DIR__ . '/../vendor/phptools/autoload.php');

$request = new WebRequest();
$sections = array();
$sections['Cookies'] = Dump::out($request->cookie())->returned();
$sections['GET Variables'] = Dump::out($request->get())->returned();
$sections['POST Variables'] = Dump::out($request->post())->returned();
$sections['Request Headers'] = Dump::out(apache_request_headers())->returned();

$ul = new Ultralite(__DIR__ . '/templates');
$ul->sections = $sections;
echo $ul->render('index.html');
