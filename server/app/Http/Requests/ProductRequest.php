<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required','integer','exists:categories,id'],
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'price' => ['required','numeric','min:0','max:1000000'],
            'rating' => ['nullable','numeric','min:0','max:5'],
        ];
    }
}
