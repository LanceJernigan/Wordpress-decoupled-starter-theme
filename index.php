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

Enqueues\App::addMount('app', PATH . '/dist/scripts/app.js');
Enqueues\App::localize('navigation', wp_get_nav_menu_items('header'));

get_footer();
