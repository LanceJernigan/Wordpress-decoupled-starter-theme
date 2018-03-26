<?php

namespace Decouple\Enqueues;

use const Decouple\URI;

class App
{

    private static $instance;

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public static function init()
    {
        $class = new self;
        add_action('wp_enqueue_scripts', [$class, 'register']);
    }

    public function register()
    {
        $js_locator = '/dist/scripts/index.js';
        wp_enqueue_script(
            'App',
            URI . $js_locator,
            false,
            $js_locator,
            true
        );
    }
}