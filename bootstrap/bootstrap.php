<?php

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;
use Illuminate\Validation\Factory;


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
    'prefix'    => $table_prefix,
];

$capsule = new Capsule;

// Setup the Eloquent ORM
$capsule->addConnection($dbConfig);

$capsule->setAsGlobal();
$capsule->bootEloquent();

// Setup the Validator
$filesystem = new Filesystem();
$loader = new FileLoader($filesystem, __DIR__ . '/../lang');
$translator = new Translator($loader, 'en');
$validator = new Factory($translator);

// Make the validator available globally
global $validator;
$validator = $validator;