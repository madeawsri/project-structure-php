<?php
// no cache file > end the link file 
function _time()
{
  return Config::PROJECT_DEBUG ? '?' . time() : '';
}
// router form get url
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
// base root dir
function base_dir($folder = '')
{
  return __DIR__ . '/../../' . ltrim($folder ? $folder : Config::PROJECT_FOLDER, '/');
}
// base root url
function base_url($folder = '')
{
  return Config::ACCEPT_URL_TYPE . "://{$_SERVER['HTTP_HOST']}/" . ltrim($folder ? $folder : Config::PROJECT_FOLDER, '/');
}
// link module
function base_module($module_name)
{
  return base_url('modules') . "/" . ltrim($module_name ? $module_name : Config::PROJECT_DEFUALT_MODULES, '/');
}
// link to helper file css
function base_helper_css($fname = 'core')
{
  return  base_url('app/helper') . "/{$fname}.css" . _time();
}
// link to helper file js
function base_helper_js($fname = 'core')
{
  return  base_url('app/helper') . "/{$fname}.js" . _time();
}

// base link module to db 
function base_module_db($module_name,$db='json'){
   return base_module($module_name."/{$db}.php")._time();
}
// base link module to js 
function base_module_js($module_name,$js='index'){
  return base_module($module_name."/{$js}.js")._time();
}
// base link module to css
function base_module_css($module_name,$css='index'){
  return base_module($module_name."/{$css}.css")._time();
}