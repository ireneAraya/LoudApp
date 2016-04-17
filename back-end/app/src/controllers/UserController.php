<?php

namespace App\Controllers;

use App\Services\UserService;
use Slim\Http\Request;

class UserController {

    private $userService;
    private $cookieName = "userLoggedIn";

    public function __construct() {
        $this->userService = new UserService();
    }

    public function login($request) {
        $result = [];

        $formData = $request->getParsedBody();
        $email = null;
        $password = null;

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        if (isset($email, $password)) {
            $loginResult = $this->userService->login($email, $password);

            if (array_key_exists("error", $loginResult)) {
                $result["error"] = true;
            } else {
                setcookie($this->cookieName, true, time()+3600);
            }

            $result["message"] = $loginResult["message"];
        } else {
            $result["error"] = true;
            $result["message"] = "Email and password cannot be empty.";
        }

        return $result;
    }

    public function verifyUser () {
        $result = [];

        $verifyResult = $this->userService->verifyUser();

        if (array_key_exists("error", $verifyResult)) {
            $result["error"] = true;
            $result["message"] = $verifyResult["message"];
        } else {
            $result["success"] = true;
            $result["message"] = $verifyResult["message"];
            $result["data"] = $verifyResult["data"];
        }

        return $result;
    }

    public function logout () {
        $result = [];

        $verifyResult = $this->userService->logout();

        if (array_key_exists("error", $verifyResult)) {
            $result["error"] = true;
            $result["message"] = $verifyResult["message"];
        } else {
            setcookie($this->cookieName, true, time()-604800);
            $result["success"] = true;
            $result["message"] = $verifyResult["message"];
        }

        return $result;
    }

    public function forgotPassword ($request) {
        $result = [];

        function randomPassword () {
            return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#^_-+=@!&$*()';[]{}\|~<>/?"), 0, 10);
        };

        $formData = $request->getParsedBody();
        $email = null;

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (isset($email)) {
            $recoverPassword = trim(randomPassword());

            $passwordResult = $this->userService->changeUserPassword($email, $recoverPassword);

            if (array_key_exists("error", $passwordResult)) {
                $result["error"] = true;
                $result["message"] = $passwordResult["message"];
            } else {
                require_once("/Users/kronos/Desktop/LoudApp/back-end/lib/swiftmailer/swift_required.php");
                $emailTo = $passwordResult["data"]["email"];
                $emailFrom = "noreply@danielmunnoz.com";
                $emailBody = "
                    <h4>Hi ".$passwordResult["data"]["firstName"]."</h4>
                    <p>You have requested a new password.<p>
                    <p>Your temporary passpord is:<p>
                    <p><strong>".$recoverPassword."</strong></p>
                ";

                $eTransport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');
                $eMailer = Swift_Mailer::newInstance($eTransport);
                $eMessage = Swift_Message::newInstance('Request for Password Reset')
                  ->setContentType('text/html')
                  ->setFrom(array($emailFrom => 'Loud App'))
                  ->setSender($emailTo)
                  ->setCharset('utf-8')
                  ->setTo($emailTo)
                  ->setBcc("hostmaster@danielmunoz.cr")
                  ->setBody(trim($emailBody));

                $nSent = $eMailer->send($eMessage);

                if ($nSent > 0) {
                    $result["success"] = true;
                    $result["message"] = "The recovery password has been sent to your email.";
                } else {
                    $result["error"] = true;
                    $result["message"] = "The was an error requesting your new password please try again.";
                }
            }
        }

        return $result;
    }

    public function register($request) {
        $result = [];

        $formData = $request->getParsedBody();
        $required_fields = ["email", "password", "repeatPassword", "fullName"];

        // if (array_key_exists("email", $formData)) {
        //     $email = $formData["email"];
        // }

        // if (array_key_exists("password", $formData)) {
        //     $password = $formData["password"];
        // }

        // if (array_key_exists("repeatPassword", $formData)) {
        //     $passwordConfirm = $formData["repeatPassword"];
        // }

        // if (array_key_exists("fullName", $formData)) {
        //     $fullName = $formData["fullName"];
        // }

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