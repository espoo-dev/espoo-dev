package com.espoo.android.repository

import com.espoo.android.api.ApiService
import javax.inject.Inject

class SurveysRepository
    @Inject
    constructor(private val apiService: ApiService){
        suspend fun getSurveys() = apiService.getSurveys()
    }
