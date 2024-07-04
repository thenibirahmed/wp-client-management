<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nibir</title>

    <?php wp_head() ?>
</head>
<body <?php body_class() ?>>
    <div id="wp-client-management-root"></div>

    <?php 
        // usage of the model
        // use WpClientManagement\Models\Post;

        // $posts = Post::all();

        // // echo '<pre>';
        // print_r($posts[0]);
        // die();
    ?>

    <?php wp_footer() ?>
</body>
</html>