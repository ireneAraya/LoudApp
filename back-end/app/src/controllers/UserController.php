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

        $formData = $request->getParsedBody();
        $email = null;

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (isset($email)) {
            $userResult = $this->userService->forgotPassword($email);

            if (array_key_exists("error", $userResult)) {
                $result["error"] = true;
                $result["message"] = $verifyResult["message"];
            } else {
                require("./../../lib/");
            }

        } else {
            $result["error"] = true;
            $result["message"] = "Please provide an email address.";
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