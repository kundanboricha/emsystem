<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run()
    {
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

        $descriptions = [
            'This is a special event for close family and friends.',
            'Don’t miss out on the delicious food and music!',
            'Important discussion with key stakeholders.',
            'Routine checkup and follow-up appointment.',
            'Celebrate the festival with joy and togetherness.',
            'A religious ceremony with community gathering.',
            'A fun party with lots of entertainment.',
            'An official meeting with important presentations.',
            'Catch up with old friends and relive memories.',
            'An auspicious day with rituals and blessings.',
        ];

        $locations = [
            'SG Highway, Ahmedabad',
            'Maninagar, Ahmedabad',
            'Law Garden, Ahmedabad',
            'Bodakdev, Ahmedabad',
            'Satellite, Ahmedabad',
            'Vastrapur, Ahmedabad',
            'Navrangpura, Ahmedabad',
            'Ellis Bridge, Ahmedabad',
            'Chandkheda, Ahmedabad',
            'Gota, Ahmedabad',
        ];

        // Helper for random time between 9 AM to 8 PM
        $getRandomTime = function () {
            $hour = rand(9, 20); // 9 AM to 8 PM
            $minute = rand(0, 59);
            return sprintf('%02d:%02d:00', $hour, $minute);
        };

        // ✅ TODAY'S EVENTS
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'description' => $descriptions[array_rand($descriptions)],
                'date' => Carbon::today()->toDateString(),
                'time' => $getRandomTime(),
                'location' => $locations[array_rand($locations)],
            ]);
        }

        // ✅ FUTURE EVENTS (1-30 days ahead)
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'description' => $descriptions[array_rand($descriptions)],
                'date' => Carbon::today()->addDays(rand(1, 30))->toDateString(),
                'time' => $getRandomTime(),
                'location' => $locations[array_rand($locations)],
            ]);
        }

        // ✅ PAST EVENTS (1-30 days ago)
        for ($i = 0; $i < 5; $i++) {
            Event::create([
                'title' => $titles[array_rand($titles)],
                'description' => $descriptions[array_rand($descriptions)],
                'date' => Carbon::today()->subDays(rand(1, 30))->toDateString(),
                'time' => $getRandomTime(),
                'location' => $locations[array_rand($locations)],
            ]);
        }
    }
}
