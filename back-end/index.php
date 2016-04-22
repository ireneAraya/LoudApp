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
        $finalResult = [];

        if (array_key_exists("success", $result)) {
            $emailTo = $result["data"]["email"];
            $emailFrom = 'noreply@loudapp.rocks';

            $emailBody = file_get_contents('./../front-end/templates/account_template.html');
            $emailBody = str_replace('%%name%%', $result["data"]["firstName"], $emailBody);
            $emailBody = str_replace('%%email%%', $result["data"]["email"], $emailBody);
            $emailBody = str_replace('%%password%%', $result["data"]["password"], $emailBody);
            $emailBody = str_replace('%%currentYear%%', date("Y"), $emailBody);

            $nSent = sendMail($emailTo, $emailBody, '👋 Welcome to Loud App');

            if ($nSent > 0) {
                $finalResult["success"] = true;
                $finalResult["message"] = "We have created your account. We will send you an email to verify your account.";
            } else {
                $finalResult["error"] = true;
                $finalResult["message"] = $result["message"];
            }
        } else {
            $finalResult["error"] = true;
            $finalResult["message"] = $result["message"];
        }

        return $response->withJson($finalResult);
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

        if (array_key_exists('error', $result)) {
            $finalResult['error'] = true;
            $finalResult['message'] = $result['message'];
        } else {
            $emailTo = $result["user_data"]["email"];

            $emailBody = file_get_contents('./../front-end/templates/password_template.html');
            $emailBody = str_replace('%%name%%', $result["user_data"]["firstName"], $emailBody);
            $emailBody = str_replace('%%password%%', $result["user_data"]["password"], $emailBody);
            $emailBody = str_replace('%%currentYear%%', date("Y"), $emailBody);

            $nSent = sendMail($emailTo, $emailBody, '🚩 Password Reset for your Account');

            if ($nSent > 0) {
                $finalResult["success"] = true;
                $finalResult["message"] = "The recovery password has been sent to your email.";
            } else {
                $finalResult["error"] = true;
                $finalResult["message"] = "The was an error requesting your new password please try again.";
            }
        }

        return $response->withJson($finalResult);
    }
);

function sendMail ($emailTo, $emailBody, $eSubject = 'An Important Message from your Account') {
    $emailFrom = 'noreply@loudapp.rocks';

    $transporter = Swift_SmtpTransport::newInstance('smtp.zoho.com', 465, 'ssl')
                    ->setUsername($emailFrom)
                    ->setPassword('E,bA7_0^Vz~1v{H');

    $mailer = Swift_Mailer::newInstance($transporter);
    $eMessage = Swift_Message::newInstance($eSubject)
      ->setContentType('text/html')
      ->setFrom(array($emailFrom => 'The Loud App Team'))
      ->setSender($emailTo)
      ->setCharset('utf-8')
      ->setBcc('hostmaster@loudapp.rocks')
      ->setTo($emailTo)
      ->setBody(trim($emailBody));

    $nSent = $mailer->send($eMessage);
    return $nSent;
};

// Corremos la aplicación.
$app->run();
