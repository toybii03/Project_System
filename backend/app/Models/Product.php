<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'stock', 'description'];

    public function hasStock($quantity)
    {
        return $this->stock >= $quantity;
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
