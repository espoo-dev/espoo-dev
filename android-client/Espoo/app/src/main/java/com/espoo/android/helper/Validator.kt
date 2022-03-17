package com.espoo.android.helper

class Validator {
    internal fun validateInputNotEmpty(inputText: String) : Boolean {
        return inputText.isNotEmpty()
    }
}