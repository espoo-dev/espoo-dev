package com.espoo.android.view

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.espoo.android.R
import com.espoo.android.adapter.SurveyClickListener
import com.espoo.android.adapter.SurveysAdapter
import com.espoo.android.api.ApiService
import com.espoo.android.databinding.FragmentSurveysBinding
import com.espoo.android.helper.SessionManager
import com.espoo.android.model.Survey
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SurveysFragment : Fragment() {

    private lateinit var service: ApiService
    private lateinit var sessionManager : SessionManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentSurveysBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_surveys, container, false)
        val adapter = SurveysAdapter(SurveyClickListener { surveyId ->
            Log.d("TAG_", "survey id: $surveyId")
        })

        binding.recyclerViewSurvey.adapter = adapter

        sessionManager = context?.let { SessionManager(it) }!!
        service = ApiService.create(sessionManager.readAPIToken())

        service.getSurveys()
            .enqueue(object : Callback<List<Survey>> {
                override fun onResponse(call: Call<List<Survey>>, response: Response<List<Survey>>) {
                    response.body()?.let {
                        adapter.submitList(it)
                    }
                }
                override fun onFailure(call: Call<List<Survey>>, t: Throwable) {
                    Log.e("TAG_", "onFailure: An error happened!")
                    t.printStackTrace()
                }
            })
        return binding.root
    }
}