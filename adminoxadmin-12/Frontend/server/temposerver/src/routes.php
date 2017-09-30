<?php
// Routes

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/getAddress', function ($request, $response, $args) {
    $loggerSettings = $this->get('settings')['logger'];

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
