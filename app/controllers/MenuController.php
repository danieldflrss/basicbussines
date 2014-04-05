<?php

/**
 * Controlador para las vistas del menus y foooters
 */
class MenuController extends \BaseController
{

    /**
     * Muestra la vista del menu principal
     */
    public function mainMenu()
    {
        return Response::view('menus/main');
    }

    /**
     * Muestra la vista del footer principal
     */
    public function mainFooter()
    {
        return Response::view('menus/footer');
    }

}
