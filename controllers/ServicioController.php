<?php 

namespace Controllers;
use MVC\Router;
use Model\Servicio;
 
class ServicioController{
    public static function index(Router $router){
        if (!$_SESSION['nombre']) {
            session_start();
        }
        $router->render('servicios/index',[
            'nombre'=> $_SESSION['nombre']
        ]);
    }
    public static function crear(Router $router){
        if (!$_SESSION['nombre']) {
            session_start();
        }
        $servicio = new Servicio();
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            
        }
        $router->render('servicios/crear',[
            'nombre'=> $_SESSION['nombre'],
            'servicio' => $servicio
        ]);
    }
    public static function actualizar(Router $router){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            
        }
        $router->render('servicios/actualizar',[
            'nombre'=> $_SESSION['nombre']
        ]);
    }
    public static function eliminar(Router $router){
       if($_SERVER['REQUEST_METHOD'] === 'POST'){

       }
    }
}