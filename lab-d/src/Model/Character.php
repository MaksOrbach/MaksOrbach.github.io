<?php
namespace App\Model;

use App\Service\Config;

class Character
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $race = null;
    private ?string $weapon = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Character
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Character
    {
        $this->name = $name;

        return $this;
    }

    public function getRace(): ?string
    {
        return $this->race;
    }

    public function setRace(?string $race): Character
    {
        $this->race = $race;

        return $this;
    }

    public function getWeapon(): ?string
    {
        return $this->weapon;
    }

    public function setWeapon(?string $weapon): Character
    {
        $this->weapon = $weapon;

        return $this;
    }

    public static function fromArray($array): Character
    {
        $character = new self();
        $character->fill($array);

        return $character;
    }

    public function fill($array): Character
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['race'])) {
            $this->setRace($array['race']);
        }
        if (isset($array['weapon'])) {
            $this->setWeapon($array['weapon']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM character';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $characters = [];
        $charactersArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($charactersArray as $characterArray) {
            $characters[] = self::fromArray($characterArray);
        }

        return $characters;
    }

    public static function find($id): ?Character
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM character WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $characterArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $characterArray) {
            return null;
        }
        $character = Character::fromArray($characterArray);

        return $character;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO character (name, race, weapon) VALUES (:name, :race, :weapon)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'race' => $this->getRace(),
                'weapon' => $this->getWeapon(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE character SET name = :name, race = :race, weapon = :weapon WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':race' => $this->getRace(),
                ':weapon' => $this->getWeapon(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM character WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setName(null);
        $this->setRace(null);
        $this->setWeapon(null);
    }
}
