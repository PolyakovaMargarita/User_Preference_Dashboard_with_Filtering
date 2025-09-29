<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return 'hello';
})->where('any', '.*');
