<!DOCTYPE html>
<html>

<head>
    <title>Transaction Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        .receipt-container {
            border: 1px solid #ddd;
            padding: 20px;
            width: 300px;
            margin: auto;
        }

        h1 {
            margin-bottom: 5px;
        }

        hr {
            margin: 10px 0;
        }
    </style>
</head>

<body>
    <div class="receipt-container">
        <h1>Benshopz</h1>
        <small>Filamer Christian University</small>
        <hr>
        <h2>Transaction Receipt</h2>
        <p><strong>Transaction ID:</strong> {{ $transaction->id }}</p>
        <p><strong>Product:</strong> {{ $transaction->product->name }}</p>
        <p><strong>Quantity:</strong> {{ $transaction->quantity }}</p>
        <p><strong>Total Price:</strong> ₱{{ number_format($transaction->total_price, 2) }}</p>
        <p><strong>Date:</strong> {{ $transaction->created_at->format('Y-m-d H:i:s') }}</p>
        <hr>
        <p>Thank you for your purchase!</p>
    </div>
</body>

</html>
