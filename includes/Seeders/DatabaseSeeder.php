<?php
namespace WpClientManagement\Seeders;

class DatabaseSeeder
{

    /**
     * Run all seeders for the database
     *
     * @return void
     */

    public function run() {
        $this->seed_payment_methods();
        $this->seed_priorities();
        $this->seed_statuses();
        $this->seed_roles();
        $this->seed_currencies();
    }

    /**
     * Seed the roles table
     *
     * @return void
     */
    protected function seed_roles() {
        global $wpdb;
        $existing_roles = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}eic_roles");
        if ($existing_roles > 0) {
            return;
        }
        $wpdb->insert("{$wpdb->prefix}eic_roles", ['name' => 'admin']);
        $wpdb->insert("{$wpdb->prefix}eic_roles", ['name' => 'client']);
        $wpdb->insert("{$wpdb->prefix}eic_roles", ['name' => 'team-member']);
    }

    /**
     * Seed the payment methods table
     *
     * @return void
     */
    protected function seed_payment_methods() {
        global $wpdb;
        $existing_methods = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}eic_payment_methods");
        if ($existing_methods > 0) {
            return;
        }
        $wpdb->insert("{$wpdb->prefix}eic_payment_methods", ['name' => 'Cash']);
        $wpdb->insert("{$wpdb->prefix}eic_payment_methods", ['name' => 'Cheque']);
    }

    /**
     * Seed the currencies table
     *
     * @return void
     */
    protected function seed_currencies() {
        global $wpdb;
        $existing_currencies = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}eic_currencies");
        if ($existing_currencies > 0) {
            return;
        }
        $wpdb->insert("{$wpdb->prefix}eic_currencies", ['name' => 'Dollar', 'code' => 'USD' ,'symbol' => '$']);
        $wpdb->insert("{$wpdb->prefix}eic_currencies", ['name' => 'Euro', 'code' => 'EUR' ,'symbol' => '€']);
        $wpdb->insert("{$wpdb->prefix}eic_currencies", ['name' => 'Taka', 'code' => 'BDT' ,'symbol' => '৳']);
    }

    /**
     * Seed the statuses table
     *
     * @return void
     */
    protected function seed_statuses() {
        global $wpdb;
        $existing_statuses = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}eic_statuses");
        if ($existing_statuses > 0) {
            return;
        }
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'project','name' => 'new']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'project','name' => 'in_progress']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'project','name' => 'on_hold']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'project','name' => 'completed']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'invoice','name' => 'paid']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'invoice','name' => 'unpaid']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'task','name' => 'done']);
        $wpdb->insert("{$wpdb->prefix}eic_statuses", ['type' => 'task','name' => 'in_progress']);

    }

    /**
     * Seed the statuses table
     *
     * @return void
     */
    protected function seed_priorities() {
        global $wpdb;
        $existing_priorities = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}eic_priorities");
        if ($existing_priorities > 0) {
            return;
        }
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'project','name' => 'high']);
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'project','name' => 'medium']);
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'project','name' => 'low']);
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'task','name' => 'high']);
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'task','name' => 'medium']);
        $wpdb->insert("{$wpdb->prefix}eic_priorities", ['type' => 'task','name' => 'low']);
    }
}