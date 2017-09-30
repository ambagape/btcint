<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
        
        'blockchain' => [
            url => 'localhost:3000',
            guid => '74c37cc8-2916-4a56-87a6-c40b4804e4fb',
            apiKey => 'e025fb56-33da-4cc6-a07f-a970cabfb36c',
            password => "t1e2m1p9o"
        ],
    ],
];
