<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    protected $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    // Admin Panel
 public function index()
{
    return Inertia::render('Admin/Events/Index', [
        'events' => $this->eventService->getAllEvents(),
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required|date',
        ]);

        $this->eventService->createEvent($request->all());

        return redirect()->back()->with('success', 'Event created');
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required|date',
        ]);

        $this->eventService->updateEvent($event, $request->all());

        return redirect()->back()->with('success', 'Event updated');
    }

    public function destroy(Event $event)
    {
        $this->eventService->deleteEvent($event);

        return redirect()->back()->with('success', 'Event deleted');
    }

    // API for React Frontend
    public function apiEvents()
    {
        return response()->json($this->eventService->getApiEvents());
    }

    public function frontend()
    {
        return Inertia::render('Events/Frontend');
    }
}
