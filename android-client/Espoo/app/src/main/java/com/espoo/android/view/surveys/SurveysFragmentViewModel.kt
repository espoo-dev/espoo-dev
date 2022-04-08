package com.espoo.android.view.surveys

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.espoo.android.model.Survey
import com.espoo.android.repository.SurveysRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.*
import javax.inject.Inject

@HiltViewModel
class SurveysFragmentViewModel
@Inject
constructor(private val repository: SurveysRepository) : ViewModel() {
    val errorMessage = MutableLiveData<String>()
    val surveyList = MutableLiveData<List<Survey>>()
    private var job: Job? = null

    init {
        getAllSurveys()
    }
    private val exceptionHandler = CoroutineExceptionHandler { _, throwable ->
        onError("Exception handled: ${throwable.localizedMessage}")
    }
    val loading = MutableLiveData<Boolean>()

    fun getAllSurveys() {
        job = CoroutineScope(Dispatchers.IO).launch {
            loading.postValue(true)
            val requestSurvey = repository.getSurveys()
            val responseSurvey = requestSurvey.execute()
            withContext(Dispatchers.Main) {
                if (responseSurvey.isSuccessful) {
                    surveyList.postValue(responseSurvey.body())
                    loading.value = false
                } else {
                    onError("Error : ${responseSurvey.errorBody()} ")
                }
            }
        }

    }

    private fun onError(message: String) {
        errorMessage.value = message
        loading.value = false
    }

    override fun onCleared() {
        super.onCleared()
        job?.cancel()
    }

}