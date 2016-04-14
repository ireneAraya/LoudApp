<?php

/**
 * UserController.php
 * Responsabilidades de cada función pública:
 * - Tomar las peticiones desde AngularJS.
 * - Preparar y enviarlas al servicio en PHP.
 * - Recibir las respuesta del servicio en PHP.
 * - Prepararlas y enviarlas de vuelta a AngularJS.
 */

namespace App\Controllers;

use App\Services\UserService;
use Slim\Http\Request;

class UserController {

    private $userService;
    private $nombreCookie = "loggedIn";

    /**
     * UserController constructor.
     */
    public function __construct() {
        $this->userService = new UserService();
    }

    /**
     * Intermediario entre el Front-End y el servicio.
     *
     * @param Request $request
     *
     * @return []
     */
    public function login($request) {
        $result = [];

        /**
         * El contenido de las peticiones tipo `POST` se obtiene llamando a `getParsedBody`.
         * El valor de retorno de esa función es un diccionario con el contenido del formulario.
         */
        $formData = $request->getParsedBody();
        $email = null;
        $password = null;

        // Verificamos que efectivamente exista una entrada de email
        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        // Verificamos que efectivamente exista una entrada de password
        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        /**
         * Si tanto email y password están definidos, mandamos a llamar al método de login del servicio.
         * Tenga en cuenta que el controlador solo pasa datos de un lado a otro, al servicio en PHP le toca revisar
         * la validez de esos datos.
         */
        if (isset($email, $password)) {
            $loginResult = $this->userService->login($email, $password);

            if (array_key_exists("error", $loginResult)) {
                $result["error"] = true;
            } else {
                /**
                 * Si el usuario inició sesión, creamos un cookie llamado `loggedIn` y le asignamos el valor de true.
                 * Este cookie se debe expirar en caso de cerrar sesión.
                 * http://php.net/manual/en/function.setcookie.php
                 */
                setcookie($this->nombreCookie, true, time()+3600);
            }

            $result["message"] = $loginResult["message"];
        } else {
            $result["error"] = true;
            $result["message"] = "Email and password can not be empty.";
        }

        // El array creado en ese método se envía como de vuelta al enrutador.
        return $result;
    }

    /**
     * Cierra la sesión del usuario del lado del back-end.
     *
     * @param Request $request
     *
     * @return string []
     */
    public function logout($request) {
        $result = [];

        /**
         * TODO: Implementar
         * Pasos
         * - Elimine cualquier cookie que se pudo haber creado en el back-end al iniciar sesión. Recuerde que para
         * eliminar cookies, se debe poner una fecha de expiración en el pasado.
         * Importante, este método no tiene llamada al servicio en PHP porque de momento no existe ninguna operación
         * en el servicio que lo requiera. Esto podría cambiar en su aplicación.
         */

        return $result;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param Request $request
     *
     * @return string []
     */
    public function register($request) {
        $result = [];

        /**
         * TODO: Implementar
         * Pasos
         * - Tome los datos del formulario, similar al método de login.
         * - Verifique que todos los datos existan.
         * - Si efectivamente existen, llame al método `register` del lado del servicio.
         * - Comunique de vuelta al Front-End el resultado de la operación con un array que tenga la misma estructura
         * al que se usó en el método `login`.
         */
        $formData = $request->getParsedBody();
        $required_fields = ["email", "password", "repeatPassword", "fullName"];

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        if (array_key_exists("repeatPassword", $formData)) {
            $passwordConfirm = $formData["repeatPassword"];
        }

        if (array_key_exists("fullName", $formData)) {
            $fullName = $formData["fullName"];
        }

        if (isset($email, $password, $passwordConfirm, $fullName)) {
            $registerUser = $this->userService->register($email, $password, $passwordConfirm, $fullName);

            if (array_key_exists("error", $registerUser)) {
                $result["error"] = true;
                $result["message"] = $registerUser["message"];
            } else {
                $result["message"] = $registerUser["message"];
            }
        } else {
            $result["error"] = true;
            $result["error"] = "Email and passwords can not be empty.";
        }

        return $result;
    }

}
