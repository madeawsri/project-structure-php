<?php
class Page extends Controller { 
   function index(){
       $this->set_page('subtitle','INDEX');
       $params = [];
       $this->page_render('view', $params);
   }
}