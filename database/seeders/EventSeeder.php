<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run()
    {
        // 🔥 Indian-style event names
        $titles = [
            'Wedding Ceremony',
            'Reception Party',
            'Investor Meeting',
            'Barber Appointment',
            'Doctor Checkup',
            'Festival Celebration',
            'Temple Visit',
            'Birthday Party',
            'Family Get-together',
            'School Reunion',
            'Property Registration',
            'Annual General Meeting',
            'New Year Bash',
            'Ganesh Pooja',
            'Sangeet Function',
            'Business Conference',
            'Housewarming',
            'College Seminar',
            'Client Presentation',
            'Community Meetup'
        ];

        // ✅ TODAY'S EVENTS
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'date' => Carbon::today()->toDateString(),
            ]);
        }

        // ✅ FUTURE EVENTS (1-30 days ahead)
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'date' => Carbon::today()->addDays(rand(1, 30))->toDateString(),
            ]);
        }

        // ✅ PAST EVENTS (1-30 days ago)
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'date' => Carbon::today()->subDays(rand(1, 30))->toDateString(),
            ]);
        }
    }
}
