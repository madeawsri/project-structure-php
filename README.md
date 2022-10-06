# project-structure-php
Frontend &amp; Backend  , Full Stack Web Developers

**Run Composer to Vendor**
``` bash 
root_porject_path > composer install
```

**Folder Project**
-----
* app
  * config
    * config.php      
    ``` bash 
      # class Config ตัวแปรต่างๆ ที่จะใช้ร่วมกัน 
    ```
  * libs
    * Security.php
    ``` bash 
      # class Security เข้ารหัสและถอดรหัส 
    ```
    * Connections.php
    ``` bash 
      # การสร้างเชื่อมต่อฐานข้อมูลต่างๆ -> Eloquent ORM - Laravel
    ```
    * Core.php
    ``` bash 
      # จัดการโครงสร้าง url -> router 
    ```
    * Controller.php
    ``` bash 
      # จัดการโครงสร้าง Part-> Template , view -> blade (laravel)
    ```
    * Base.php
    ``` bash 
      # รวม functions พื้นฐานต่างๆ เกี่ยวกับ part url ในส่วนต่างๆ 
    ```
    * Functions.php
    ``` bash 
      # รวม functions ที่จำเป็นที่ใช้งานทุกส่วน
    ```
* models
    ``` php 
      # รวม Class ต่างๆ ที่จัดการในแต่ละตาราง ในฐานข้อมูล -> Eloquent ORM - Laravel
      # กำหนดชื่อไฟล์ ให้ตรงกับ ClassTableName
      <?php
      namespace DB; // สามารถเปลี่ยนได้ 
      use Illuminate\Database\Eloquent\Model as Eloquent;
      class ClassTableName extends Eloquent
      {
          protected $connection = " connection_name ";
          protected $table = ' table_name '; // Users
      }
    ```
* modules
  * index
    * index.js
    * index.php
    ``` php
    # เรียกว่า modules -> index
    # clase Page (ห้ามเปลี่ยน)
    # function index() คือ default function 
    <?php
    class Page extends Controller { // ห้ามเปลี่ยน ทำแบบนี้ทุก modules
      function index(){
          $params = [
            //'login'=> (new MD\Login())->index()
          ];
          $this->page_render('view', $params); // render form view.blade.php
      }
    }
    ```
    * json.php
    ``` php
      // จะทำการ ส่งค่าออกมาเป็น json เอาไว้สำหรับ ajax 
    ```
    * view.blade.php
    ``` php
      // จัดการ template จาก .blade (laravel)
      // จัดการ template ใน module index 
      // สามารถเรียนใช้ส่วนต่างๆ ได้ใน folder template
    ```
* public
  ``` php
      // จัดการส่วนต่างๆ ของฝั่ง HTML, JS, CSS 
      // รวมถึงส่วน client library ต่างๆ เช่น Jquery, Select2, sweetalert2
  ```
  * assets
    * css
    * js
* template
  ``` php
      // จัดการและกำหนดส่วนต่างๆ template โดยใช้หลักการ blade (laravel)
      // ตัวอย่างเช่น  header.blade.php , footer.blade.php
  ```

