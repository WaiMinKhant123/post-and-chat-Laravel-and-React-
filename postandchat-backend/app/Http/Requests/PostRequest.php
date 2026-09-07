<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'body'=> ['required','string'],
            'user_id' =>['required','integer'],
            'type' => ['required', 'string', 'in:text,media'],
        ];
    }
}
