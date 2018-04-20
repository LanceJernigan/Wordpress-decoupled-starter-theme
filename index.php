<?php
/**
 * Generic Page
 *
 * @author Lance Jernigan
 * @package decouple
 */

namespace Decouple;

use const Decouple\PATH;

get_header();

Enqueues\App::addMount('test', PATH . '/dist/scripts/index.js');
Enqueues\App::localize('test', [
    'lorem' => 'ipsum',
]);

get_footer();
