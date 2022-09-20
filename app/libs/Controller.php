<?php

use Windwalker\Renderer\BladeRenderer;
//Load the model and the view
class Controller
{
  public static  $view_paths = [__DIR__ . '/../../template'];

  public static $page = [];

  public function set_page($op, $v)
  {
    // page_title, page_subtitle, page_desc
    return self::$page['page_' . $op] = $v;
  }

  public function __construct()
  {
    $this->set_view_path(__DIR__ . '/../../modules/' . Core::$module_name);
    self::$page = [
      'page_title' => Config::PROJECT_NAME,
      'page_subtitle' => 'HOME',
      'page_desc' => ''
    ];
  }

  public function set_view_path($view_path)
  {
    self::$view_paths[] = $view_path;
  }

  public  function page_render($view_name, $datas = [])
  {
    $render = new BladeRenderer(self::$view_paths, array('cache_path' => __DIR__ . '\\..\\cache'));
    echo  $render->render($view_name, array_merge($datas, $_REQUEST, self::$page));
  }

  public function page_print($view_name, $datas = [])
  {
    $render = new BladeRenderer(self::$view_paths, array('cache_path' => __DIR__ . '\\..\\cache'));
    return  $render->render($view_name, array_merge($datas, $_REQUEST, self::$page));
  }

  public function load_view($view_name, $datas = [])
  {
    $render = new BladeRenderer(self::$view_paths, array('cache_path' => __DIR__ . '\\..\\cache'));
    return  $render->render($view_name, array_merge($datas, $_REQUEST, self::$page));
  }

}
