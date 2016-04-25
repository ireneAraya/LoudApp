<?php

namespace App\Controllers;

use App\Services\LoudService;
use Slim\Http\Request;

class UserController {

    private $LoudService;
    private $cookieName = "userLoggedIn";

    public function __construct() {
        $this->LoudService = new LoudService();
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
            $loginResult = $this->LoudService->login($email, $password);

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

        $verifyResult = $this->LoudService->verifyUser();

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

        $verifyResult = $this->LoudService->logout();

        if (array_key_exists("error", $verifyResult)) {
            $result["error"] = true;
            $result["message"] = $verifyResult["message"];
        } else {
            setcookie($this->cookieName, '', time()-1);
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

            $passwordResult = $this->LoudService->changeUserPassword($email, $recoverPassword);

            if (array_key_exists("error", $passwordResult)) {
                $result["error"] = true;
                $result["message"] = $passwordResult["message"];
            } else {
                $result["success"] = true;
                $result["user_data"] = [
                    "id" => $passwordResult["data"]["id"],
                    "email" => $passwordResult["data"]["email"],
                    "firstName" => $passwordResult["data"]["firstName"],
                    "password" => $recoverPassword
                ];
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide an email address to continue.";
        }

        return $result;
    }

    public function register($request) {
        $result = [];

        $formData = $request->getParsedBody();
        $error = "";

        if (array_key_exists("email", $formData)) {
            if (array_key_exists("hash", $formData)) {
                if (array_key_exists("verifyPassword", $formData)) {
                    if (array_key_exists("firstName", $formData)) {
                        $registerUser = $this->LoudService->register($formData);

                        if (array_key_exists("error", $registerUser)) {
                            $result["error"] = true;
                            $result["message"] = $registerUser["message"];
                        } else {
                            $result["success"] = true;
                            $result["message"] = $registerUser["message"];

                            $user = [
                                "email" => $formData["email"],
                                "firstName" => $formData["firstName"],
                                "password" => $formData["hash"]
                            ];

                            $result["data"] = $user;
                        }
                    } else {
                        $error = "Your first name is required.";
                        $result["error"] = true;
                        $result["message"] = $error;
                    }
                } else {
                    $error = "Verify password is required.";
                    $result["error"] = true;
                    $result["message"] = $error;
                }
            } else {
                $error = "Password is required.";
                $result["error"] = true;
                $result["message"] = $error;
            }
        } else {
            $error = "E-mail address is required.";
            $result["error"] = true;
            $result["message"] = $error;
        }

        return $result;
    }

    public function getCollection ($request) {
        $result = [];

        $collectionName = $request->getAttribute("collectionName", null);

        if (isset($collectionName)) {
            $getCollectionResult = $this->LoudService->getCollection($collectionName);

            if (array_key_exists("error", $getCollectionResult)) {
                $result["error"] = true;
                $result["message"] = $getCollectionResult["message"];
            } else {
                $result["success"] = true;
                $result["data"] = $getCollectionResult["data"];
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name of the collection to get.";
        }

        return $result;
    }

    public function deleteItem ($request) {
        $result = [];

        $formData = $request->getParsedBody();
        $collectionName = null;
        $itemId = null;

        if (array_key_exists("collectionName", $formData)) {
            $collectionName = $formData["collectionName"];
        }

        if (array_key_exists("itemId", $formData)) {
            $itemId = $formData["itemId"];
        }

        if (isset($collectionName, $itemId)) {
            $getDeleteResult = $this->LoudService->deleteItem($collectionName, $itemId);

            if (array_key_exists("error", $getDeleteResult)) {
                $result["error"] = true;
                $result["message"] = $getDeleteResult["message"];
            } else {
                $result["success"] = true;
                $result["message"] = $getDeleteResult["message"];
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name and the itemId to continue.";
        }

        return $result;
    }

    public function addItem ($request) {
        $result = [];

        $itemName = $request->getAttribute("itemName", null);
        $formData = $request->getParsedBody();

        if (isset($itemName)) {
            $getAddResult = $this->LoudService->addItem($itemName, $formData);

            if (array_key_exists("error", $getAddResult)) {
                $result["error"] = true;
                $result["message"] = $getAddResult["message"];
            } else {
                $result["success"] = true;
                $result["message"] = $getAddResult["message"];
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name and the item you want to add.";
        }

        return $result;
    }

    public function getItem ($request) {
        $result = [];

        $itemName = $request->getAttribute("itemName", null);
        $id = $request->getAttribute("id", null);
        $key = $request->getAttribute("key", null);

        if (isset($itemName)) {
            if (isset($id)) {
                if (isset($key)) {
                    $getItemResult = $this->LoudService->getItem($itemName, $id, $key);

                    if (array_key_exists("error", $getItemResult)) {
                        $result["error"] = true;
                        $result["message"] = $getItemResult["message"];
                    } else {
                        $result["success"] = true;
                        $result["data"] = $getItemResult["data"];
                    }
                } else {
                    $result["error"] = true;
                    $result["message"] = "Please provide the column name of the item to return.";
                }
            } else {
                $result["error"] = true;
                $result["message"] = "Please provide the id of the item to search.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name of the item to get.";
        }

        return $result;
    }
}