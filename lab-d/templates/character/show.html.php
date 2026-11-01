<?php

/** @var \App\Model\Character $character */
/** @var \App\Service\Router $router */

$title = "{$character->getName()} ({$character->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $character->getName() ?></h1>
    <article>
        <p><strong>Race:</strong> <?= $character->getRace() ?></p>
        <p><strong>Weapon:</strong> <?= $character->getWeapon() ?></p>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('character-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('character-edit', ['id'=> $character->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
