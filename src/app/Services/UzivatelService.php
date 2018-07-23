<?php
namespace App\Services;

use App\Services\AService;
use App\Models\Uzivatel;
use PDO;
/**
 * UzivatelService - servisni objekt dodavajici 
 * data z databaze kontroleru pomoci DTO
 * @author Jan Špecián
 */
class UzivatelService extends AService {

    public function getAllUzivatel() {
        $sql = "
        SELECT * 
        FROM Uzivatel";
        $stmt = $this->container->db->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll();

        $uzivatele = [];
        foreach ($results as $obj) {
            $u = $this->assemblyDTO(($this->getUserById($obj['idUzivatel'])));
            $uzivatele[] = $u;
        }
        return $uzivatele;
    }

    public function getUzivatelDetailById($id) {
        $sql = "        
            SELECT * 
            FROM Uzivatel
            WHERE Uzivatel.idUzivatel = ?";
        $stmt = $this->container->db->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetch();
        $role = $this->container->RoleUzivateleService->getRoleUzivateleById($result['idRoleUzivatele']);
        $u = $this->getUserById($result['idUzivatel']);
        return $this->assemblyDTO($u);
    }

    public function saveNewUzivatel($body) {
        $u = $this->assemblyDTO($body);
        if ($u == null) {
            return null;
        }
        //vlozeni do databaze
        $sql = 'INSERT INTO Uzivatel VALUES '
                . '(NULL, ?, ?, \'Adresa\', NOW(), 999999, ?, ?, NULL, NULL, NULL)';
        $stmt = $this->container->db->prepare($sql);
        $nick = $u->getNickName();
        $cele = $u->getCeleJmeno();
        $role_id = $u->getRole()->getId();
        $login = $u->getLogin();
        try {
            $stmt->bindParam(1, $nick, PDO::PARAM_STR);
            $stmt->bindParam(2, $cele, PDO::PARAM_STR);
            $stmt->bindParam(3, $role_id, PDO::PARAM_INT);
            $stmt->bindParam(4, $login, PDO::PARAM_STR);
            $stmt->execute();
            //assembly output DTO from db - now has id
            $user_complete = $this->getUserByLogin($login);
            //$user_complete ma vsecky pole, 
            //my osadime DTO, 
            //abychom zverejnili jen to co chceme
            $u = $this->assemblyDTO($user_complete);
            return $u;
        } catch (PDOException $e) {
            //neulozeny uzivatel 
            return null;
        }
    }

    public function updateUzivatel($body, $id) {
        if ($id == null) {
            return null;
        }
        //update for each key
        foreach ($body as $key => $val) {
            try {
                $sql = 'UPDATE Uzivatel SET ' . $key . '=? WHERE idUzivatel = ?';
                $stmt = $this->container->db->prepare($sql);
                $stmt->bindParam(1, $val, PDO::PARAM_STR);
                $stmt->bindParam(2, $id, PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }
        }
        return $this->assemblyDTO(($this->getUserById($id)));
    }

    public function deleteUzivatel($id) {
        $user_complete = $this->getUserById($id);
        if ($user_complete == null) {
            return null;
        }
        $sql = 'DELETE FROM Uzivatel WHERE idUzivatel = ?';
        $id_int = intval($id);
        $stmt = $this->container->db->prepare($sql);
        try {
            $stmt->bindParam(1, $id_int, PDO::PARAM_INT);
            $stmt->execute();
        } catch (PDOException $e) {
            return null;
        }
        return $this->assemblyDTO($user_complete);
    }

    /** Login je take unikatni ukazatel na radek v tabulce Uzivatele
     * 
     * @param type $login
     * @return type Uzivatel - DTO
     */
    protected function getUserByLogin($login) {
        if ($login == null || $login == "") {
            return null;
        }
        $sql = "SELECT * FROM Uzivatel WHERE Uzivatel.login=?";
        $stmt = $this->container->db->prepare($sql);
        $stmt->bindParam(1, $login, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result;
    }

    protected function getUserById($id) {
        if ($id == null || $id == "") {
            return null;
        }
        $id_int = intval($id);
        $sql = "SELECT * FROM Uzivatel WHERE Uzivatel.idUzivatel=?";
        $stmt = $this->container->db->prepare($sql);
        $stmt->bindParam(1, $id_int, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result;
    }

    /** Funkce pro osazeni modelu validovanymi parametry
     * 
     * @param type $body - repsponsed body of post from controller
     * @return Uzivatel - DTO
     */
    protected function assemblyDTO($body) {
        if ($body == null) {
            return null;
        }
        if ($body['nickName'] != null || $body['nickName'] == "") {
            $nickName = $body['nickName'];
        } else {
            return null;
        }
        if ($body['celeJmeno'] != null || $body['celeJmeno'] == "") {
            $celeJmeno = $body['celeJmeno'];
        } else {
            return null;
        }
        if ($body['idRoleUzivatele'] != null) {
            $idRoleUzivatele = $body['idRoleUzivatele'];
        } else {
            $idRoleUzivatele = 2; //default 2 = ridic role
        }
        if ($body['login'] != null || $body['login'] == "") {
            $login = $body['login'];
        } else {
            $login = "unsetted yet";
        }
        /* z controlleru neprichazi ID, ale vnitrne v service objektu muze byt,
         *  priklad - saveNewUzivatel */
        $id = null;
        if (isset($body['idUzivatel'])) {
            if ($body['idUzivatel'] != null || $body['idUzivatel'] == "") {
                $id = $body['idUzivatel'];
            }
        }
        $role = $this->container->RoleUzivateleService->getRoleUzivateleById($idRoleUzivatele);
        return new Uzivatel($nickName, $login, $celeJmeno, $role, $id);   //null - databaze resi id autoinkrementem
    }

}
