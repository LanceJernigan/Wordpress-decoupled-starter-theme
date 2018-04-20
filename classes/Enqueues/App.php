<?php

namespace Decouple\Enqueues;

use const Decouple\URI;
use const Decouple\PATH;

class App
{

    private static $mounts = [];

    public static function init()
    {
        $class = new self;
        add_action('wp_enqueue_scripts', [$class, 'register']);
        add_action('wp_print_footer_scripts', [$class, '_localize'], 0);
    }

    public static function addMount($key, $entry)
    {
        if (!$entry) {
            $entry = PATH . '/dist/scripts/' . $key . '.min.js';
        }

        if (!file_exists($entry)) {
            $entry = str_replace('.min', '', $entry);

            $entry = file_exists($entry)
                ? $entry
                : false;
        }

        if ($entry) {
            self::$mounts[$key] = [
                "render" => $entry,
            ];
        }
    }

    public function register()
    {
        $js_locator = '/dist/scripts/index.js';
        wp_register_script(
            'App',
            URI . $js_locator,
            false,
            $js_locator,
            true
        );
        wp_enqueue_script(
            'App'
        );
    }

    public static function localize($key, $newData)
    {
        $mount = array_key_exists($key, self::$mounts)
            ? self::$mounts[$key]
            : [];

        if ($newData) {
            $currentData = array_key_exists('data', $mount)
                ? $mount['data']
                : [];
            $mountData   = array_merge(
                $currentData,
                $newData
            );

            $mount['data'] = $mountData;
        }

        self::$mounts[ $key ] = $mount;
    }

    public function _localize()
    {
        wp_localize_script(
            'App',
            'app',
            self::getLocalizedState()
        );
    }

    private function getLocalizedState()
    {
        $mergedState = array_reduce(
            array_keys(self::$mounts),
            function ($stateHold, $key) {
                $mount           = self::$mounts[$key];
                $state           = array_key_exists('data', $mount)
                    ? $mount['data']
                    : [];
                $stateHold[$key] = $state;

                return $stateHold;
            },
            []
        );

        return $mergedState;
    }
}