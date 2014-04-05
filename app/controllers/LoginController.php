<?php

class LoginController extends BaseController {
     public function showModal(){
         return Response::view('security/mdlLogin');
     }
}
