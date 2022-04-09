package com.espoo.android.api

import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor(private val pref: SessionManager) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = pref.readAPIToken()
        val newRequest = chain.request().newBuilder()
            .header("Accept", "application/json")
            .header("Content-Type", "application/json")
        token?.let {
            newRequest.header("Authorization", it)
        }
        return chain.proceed(newRequest.build())
    }
}