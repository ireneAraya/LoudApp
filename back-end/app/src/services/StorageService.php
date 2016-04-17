<?php

namespace App\Services;

use \PDO;
use \PDOException;

class StorageService {

    private $pdo;

    public function __construct() {
        $config = [
            'db_host' => '127.0.0.1',
            'db_name' => 'LoudApp_MasterDB',
            'db_user' => 'localdev',
            'db_pass' => '511382'
        ];

        $this->pdo = new PDO(
            "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8",
            $config['db_user'], $config['db_pass']
        );

        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Ejecuta una sentencia de SQL.
     *
     * @param string $query
     * @param array $params
     *
     * @return array
     */
    public function query($query, $params=[], $type ="SELECT") {
        $result = [
            'data' => null
        ];

        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);

            if ($type === "SELECT") {
                while ($content = $stmt->fetch()) {
                    $result['data'][] = $content;
                }
            } else {
                $result['data'] = $stmt->rowCount();
            }
        } catch (PDOException $e) {
            $result['error'] = true;
            $result['message'] = $e->getMessage();
        }

        return $result;
    }
}