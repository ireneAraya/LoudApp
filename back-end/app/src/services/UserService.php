<?php

namespace App\Services;

class UserService {

    private $storage;
    private $isDBReady = true;

    public function __construct() {
        if ($this->isDBReady) {
            $this->storage = new StorageService();
        }
    }

    /**
     * Starts a session of the user
     *
     * @param string $email
     * @param string $password
     *
     * @return array
     */
    public function login($email, $password) {
        $result = [];

        if (strlen(trim($email)) > 0) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                if (strlen(trim($password)) > 0) {
                    $query_for_hash = "SELECT id, hash FROM loud_users WHERE email = :email AND active = 1 LIMIT 1";

                    $params_for_hash = [":email" => $email];

                    if ($this->isDBReady) {
                        $result = $this->storage->query($query_for_hash, $params_for_hash, "SELECT");

                        if (count($result['data']) > 0) {
                            $user = $result['data'][0];

                            if (hash_equals($user['hash'], crypt($password, $user['hash']))) {
                                $query = "UPDATE loud_users SET logged = 1 WHERE id = :id";
                                $param = [":id" => $user["id"]];

                                $result = $this->storage->query($query, $param, "UPDATE");

                                if ($result['data'] > 0) {
                                    session_start();
                                    $_SESSION['user_id'] = $user["id"];
                                    $result["success"] = true;
                                    $result["message"] = "Started a session for user #".$user["id"];
                                } else {
                                    $result["error"] = true;
                                    $result["message"] = "User #".$user['id']." is already logged in.";
                                }
                            } else {
                                $result["error"] = true;
                                $result["message"] = "Invalid credentials for the user. Please try again!";
                            }
                        } else {
                            $result["error"] = true;
                            $result["message"] = "The user you enter does not exists. Please try another one or <a href='#/register'>create a new account</a>.";
                        }
                    } else {
                        $result["message"] = "Database has not been setup yet.";
                        $result["error"] = true;
                    }
                } else {
                    $result["message"] = "Password is required.";
                    $result["error"] = true;
                }
            } else {
                $result["message"] = "Email is invalid.";
                $result["error"] = true;
            }
        } else {
            $result["message"] = "Email is required.";
            $result["error"] = true;
        }

        return $result;
    }

    public function verifyUser () {
        $result = [];

        session_start();

        if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
            $result["success"] = true;
            $result["message"] = "The user ".$_SESSION['user_id']." has an active session.";

            $query = "SELECT id, rol, nickname, firstName, middleName, lastName, secondSurname, email, phone, identification, identificationType, locale, birthDate, gender, disability, specialCondition, photoURL, company FROM loud_users WHERE id = :id AND active = 1 LIMIT 1";
            $param = ["id" => intVal($_SESSION['user_id'])];

            $query_result = $this->storage->query($query, $param, "SELECT");
            $user = $query_result['data'][0];

            $result["data"] = [
                "id" => $user["id"],
                "rol" => $user["rol"],
                "nickname" => $user["nickname"],
                "firstName" => $user["firstName"],
                "middleName" => $user["middleName"],
                "lastName" => $user["lastName"],
                "secondSurname" => $user["secondSurname"],
                "email" => $user["email"],
                "phone" => $user["phone"],
                "identification" => $user["identification"],
                "identificationType" => $user["identificationType"],
                "locale" => $user["locale"],
                "birthDate" => $user["birthDate"],
                "gender" => $user["gender"],
                "disability" => $user["disability"],
                "specialCondition" => $user["specialCondition"],
                "photoURL" => $user["photoURL"],
                "company" => $user["company"]
            ];
        } else {
            $result["error"] = true;
            $result["message"] = "Not user logged in!";
        }

        return $result;
    }

    public function logout () {
        $result = [];

        session_start();

        if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
            $query = "UPDATE loud_users SET logged = 0 WHERE id = :id";
            $param = [":id" => intval($_SESSION['user_id'])];

            $result = $this->storage->query($query, $param, "UPDATE");

            if ($result['data'] > 0) {
                $result["success"] = true;
                $result["message"] = "Removed the session for user #".$_SESSION['user_id'];
                unset($_SESSION['user_id']);
                session_destroy();
            } else {
                $result["error"] = true;
                $result["message"] = "User #".$_SESSION['user_id']." is already logged out.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "The is not user logged in.";
        }

        return $result;
    }

    public function changeUserPassword ($email, $password) {
        $result = [];

        if ($email !== "") {
            $email = strtolower($email);
            $email = trim($email);

            $query = "SELECT id, firstName, email FROM loud_users WHERE email = :email AND active = 1 LIMIT 1";

            $param = [":email" => $email];

            $selectUserResult = $this->storage->query($query, $param, "SELECT");

            if (count($selectUserResult['data']) > 0) {
                $cost = 10;
                $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
                $salt = sprintf("$2a$%02d$", $cost) . $salt;
                $hash = crypt($password, $salt);

                $user = $selectUserResult['data'][0];

                $query = "UPDATE loud_users SET hash = :newPassword, logged = 0 WHERE id = :id";
                $param = [
                    ":newPassword" => $hash,
                    ":id" => $user["id"]
                ];

                $changePasswordResult = $this->storage->query($query, $param, "UPDATE");

                if ($changePasswordResult['data'] > 0) {
                    $result["success"] = true;
                    $result["message"] = "The password has been reset for your account. Please check your inbox.";

                    $result["data"] = [
                        "id" => $user["id"],
                        "firstName" => $user["firstName"],
                        "email" => $user["email"]
                    ];
                } else {
                    $result["error"] = true;
                    $result["message"] = "The password has been already changed.";
                }
            } else {
                $result["error"] = true;
                $result["message"] = "We couldn't find an user with the email provided.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide an email address.";
        }

        return $result;
    }

    /**
     * Register an user to the system
     *
     * @param object $formData
     *
     * @return array
     */
    public function register($formData) {
        $result = [];

        $query = "SELECT id FROM loud_users WHERE email = :email AND active = 1 LIMIT 1";
        $param = [":email" => strtolower(trim($formData["email"]))];
        $isExistingUserResult = $this->storage->query($query, $param, "SELECT");

        // Verifies that the email is not already created
        if (count($isExistingUserResult['data']) > 0) {
            $result["error"] = true;
            $result["message"] = "The user already exists. Please try another email.";
        } else {
            $required_fields = ["firstName", "lastName", "email", "hash", "birthDate", "phone", "identification"];
            $errors = [];

            // Validate some required fields
            foreach ($formData as $key => $value) {
                if (array_key_exists($key, $required_fields)) {
                    if (empty($value)) {
                        array_push($errors, "The field ".$key." is required.");
                    }
                }
            }

            if (count($errors) > 0) {
                $result["error"] = true;
                $result["message"] = "There are some fields missing, please check and try again.";
            } else {
                // Validates the email is a valid address
                if (filter_var($formData["email"], FILTER_VALIDATE_EMAIL)) {
                    // Validates that the password has more than 8 characters long
                    if (strlen(trim($formData["hash"])) >= 8) {
                        // Validates that the password and the verify password are the same
                        if ($formData["verifyPassword"] === $formData["hash"]) {
                            // Only accepts 2 digits, followed by a dash (-) and two digits more
                            if (preg_match("/^\d{4}(-\d{4})?$/", $formData["phone"])) {
                                // Split and create the date to match the DB column type
                                $date = $formData["birthDate"];
                                $date = explode("/", $date);
                                $day = $date[0];
                                $month = $date[1];
                                $year = $date[2];
                                $date = $year."-".$month."-".$day;

                                // Hash the password to store it on the DB
                                $cost = 10;
                                $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
                                $salt = sprintf("$2a$%02d$", $cost) . $salt;
                                $hash = crypt($formData["hash"], $salt);

                                // Saves the Profile IMG
                                $photoURLPath = "";
                                if ($formData['photoURL'] != "front-end/img/users/profilePlaceholder.png") {
                                    $filename_path = md5(time().uniqid()).".jpg";
                                    $image = explode('base64,', $formData['photoURL']);
                                    $decoded = base64_decode($image[1]);
                                    file_put_contents(str_replace("UserService.php", "", __FILE__)."../../../../front-end/img/users/". $filename_path, $decoded);

                                    $photoURLPath = "/front-end/img/users/" . $filename_path;
                                } else {
                                    $photoURLPath = "/front-end/img/users/profilePlaceholder.png";
                                }

                                if (isset($formData["disability"])) {
                                    $disability = $formData["disability"];
                                } else {
                                    $disability = "NULL";
                                }

                                if (isset($formData["specialCondition"])) {
                                    $specialCondition = $formData["specialCondition"];
                                } else {
                                    $specialCondition = "NULL";
                                }

                                if (isset($formData["nickname"])) {
                                    $nickname = $formData["nickname"];
                                } else {
                                    $nickname = "NULL";
                                }

                                if (isset($formData["middleName"])) {
                                    $middleName = $formData["middleName"];
                                } else {
                                    $middleName = "NULL";
                                }

                                if (isset($formData["secondSurname"])) {
                                    $secondSurname = $formData["secondSurname"];
                                } else {
                                    $secondSurname = "NULL";
                                }

                                if (isset($formData["locale"])) {
                                    $locale = $formData["locale"];
                                } else {
                                    $locale = "EN";
                                }

                                $query = "INSERT INTO loud_users (rol, nickname, firstName, middleName, lastName, secondSurname, email, phone, hash, identification, identificationType, locale, birthDate, gender, disability, specialCondition, photoURL, active, logged, verified) VALUES (2, :nickname, :firstName, :middleName, :lastName, :secondSurname, :email, :phone, :hash, :identification, :identificationType, :locale, :birthDate, :gender, :disability, :specialCondition, :photoURL, 1, 0, 1)";
                                $params = [
                                    ":nickname" => $nickname,
                                    ":firstName" => $formData["firstName"],
                                    ":middleName" => $middleName,
                                    ":lastName" => $formData["lastName"],
                                    ":secondSurname" => $secondSurname,
                                    ":email" => strtolower($formData["email"]),
                                    ":phone" => $formData["phone"],
                                    ":hash" => $hash,
                                    ":identification" => $formData["identification"],
                                    ":identificationType" => $formData["identificationType"],
                                    ":locale" => $locale,
                                    ":birthDate" => $date,
                                    ":gender" => $formData["gender"],
                                    ":disability" => $disability,
                                    ":specialCondition" => $specialCondition,
                                    ":photoURL" => $photoURLPath
                                ];

                                $createUserResult = $this->storage->query($query, $params, "INSERT");

                                if ($createUserResult['data'] > 0) {
                                    $result["success"] = true;
                                    $result["message"] = "We have created your account. We will send you an email to verify your account.";
                                } else {
                                    $result["error"] = true;
                                    $result["message"] = $createUserResult;
                                }

                            } else {
                                $result["error"] = true;
                                $result["message"] = "The phone number must have the following format: NNNN-NNNN.";
                            }
                        } else {
                            $result["error"] = true;
                            $result["message"] = "The passwords do not match.";
                        }
                    } else {
                        $result["error"] = true;
                        $result["message"] = "The password must be 8 characters long, combining specials characters and numbers.";
                    }
                } else {
                    $result["error"] = true;
                    $result["message"] = "You have enter an invalid email address.";
                }
            }
        }

        return $result;
    }

    public function getCollection ($collectionName) {
        $result = [];

        if ($collectionName != "") {
            // $allow_objects = ["events","orders","reservations"];


            if ($collectionName === "price_places" OR $collectionName === "events" OR $collectionName === "users" OR $collectionName === "orders" OR $collectionName === "reservations" OR $collectionName === "locations" OR $collectionName === "eventTypes") {
                // $collectionName = strtolower($collectionName);

                $query = "SELECT * FROM loud_$collectionName WHERE active = 1";

                $query_result = $this->storage->query($query, [], "SELECT");

                if (count($query_result['data']) > 0) {
                    $result["success"] = true;
                    $result["data"] = $query_result['data'];
                } else {
                    $result["error"] = true;
                    $result["message"] = "The object you are requesting is empty.";
                }
            } else {
                $result["error"] = true;
                $result["message"] = "The action you want to perform is not allowed.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name of the collection to get.";
        }

        return $result;
    }

    public function deleteItem ($collectionName, $itemId) {
        $result = [];

        if ($collectionName != "") {
            if ($itemId != "") {
                if ($collectionName === "events" OR $collectionName === "locations" OR $collectionName === "users") {
                    $collectionName = strtolower($collectionName);

                    $query = "UPDATE loud_$collectionName set active = 0 WHERE id = :id";

                    $param = [":id" => intval($itemId)];

                    $query_result = $this->storage->query($query, $param, "UPDATE");

                    if (count($query_result['data']) > 0) {
                        $result["success"] = true;
                        $result["message"] = "The item id #$itemId from Collection: ".strtoupper($collectionName)." has been successfully removed";
                    } else {
                        $result["error"] = true;
                        $result["message"] = "The item has been already removed.";
                    }

                } else {
                    $result["error"] = true;
                    $result["message"] = "The action you want to perform is not allowed.";
                }
            } else {
                $result["error"] = true;
                $result["message"] = "Please provide the id of the item from the collection.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name of the collection to get.";
        }

        return $result;
    }

    public function addItem ($itemName = "locations", $formData) {
        $result = [];

        if ($itemName != "") {
            if ($itemName === "locations") {

                // Saves the Profile IMG
                $photoURLPath = "";
                if ($formData['image'] != "front-end/img/photo.png") {
                    $filename_path = md5(time().uniqid()).".jpg";
                    $image = explode('base64,', $formData['image']);
                    $decoded = base64_decode($image[1]);
                    file_put_contents(str_replace("UserService.php", "", __FILE__)."../../../../front-end/img/". $filename_path, $decoded);

                    $photoURLPath = "/front-end/img/" . $filename_path;
                } else {
                    $photoURLPath = "/front-end/img/photo.png";
                }

                $query = "INSERT INTO loud_locations (name, capacity, contactName, contactPhone, address, geolocation, image, active) VALUES (:name, :capacity, :contactName, :contactPhone, :address, :geolocation, :image, 1)";

                $param = [
                    ":name" => $formData["name"],
                    ":capacity" => intval($formData["capacity"]),
                    ":contactName" => $formData["contactName"],
                    ":contactPhone" => $formData["contactPhone"],
                    ":address" => $formData["address"],
                    ":geolocation" => $formData["geolocation"],
                    ":image" => $photoURLPath
                ];

                $query_result = $this->storage->query($query, $param, "INSERT");

                if (count($query_result['data']) > 0) {
                    $result["success"] = true;
                    $result["message"] = "The item has been successfully created.";
                } else {
                    $result["error"] = true;
                    $result["message"] = "The item has been already removed.";
                }

            } else {
                $result["error"] = true;
                $result["message"] = "The action you want to perform is not allowed.";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "Please provide the name of the collection to get.";
        }

        return $result;
    }

    public function getItem ($itemName = "", $id = "", $key = "") {
        $result = [];

        if ($itemName != "") {
            if ($id != "") {
                if ($key != "") {
                    if ($itemName === "events" OR $itemName === "users" OR $itemName === "orders" OR $itemName === "reservations" OR $itemName === "eventTypes" OR $itemName === "locations") {
                        $itemName = strtolower($itemName);

                        $query = "SELECT $key FROM loud_$itemName WHERE id = :id LIMIT 1";
                        $params = [
                            ":id"  => intval($id)
                        ];

                        $query_result = $this->storage->query($query, $params, "SELECT");

                        if (count($query_result['data']) > 0) {
                            $result["success"] = true;
                            $result["data"] = $query_result['data'][0][$key];
                        } else {
                            $result["error"] = true;
                            $result["message"] = "We couldn't find the item you are looking for.";
                        }

                    } else {
                        $result["error"] = true;
                        $result["message"] = "The action you want to perform is not allowed.";
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
