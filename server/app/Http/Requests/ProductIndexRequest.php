<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'per_page' => ['nullable','integer','min:1','max:100'],
            'page' => ['nullable','integer','min:1'],
            'category' => ['nullable','integer','exists:categories,id'],
            'category_id' => ['nullable','integer','exists:categories,id'],
            'min_price' => ['nullable','numeric','min:0'],
            'max_price' => ['nullable','numeric','min:0'],
            'min_rating' => ['nullable','numeric','min:0','max:5'],
            'q' => ['nullable','string','max:255'],
            'search' => ['nullable','string','max:255'],
            'favorites_only' => ['nullable','in:true,false,1,0'],
            'sort' => ['nullable','in:price_asc,price_desc,rating_asc,rating_desc,name_asc,name_desc,oldest,newest'],
        ];
    }
}


