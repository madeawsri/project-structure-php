<?php

/**
 * FUNCTION FOR SYSTEM
 */
function root_url()
{
  return Config::ACCEPT_URL_TYPE . "://{$_SERVER['SERVER_NAME']}{$_SERVER['REQUEST_URI']}";
}

function base_url()
{
  $project_folder = "/" . Config::PROJECT_FOLDER;
  return Config::ACCEPT_URL_TYPE . "://{$_SERVER['HTTP_HOST']}{$project_folder}/public/";
}

function base_default_url()
{
  return base_project() . "/" . Config::PROJECT_DEFUALT_MODULES . "/";
}

function debug_time()
{
  return Config::PROJECT_DEBUG ? '?' . time() : '';
}

function base_project()
{
  $project_folder = "/" . Config::PROJECT_FOLDER;
  return Config::ACCEPT_URL_TYPE . "://{$_SERVER['HTTP_HOST']}{$project_folder}";
}
function base_link($link)
{
  return base_project() . "/{$link}/";
}
function base_module()
{
  return base_project() . "/modules/" . Core::$module_name;
}
function link_module_db($jsondb = 'json')
{
  return base_module() . "/{$jsondb}.php";
}
function link_module_class($class = 'myclass')
{
  return base_module() . "/{$class}.php";
}
function link_module_js($index = 'index')
{
  return base_module() . "/{$index}.js" . debug_time();
}
function link_core_js($index = 'Core')
{
  return base_project() . "/app/libs/{$index}.js" . debug_time();
}
function link_helper_db()
{
  return base_link('helpers') . "json.php";
}

function base_js()
{
  return "
    <script>
       var jModuleDb = '" . link_module_db() . "'
       ,jHelperDb = '" . link_helper_db() . "'
       ,jBaseIndex = '" . base_link('index') . "'
       ,jBaseLogin = '" . base_link('login') . "'
       ,jBaseHome = '" . base_link('account') . "'
       ,jBaseURL = '" . base_url() . "'
       ,jModule = '" . base_link(Core::$module_name) . "'
       ,jFnModule = '".link_module_class()."';
    </script>
    <!-- Core JS -->
       <script src='" . link_core_js() . "'></script>
    <!-- Modules JS -->
       <script src='" . link_module_js() . "'></script>
    ";
}

function module_js($module_name)
{
  return " <script src='" . link_module_js($module_name) . "'></script>";
}

function get_module_name()
{
  $url = isset($_GET['url']) ? $_GET['url'] : Core::DEFAULT_MODULE_NAME;
  if ($url) {
    $url = rtrim($url, '/');
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);
    if (isset($url[0])) {
      return $url[0];
    }
  } else {
    return  Core::DEFAULT_MODULE_NAME;
  }
}
