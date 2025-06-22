<?php
 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Support\Carbon;

class EventApiController extends Controller
{
    public function index()
    {
        $today = Carbon::today()->toDateString();

        return response()->json([
            'today' => Event::whereDate('date', $today)->get(),
            'future' => Event::whereDate('date', '>', $today)->get(),
            'past' => Event::whereDate('date', '<', $today)->get(),
        ]);
    }
}
