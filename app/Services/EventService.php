<?php

namespace App\Services;

use App\Models\Event;
use Carbon\Carbon;

class EventService
{
   public function getAllEvents($perPage = 10)
{
    return Event::orderBy('id', 'desc')->paginate($perPage);
}


public function createEvent(array $data)
{
    return Event::create($data);
}


    public function updateEvent(Event $event, array $data)
    {
        return $event->update($data);
    }

    public function deleteEvent(Event $event)
    {
        return $event->delete();
    }

    public function getApiEvents()
    {
        $today = Carbon::today();

        return [
            'today' => Event::whereDate('date', $today)->orderBy('date')->get(),
            'future' => Event::whereDate('date', '>', $today)->orderBy('date')->get(),
            'past' => Event::whereDate('date', '<', $today)->orderByDesc('date')->get(),
        ];
    }
}
