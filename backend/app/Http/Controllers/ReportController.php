<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    // Return sales trends grouped by date
    public function salesTrends()
    {
        $sales = DB::table('transactions')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as total_sales'))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($sales);
    }

    // Return feedback summary grouped by rating
    public function feedbackSummary()
    {
        $summary = DB::table('feedback')
            ->select('rating', DB::raw('COUNT(*) as count'))
            ->groupBy('rating')
            ->orderByDesc('rating')
            ->get();

        return response()->json($summary);
    }

    // Optionally, other report methods here...
}
