package com.espoo.android.di

import com.espoo.android.api.ApiService
import com.espoo.android.api.AuthInterceptor
import com.espoo.android.helper.Constants
import com.espoo.android.helper.Constants.BASE_URL
import com.espoo.android.api.SessionManager
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object NetworkingModule {
    @Provides
    fun provideBaseUrl() = Constants.BASE_URL

    @Singleton
    @Provides
    fun provideRequestInterceptor(prefs: SessionManager): AuthInterceptor {
        return AuthInterceptor(prefs)
    }

    @Singleton
    @Provides
    fun providesHttpLoggingInterceptor() = HttpLoggingInterceptor()
        .apply {
            level = HttpLoggingInterceptor.Level.BODY
        }

    @Singleton
    @Provides
    fun providesOkHttpClient(
        httpLoggingInterceptor: HttpLoggingInterceptor,
        requestInterceptor: AuthInterceptor
    ): OkHttpClient =
        OkHttpClient
            .Builder()
            .addInterceptor(httpLoggingInterceptor)
            .addInterceptor(requestInterceptor)
            .build()


    @Provides
    @Singleton
    fun provideRetrofitInstance(okHttpClient: OkHttpClient): ApiService =
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
}