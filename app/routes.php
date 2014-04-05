<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the Closure to execute when that URI is requested.
  |
 */

/*
  |--------------------------------------------------------------------------
  | Seguridad
  |--------------------------------------------------------------------------
  |
  | Manejo de seguridad de usuarios en controlador SecurityController
  |
 */
Route::get('logout', 'SecurityController@current_user');
Route::get('current_user', 'SecurityController@current_user');
Route::get('permisos', 'SecurityController@permisos');
Route::post('login', 'SecurityController@login');
/*
  |--------------------------------------------------------------------------
  | vistas parciales protegidas
  |--------------------------------------------------------------------------
  |
  | Aquí deberan de ir todas las vistas parciales que se requieran proteger
  | con access control list ACL
  |
 */


Route::group(array('before' => 'auth|ACL', 'prefix' => 'views'), function()
{
    
});
Route::group(array('prefix' => 'views'), function()
{
    Route::get('/', 'PruebaController@index');
    Route::get('mdlLogin', 'LoginController@showModal');
    Route::get('main_menu', 'MenuController@mainMenu');
    Route::get('main_footer', 'MenuController@mainFooter');
});


Route::get('/', function()
{
     return Redirect::to('/app');
});
