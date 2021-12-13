package com.espoo.android.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.espoo.android.R
import com.espoo.android.model.Survey

class SurveysAdapter : RecyclerView.Adapter<SurveysAdapter.SurveyViewHolder>() {
    var data = listOf<Survey>()
        set(value) {
            field = value
            notifyDataSetChanged()
        }

    class SurveyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val surveyNameTextView : TextView = itemView.findViewById(R.id.textViewSurveyName)
    }

    override fun getItemCount() = data.size

    override fun onBindViewHolder(holder: SurveyViewHolder, position: Int) {
        val item = data[position]
        holder.surveyNameTextView.text = item.name
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SurveyViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val view = layoutInflater.inflate(R.layout.survey_item_view, parent, false)
        return SurveyViewHolder(view)
    }

}