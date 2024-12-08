<?php

namespace WpClientManagement\Admin;

use WpClientManagement\Seeders\DatabaseSeeder;

/**
 * Admin Installer Class
 */
class Installer {

    /**
     * Add versioning
     *
     * @return void
     */
    public function add_version() {
        update_option( 'wp_client_management_version', WP_CLIENT_MANAGEMENT_VERSION );

        $installed = get_option( 'wp_client_management_installed' );

        if ( ! $installed ) {
            update_option( 'wp_client_management_installed', time() );
        }

    }


    /**
     * Seed table
     * @return void
     */
    public function seed_tables() {
        $seeder = new DatabaseSeeder();
        $seeder->run();
    }

    /**
     * Create Database tables when activating the plugin
     *
     * @return void
     */
    public function create_tables() {
        global $wpdb;

        $collate = $wpdb->get_charset_collate();

        $schema = [];

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_eic_crm_users` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `wp_user_id` bigint NOT NULL,
                        `phone` varchar(255) DEFAULT NULL,
                        `address` text COLLATE utf8mb4_unicode_ci,
                        `city` varchar(255) DEFAULT NULL,
                        `state` varchar(255) DEFAULT NULL,
                        `zip` varchar(255) DEFAULT NULL,
                        `country` varchar(255) DEFAULT NULL,
                        `role_id` bigint UNSIGNED NOT NULL,
                        `designation` varchar(255) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_clients` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `eic_crm_user_id` bigint UNSIGNED NOT NULL,
                        `organization` varchar(255) DEFAULT NULL,
                        `status` varchar(255) NOT NULL DEFAULT 'unknown',
                        `image_url` varchar(255) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_currencies` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `symbol` varchar(255) NOT NULL,
                        `code` varchar(255) NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_deal_pipelines` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_roles` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_emails` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `project_id` bigint UNSIGNED DEFAULT NULL,
                        `client_id` bigint UNSIGNED DEFAULT NULL,
                        `subject` text COLLATE utf8mb4_unicode_ci,
                        `body` text NOT NULL,
                        `scheduled_at` date DEFAULT NULL,
                        `sent` tinyint(1) NOT NULL DEFAULT '0',
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_files` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `project_id` bigint UNSIGNED DEFAULT NULL,
                        `client_id` bigint UNSIGNED DEFAULT NULL,
                        `title` varchar(255) NOT NULL,
                        `url` varchar(255) NOT NULL,
                        `type` varchar(255) NOT NULL,
                        `image_url` varchar(255) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_invoices` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `project_id` bigint UNSIGNED DEFAULT NULL,
                        `client_id` bigint UNSIGNED DEFAULT NULL,
                        `code` int NOT NULL,
                        `type` varchar(255) NULL,
                        `title` varchar(255) NOT NULL,
                        `date` date NOT NULL,
                        `due_date` date DEFAULT NULL,
                        `items` json DEFAULT NULL,
                        `note` text COLLATE utf8mb4_unicode_ci,
                        `bill_to_id` bigint UNSIGNED DEFAULT NULL,
                        `billing_address` text COLLATE utf8mb4_unicode_ci NULL,
                        `billing_phone_number` VARCHAR(255) NOT NULL,
                        `billing_email` VARCHAR(255) NOT NULL,
                        `bill_from_id` bigint UNSIGNED DEFAULT NULL,
                        `bill_from_address` text COLLATE utf8mb4_unicode_ci,
                        `bill_from_phone_number` VARCHAR(255) NOT NULL,
                        `bill_from_email` VARCHAR(255) NOT NULL,
                        `payment_method_id` bigint UNSIGNED DEFAULT NULL,
                        `currency_id` bigint UNSIGNED DEFAULT NULL,
                        `status_id` bigint UNSIGNED DEFAULT NULL,
                        `sub_total` decimal(8,2) NOT NULL,
                        `total` decimal(8,2) NOT NULL,
                        `discount` decimal(8,2) DEFAULT NULL,
                        `tax` decimal(8,2) DEFAULT NULL,
                        `fee` decimal(8,2) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_invoice_items` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `invoice_id` bigint UNSIGNED DEFAULT NULL,
                        `details` text COLLATE utf8mb4_unicode_ci,
                        `quantity` int DEFAULT 1,
                        `unit_price` decimal(10,2) NOT NULL,
                        `discount_type` varchar(20) NULL,
                        `discount_value` decimal(10,2) NULL,
                        `tax_type` varchar(20) NULL,
                        `tax_value` decimal(10,2) NULL,
                        `line_total` decimal(10,2) DEFAULT 0.00,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";


        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_notes` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `project_id` bigint UNSIGNED DEFAULT NULL,
                        `client_id` bigint UNSIGNED DEFAULT NULL,
                        `note` text NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_priorities` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `type` varchar(255) NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_projects` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `client_id` bigint UNSIGNED DEFAULT NULL,
                        `manager_id` bigint UNSIGNED DEFAULT NULL,
                        `deal_pipeline_id` bigint UNSIGNED DEFAULT NULL,
                        `status_id` bigint UNSIGNED DEFAULT NULL,
                        `priority_id` bigint UNSIGNED DEFAULT NULL,
                        `title` varchar(255) NOT NULL,
                        `budget` decimal(8,2) NOT NULL DEFAULT '0.00',
                        `currency_id` bigint UNSIGNED DEFAULT NULL,
                        `start_date` datetime DEFAULT NULL,
                        `due_date` datetime DEFAULT NULL,
                        `description` varchar(255) DEFAULT NULL,
                        `is_deal` tinyint(1) NOT NULL DEFAULT '0',
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_project_eic_crm_user` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `project_id` bigint UNSIGNED DEFAULT NULL,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_schedules` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `created_by` bigint UNSIGNED NOT NULL,
                        `hosted_by` bigint UNSIGNED NOT NULL,
                        `guest_ids`  JSON DEFAULT NULL,
                        `topic` varchar(255) NOT NULL,
                        `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `scheduled_at` datetime NOT NULL,
                        `link` text COLLATE utf8mb4_unicode_ci,
                        `duration` int DEFAULT NULL,
                        `duration_type` varchar(255) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_statuses` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `type` varchar(255) NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_payment_methods` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_tasks` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `project_id` bigint UNSIGNED NOT NULL,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `assigned_to` bigint UNSIGNED DEFAULT NULL,
                        `title` varchar(255) NOT NULL,
                        `start_date` date DEFAULT NULL,
                        `end_date` date DEFAULT NULL,
                        `status_id` bigint UNSIGNED DEFAULT NULL,
                        `priority_id` bigint UNSIGNED DEFAULT NULL,
                        `description` text COLLATE utf8mb4_unicode_ci,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        $schema[] = "CREATE TABLE `{$wpdb->prefix}eic_task_comments` (
                        `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                        `task_id` bigint UNSIGNED DEFAULT NULL,
                        `eic_crm_user_id` bigint UNSIGNED DEFAULT NULL,
                        `reply_to` bigint UNSIGNED DEFAULT NULL,
                        `comment` text NOT NULL,
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    ) {$collate}";

        if ( ! function_exists( "dbDelta" ) ) {
            require_once ABSPATH . "/wp-admin/includes/upgrade.php";
        }

        dbDelta( $schema );

        $this->seed_tables();
    }

    public function create_roles()
    {
        add_role('client', 'Client', ['read']);
    }

}