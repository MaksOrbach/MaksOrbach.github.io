<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Character;
use App\Service\Router;
use App\Service\Templating;

class CharacterController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $characters = Character::findAll();
        $html = $templating->render('character/index.html.php', [
            'characters' => $characters,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestCharacter, Templating $templating, Router $router): ?string
    {
        if ($requestCharacter) {
            $character = Character::fromArray($requestCharacter);
            // @todo missing validation
            $character->save();

            $path = $router->generatePath('character-index');
            $router->redirect($path);
            return null;
        } else {
            $character = new Character();
        }

        $html = $templating->render('character/create.html.php', [
            'character' => $character,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $characterId, ?array $requestCharacter, Templating $templating, Router $router): ?string
    {
        $character = Character::find($characterId);
        if (! $character) {
            throw new NotFoundException("Missing character with id $characterId");
        }

        if ($requestCharacter) {
            $character->fill($requestCharacter);
            // @todo missing validation
            $character->save();

            $path = $router->generatePath('character-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('character/edit.html.php', [
            'character' => $character,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $characterId, Templating $templating, Router $router): ?string
    {
        $character = Character::find($characterId);
        if (! $character) {
            throw new NotFoundException("Missing character with id $characterId");
        }

        $html = $templating->render('character/show.html.php', [
            'character' => $character,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $characterId, Router $router): ?string
    {
        $character = Character::find($characterId);
        if (! $character) {
            throw new NotFoundException("Missing character with id $characterId");
        }

        $character->delete();
        $path = $router->generatePath('character-index');
        $router->redirect($path);
        return null;
    }
}

















