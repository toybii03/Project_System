<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    public function index()
    {
        return response()->json(Transaction::with('product')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            // Lock the product row to prevent race conditions
            $product = Product::where('id', $request->product_id)->lockForUpdate()->first();

            if (!$product || $product->stock < $request->quantity) {
                DB::rollBack();
                return response()->json(['message' => 'Not enough stock available'], 400);
            }

            // Deduct stock
            $product->stock -= $request->quantity;
            $product->save();

            // Create transaction
            $transaction = Transaction::create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'total_price' => $product->price * $request->quantity,
            ]);

            // Generate and save PDF receipt
            $pdf = Pdf::loadView('pdf.receipt', compact('transaction'));
            $fileName = 'receipt_' . $transaction->id . '.pdf';
            $filePath = 'public/receipts/' . $fileName;
            Storage::put($filePath, $pdf->output());

            DB::commit();

            return response()->json([
                'message' => 'Transaction successful',
                'transaction' => $transaction->load('product'),
                'receipt_url' => asset('storage/receipts/' . $fileName)
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Transaction failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $transaction = Transaction::with('product')->findOrFail($id);
        return response()->json($transaction);
    }
}
