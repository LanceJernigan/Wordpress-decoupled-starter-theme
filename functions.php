<?php

namespace Decouple;

define(__NAMESPACE__ . '\PATH', get_template_directory(__FILE__));
define(__NAMESPACE__ . '\URI', get_template_directory_uri(__FILE__));

require_once 'lib/autoload.php';

add_action('after_setup_theme', function () {
    Enqueues\App::init();
});
