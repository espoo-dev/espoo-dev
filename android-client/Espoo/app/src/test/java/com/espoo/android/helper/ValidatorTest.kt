package com.espoo.android.helper

import com.google.common.truth.Truth.assertThat
import org.junit.Before
import org.junit.Test

class ValidatorTest{

    lateinit var validator: Validator

    @Before
    fun setup(){
        validator = Validator()
    }

    @Test
    fun whenInputIsNotEmpty() {
        val inputText = "Not Empty String"
        val result = validator.validateInputNotEmpty(inputText)
        assertThat(result).isTrue()
    }

    @Test
    fun whenInputIsEmpty() {
        val inputText = ""
        val result = validator.validateInputNotEmpty(inputText)
        assertThat(result).isFalse()
    }
}