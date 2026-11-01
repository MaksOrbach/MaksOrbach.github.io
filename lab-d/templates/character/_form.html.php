<?php
    /** @var $character ?\App\Model\Character */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="character[name]" value="<?= $character ? $character->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="race">Race</label>
    <input type="text" id="race" name="character[race]" value="<?= $character ? $character->getRace() : '' ?>">
</div>

<div class="form-group">
    <label for="weapon">Weapon</label>
    <input type="text" id="weapon" name="character[weapon]" value="<?= $character ? $character->getWeapon() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
