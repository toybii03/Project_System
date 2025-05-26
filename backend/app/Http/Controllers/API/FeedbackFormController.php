<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackFormController extends Controller
{
    public function store(Request $request)
    {
        $feedback = Feedback::create($request->all());
        return response()->json($feedback, 201);
    }

    public function index()
    {
        return response()->json(Feedback::all());
    }
}
