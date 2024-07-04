<?php

use Illuminate\Database\Capsule\Manager as Capsule;


if (!defined('ABSPATH')) {
    exit; 
}

require_once __DIR__ . '/../vendor/autoload.php';

if (!defined('DB_HOST')) {
    require_once(__DIR__ . '/../../../../../wp-config.php');
}

$dbConfig = [
    'driver'    => 'mysql',
    'host'      => DB_HOST,
    'database'  => DB_NAME,
    'username'  => DB_USER,
    'password'  => DB_PASSWORD,
    'charset'   => defined('DB_CHARSET') ? DB_CHARSET : 'utf8mb4',
    'collation' => defined('DB_COLLATE') ? DB_COLLATE : 'utf8_unicode_ci',
    'prefix'    => $table_prefix,
];

$capsule = new Capsule;

$capsule->addConnection($dbConfig);

$capsule->setAsGlobal();
$capsule->bootEloquent();
