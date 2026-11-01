<?php

/** @var \App\Model\Character $character */
/** @var \App\Service\Router $router */

$title = 'Create Character';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Character</h1>
    <form action="<?= $router->generatePath('character-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="character-create">
    </form>

    <a href="<?= $router->generatePath('character-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
