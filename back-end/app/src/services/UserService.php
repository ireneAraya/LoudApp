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
                    $query_for_hash = "SELECT hash FROM loud_users WHERE email = :email LIMIT 1";

                    $params_for_hash = [":email" => $email];

                    if ($this->isDBReady) {
                        $result = $this->storage->query($query_for_hash, $params_for_hash);

                        if (count($result['data']) > 0) {
                            $user = $result['data'][0];

                            if (hash_equals($user['hash'], crypt($password, $user['hash']))) {
                                session_start();
                                $_SESSION['user'] = true;
                                $result["success"] = true;
                                $result["message"] = "User found!";
                            } else {
                                $result["error"] = true;
                                $result["message"] = "Invalid credentials for the user. Please try again!";
                            }
                        } else {
                            $result["error"] = true;
                            $result["message"] = "The user you typed does not exists. Please try another one or <a href='#/register'>create a new account</a>.";
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
        $result = false;

        if (!session_status() == PHP_SESSION_NONE)  {
            $result = true;
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

                            // $result["message"] = $result;
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
