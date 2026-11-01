<?php

/** @var \App\Model\Character[] $characters */
/** @var \App\Service\Router $router */

$title = 'Character List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Characters List</h1>

    <a href="<?= $router->generatePath('character-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($characters as $character): ?>
            <li><h3><?= $character->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('character-show', ['id' => $character->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('character-edit', ['id' => $character->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
