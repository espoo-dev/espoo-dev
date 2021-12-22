package com.espoo.android.adapter

import android.graphics.Matrix
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
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
        val surveyDescriptionTextView : TextView = itemView.findViewById(R.id.textViewSurveyDescription)
        val surveyImageView : ImageView = itemView.findViewById(R.id.imageViewSurveyImage)
        val surveyQuestionsTextView : TextView = itemView.findViewById(R.id.textViewSurveyQuestions)
    }

    override fun getItemCount() = data.size

    override fun onBindViewHolder(holder: SurveyViewHolder, position: Int) {
        val item = data[position]
        holder.surveyNameTextView.text = item.name
        holder.surveyDescriptionTextView.text = item.description

        /* In the web app the survey image is cropped to respect the fixed height for the image area
        * and the bottom of the image is never shown. Android scaleType attribute just provide the
        * CenterCrop option and to do that needs to crop starting from the top. That's what the implementation
        * below does.
        * To understand better: https://medium.com/mobile-app-development-publication/android-image-startcrop-and-endcrop-scaling-18d7297f1e7c
        *
        * To get attributes like width of a view component, needs to wait the activity to attached first.
        * This is the reason to implement an onPreDrawListener to view.
        * Read here https://stackoverflow.com/questions/19271609/imageview-getwidth-returns-0 */
        holder.surveyImageView.viewTreeObserver.addOnPreDrawListener {
            holder.surveyImageView.drawable ?: false

            val drawable = holder.surveyImageView.drawable

            val imageWidth: Float = calculateMeasures(holder.surveyImageView.width,
                arrayOf(holder.surveyImageView.paddingLeft, holder.surveyImageView.paddingRight)).toFloat()

            val imageHeight: Float = calculateMeasures(holder.surveyImageView.height,
                arrayOf(holder.surveyImageView.paddingTop, holder.surveyImageView.paddingBottom)).toFloat()

            val drawableWidth = drawable.intrinsicWidth
            val drawableHeight = drawable.intrinsicHeight

            val widthScale = imageWidth / drawableWidth
            val heightScale = imageHeight / drawableHeight
            val scale = widthScale.coerceAtLeast(heightScale)

            val baseMatrix = Matrix()
            baseMatrix.reset()
            baseMatrix.postScale(scale, scale)
            holder.surveyImageView.imageMatrix = baseMatrix

            true
        }
        //TODO Needs to holder.surveyImageView.viewTreeObserver.removeOnPreDrawListener after it triggered

        val questionText = if (item.questions.size <= 1) "Question" else "Questions"
        holder.surveyQuestionsTextView.text = "${item.questions.size} $questionText"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SurveyViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val view = layoutInflater.inflate(R.layout.survey_item_view, parent, false)

        return SurveyViewHolder(view)
    }

    private fun calculateMeasures (measure: Int, valuesToSubtract : Array<Int>) : Int {
        valuesToSubtract.forEach { measure - it }
        return measure
    }

}