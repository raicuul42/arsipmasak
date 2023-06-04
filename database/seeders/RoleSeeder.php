<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(['admin', 'writer'])->each(function ($role) {
            \Spatie\Permission\Models\Role::create(['name' => $role]);
        });

        \App\Models\User::find(1)->assignRole('admin');
        \App\Models\User::find(2)->assignRole('writer');
    }
}
