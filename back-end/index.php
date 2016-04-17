<?php

/**
 * index.php
 * Inicia la aplicación y sirve como enrutador para el back-end.
 */

require "bootstrap.php";

use Slim\Http\Request;
use Slim\Http\Response;

// Muestra todos los errores
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$contenedor = new \Slim\Container($configuration);

// Crea una nueva instancia de SLIM mostrando todos los errores
// http://www.slimframework.com/docs/handlers/error.html
$app = new \Slim\App($contenedor);

// Definimos nuestras rutas
$app->post(
    '/user/login',
    function ($request, $response) {
        // http://stackoverflow.com/questions/12158987/whats-the-meaning-of-var-in-php-comments
        /** @var Request $request */
        /** @var Response $response */

        // Pedimos una instancia del controlador del usuario
        $userController = new App\Controllers\UserController();

        // Almacenamos el resultado de la operación en la siguiente variable
        $result = $userController->login($request);

        // Retornamos un JSON con el resultado al Front-End
        return $response->withJson($result);
    }
);

$app->get(
    '/user/logout',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->logout($request);
        return $response->withJson($result);
    }
);

$app->post(
    '/user/register',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->register($request);
        return $response->withJson($result);
    }
);

$app->get(
    '/user/verify',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->verifyUser();
        return $response->withJson($result);
    }
);

$app->post(
    '/user/logout',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->logout($request);
        return $response->withJson($result);
    }
);

$app->post(
    '/user/forgot-password',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->forgotPassword($request);
        $finalResult = [];

        if ($result["success"]) {
            $emailTo = $result["user_data"]["email"];
            $emailFrom = "noreply@danielmunnoz.com";
            $emailBody = "
                <h4>Hi ".$result["user_data"]["firstName"]."</h4>
                <p>You have requested a new password.<p>
                <p>Your temporary passpord is:<p>
                <p><strong>".$result["user_data"]["password"]."</strong></p>
            ";

            $transport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');
            $mailer = Swift_Mailer::newInstance($transport);
            $eMessage = Swift_Message::newInstance('Request for Password Reset')
              ->setContentType('text/html')
              ->setFrom(array($emailFrom => 'Loud App'))
              ->setSender($emailTo)
              ->setCharset('utf-8')
              ->setTo($emailTo)
              // ->setBcc("hostmaster@danielmunoz.cr")
              ->setBody(trim($emailBody));

            $nSent = $mailer->send($eMessage);

            if ($nSent > 0) {
                $finalResult["success"] = true;
                $finalResult["message"] = "The recovery password has been sent to your email.";
            } else {
                $finalResult["error"] = true;
                $finalResult["message"] = "The was an error requesting your new password please try again.";
            }
        } else {
            $finalResult["error"] = true;
            $finalResult["message"] = "The was an error requesting your new password please try again.";
        }

        return $response->withJson($finalResult);
    }
);

// Corremos la aplicación.
$app->run();
