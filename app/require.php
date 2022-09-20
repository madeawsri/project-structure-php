<?php
session_start();
//Require libraries from folder libraries
require_once __DIR__ . '/libs/vendor/autoload.php';

require_once __DIR__ .'/config/config.php';
require_once __DIR__ .'/libs/Security.php';
require_once __DIR__ .'/libs/Connections.php';
require_once __DIR__ .'/libs/Core.php';
require_once __DIR__ .'/libs/Controller.php';
require_once __DIR__ .'/libs/Base.php';
require_once __DIR__ .'/libs/Functions.php';

$module_dir = __DIR__."/../modules/";
foreach(array_diff(scandir($module_dir), array('..', '.'))  as $v){
  $path_module_class  = $module_dir."{$v}/{$v}.class.php";
  if(is_file($path_module_class)){
    require_once $path_module_class;
  }
}
  

