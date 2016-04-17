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
                    $query_for_hash = "SELECT id, hash FROM loud_users WHERE email = :email LIMIT 1";

                    $params_for_hash = [":email" => $email];

                    if ($this->isDBReady) {
                        $result = $this->storage->query($query_for_hash, $params_for_hash, "SELECT");

                        if (count($result['data']) > 0) {
                            $user = $result['data'][0];

                            if (hash_equals($user['hash'], crypt($password, $user['hash']))) {
                                $query = "UPDATE loud_users SET active = 1 WHERE id = :id";
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

            $query = "SELECT id, rol, firstName, middleName, lastName, secondSurname, email, phone, identification, identificationType, locale, birthDate, gender, disability, specialCondition, photoURL, company FROM loud_users WHERE id = :id LIMIT 1";
            $param = ["id" => intVal($_SESSION['user_id'])];

            $query_result = $this->storage->query($query, $param, "SELECT");
            $user = $query_result['data'][0];

            $result["data"] = [
                "id" => $user["id"],
                "rol" => $user["rol"],
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
            $query = "UPDATE loud_users SET active = 0 WHERE id = :id";
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

        $cost = 10;
        $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
        $salt = sprintf("$2a$%02d$", $cost) . $salt;
        $hash = crypt($password, $salt);

        if ($email !== "") {
            $email = strtolower($email);
            $email = trim($email);

            $query = "SELECT id, firstName, email FROM loud_users WHERE email = :email LIMIT 1";

            $param = [":email" => $email];

            $selectUserResult = $this->storage->query($query, $param, "SELECT");

            if (count($selectUserResult['data']) > 0) {
                $user = $selectUserResult['data'][0];

                $query = "UPDATE loud_users SET hash = :newPassword, active = 0 WHERE id = :id";
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
     * Registra un nuevo usuario en el sistema.
     *
     * @param string $email
     * @param string $password
     * @param string $passwordConfirm
     * @param string $fullName
     *
     * @return array
     */
    public function register($email, $password, $passwordConfirm, $fullName) {
        $result = [];

        if (strlen(trim($email)) > 0) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                if (strlen(trim($password)) > 0) {
                    if ($passwordConfirm === $password) {
                        $user_flag = false;

                        $query = "SELECT id FROM usuarios WHERE email = :email LIMIT 1";
                        $params = [":email" => $email];
                        $result = $this->storage->query($query, $params);

                        if (count($result['data']) > 0) {
                            $user_flag = true;
                            $result["message"] = "User is already registred.";
                            $result["error"] = true;
                        }

                        if (!$user_flag) {
                            $query = "INSERT INTO usuarios (email, password, full_name) VALUES(:email, :password, :full_name)";
                            $params = [":email" => $email, ":password" => $password, ":full_name" => $fullName];
                            $result = $this->storage->query($query, $params);
                            $result["message"] = "The user has been created successfully!";
                        }
                    } else {
                        $result["message"] = "Passwords do not match.";
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

}
