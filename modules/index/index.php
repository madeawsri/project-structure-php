<?php
class Page extends Controller { 
   function index(){
       $params = [
         'login'=> (new MD\Login())->index()
       ];
       $this->page_render('view', $params);
   }
}