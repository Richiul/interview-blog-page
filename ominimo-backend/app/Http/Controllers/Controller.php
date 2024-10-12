<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class Controller
{
    use AuthorizesRequests;

    public function validateRequest(Request $request, array $rules)
    {
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        return true;
    }
}
