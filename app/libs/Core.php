<?php
class Core
{
  private $currentController = 'Page';
  private $currentMethod = 'index';
  private $params = [];
  const DEFAULT_MODULE_NAME = "index";
  const DEFAULT_MODULE_FILE = "index.php";
  const DEFAULT_DIR = __DIR__ . "/../..";
  public static  $module_name = "";
  public static  $project_name = "";
  public static  $module_root = "";
  public static  $module_path = "";

  public function __construct()
  {
    // Look in BLL for first value
    $path = $this->get_module_path();

    if (file_exists(self::$module_path)) {
      // If exists, set as controller
      // Require the controller
      require_once self::$module_path;
	  
	  // Instantiate controller class
      $this->currentController = new $this->currentController;
	  
	  // Check for second part of url
      if (isset($path[1])) {
        // Check to see if method exists in controller
        if (method_exists($this->currentController, $path[1])) {
          $this->currentMethod = $path[1];
          // Unset 1 index
          unset($path[1]);
        } else {
          echo " 404 : Modules Not Found!";
          die();
        }
      }

      // // Get params
      $this->params = $path ? array_values($path) : [];
	  
      // // Call a callback with array of params
      call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
     
    } else {
      http_response_code(404);
      echo " 404 : Project Not Found!";
      die();
    }
  }

  public function get_module_path()
  {
    $url = isset($_GET['url']) ? $_GET['url'] : 'index';
    if ($url) {
      $url = rtrim($url, '/');
      $url = filter_var($url, FILTER_SANITIZE_URL);
      $url = explode('/', $url);
      if (isset($url[0])) {
        self::$module_name = $url[0];
        // return module_name form query string URL
        unset($url[0]);
      }
    } else {
      self::$module_name = self::DEFAULT_MODULE_NAME;
    }
    self::$module_root = self::DEFAULT_DIR . '/modules/' . self::$module_name;
    self::$module_path = self::$module_root . '/' . self::DEFAULT_MODULE_FILE;
    return $url;
  }

   
}
