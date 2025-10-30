<?php
/*
Plugin Name: Image Hotspots Block
Description: A custom Gutenberg block for image hotspots.
Version: 1.0.0
Author: Your Name
*/

function image_hotspots_block_init() {
    // Register the block editor script.
    wp_register_script(
        'image-hotspots-block-editor',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );

    // Register the block styles for the editor.
    wp_register_style(
        'image-hotspots-block-editor',
        plugins_url( 'build/index.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
    );

    // Register the frontend style.
    wp_register_style(
        'image-hotspots-block-style',
        plugins_url( 'build/style-index.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
    );

    register_block_type( __DIR__, array(
        'editor_script' => 'image-hotspots-block-editor',
        'editor_style'  => 'image-hotspots-block-editor',
        'style'         => 'image-hotspots-block-style',
    ) );
}
add_action( 'init', 'image_hotspots_block_init' );
