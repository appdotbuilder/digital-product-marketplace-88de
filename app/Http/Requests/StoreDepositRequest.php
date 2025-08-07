<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepositRequest extends FormRequest
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
            'amount' => 'required|numeric|min:10|max:10000',
            'transaction_id' => 'required|string|max:255',
            'proof_image' => 'required|image|max:5120', // 5MB max
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'amount.required' => 'Amount is required.',
            'amount.numeric' => 'Amount must be a valid number.',
            'amount.min' => 'Minimum deposit amount is $10.',
            'amount.max' => 'Maximum deposit amount is $10,000.',
            'transaction_id.required' => 'Transaction ID is required.',
            'transaction_id.max' => 'Transaction ID is too long.',
            'proof_image.required' => 'Proof image is required.',
            'proof_image.image' => 'Proof must be an image file.',
            'proof_image.max' => 'Image size cannot exceed 5MB.',
            'notes.max' => 'Notes cannot exceed 1000 characters.',
        ];
    }
}