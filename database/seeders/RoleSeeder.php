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

        collect([
            [
                'name' => 'Tom Cook',
                'email' => 'me@company.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'John Doe',
                'email' => 'john@doe.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'jane@doe.com',
                'password' => bcrypt('password'),
            ],
        ])->each(fn ($user) => \App\Models\User::create($user));

        \App\Models\User::find(1)->assignRole('admin');
        \App\Models\User::find(2)->assignRole('writer');
    }
}
