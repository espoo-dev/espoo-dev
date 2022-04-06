package com.espoo.android.view.surveys

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import com.espoo.android.R
import com.espoo.android.view.adapter.SurveyClickListener
import com.espoo.android.view.adapter.SurveysAdapter
import com.espoo.android.databinding.FragmentSurveysBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class SurveysFragment : Fragment() {
    private val surveysFragmentViewModel:SurveysFragmentViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentSurveysBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_surveys, container, false)
        val adapter = SurveysAdapter(SurveyClickListener { surveyId ->
            Log.d("TAG_", "survey id: $surveyId")
        })

        binding.recyclerViewSurvey.adapter = adapter

        surveysFragmentViewModel.surveyList.observe(viewLifecycleOwner) { survey ->
            adapter.submitList(survey)
        }
        surveysFragmentViewModel.errorMessage.observe(viewLifecycleOwner) {
            Toast.makeText(activity,it,Toast.LENGTH_SHORT).show()
        }

        surveysFragmentViewModel.loading.observe(viewLifecycleOwner, Observer {
            if (it) {
                binding.progressDialog.visibility = View.VISIBLE
            } else {
                binding.progressDialog.visibility = View.GONE
            }
        })

        surveysFragmentViewModel.getAllSurveys()

        return binding.root
    }
}