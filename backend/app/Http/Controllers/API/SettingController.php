<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getFarewellMessage()
    {
        $message = Setting::getValue('farewell_message', 'Thank you for your purchase!');
        return response()->json(['farewell_message' => $message]);
    }

    public function updateFarewellMessage(Request $request)
    {
        $request->validate([
            'farewell_message' => 'required|string|max:500'
        ]);

        Setting::setValue('farewell_message', $request->farewell_message);

        return response()->json(['message' => 'Farewell message updated']);
    }
}
