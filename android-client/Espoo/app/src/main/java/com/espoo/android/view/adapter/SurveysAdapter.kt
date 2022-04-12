package com.espoo.android.view.adapter

import android.graphics.Matrix
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.espoo.android.R
import com.espoo.android.model.Survey

class SurveysAdapter(private val clickListener: SurveyClickListener) : ListAdapter<Survey, SurveysAdapter.SurveyViewHolder>(SurveyDiffCallback()) {

    class SurveyViewHolder private constructor (itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val surveyNameTextView : TextView = itemView.findViewById(R.id.textViewSurveyName)
        private val surveyDescriptionTextView : TextView = itemView.findViewById(R.id.textViewSurveyDescription)
        private val surveyImageView : ImageView = itemView.findViewById(R.id.imageViewSurveyImage)
        private val surveyQuestionsTextView : TextView = itemView.findViewById(R.id.textViewSurveyQuestions)

        fun bin(clickListener: SurveyClickListener, item: Survey) {
            surveyNameTextView.text = item.name
            surveyDescriptionTextView.text = item.description

            /* In the web app the survey image is cropped to respect the fixed height for the image area
            * and the bottom of the image is never shown. Android scaleType attribute just provide the
            * CenterCrop option and to do that needs to crop starting from the top. That's what the implementation
            * below does.
            * To understand better: https://medium.com/mobile-app-development-publication/android-image-startcrop-and-endcrop-scaling-18d7297f1e7c
            *
            * To get attributes like width of a view component, needs to wait the activity to attached first.
            * This is the reason to implement an onPreDrawListener to view.
            * Read here https://stackoverflow.com/questions/19271609/imageview-getwidth-returns-0 */
            surveyImageView.viewTreeObserver.addOnPreDrawListener {
                surveyImageView.drawable ?: false

                val drawable = surveyImageView.drawable

                val imageWidth: Float = calculateMeasures(surveyImageView.width,
                    arrayOf(surveyImageView.paddingLeft, surveyImageView.paddingRight)).toFloat()

                val imageHeight: Float = calculateMeasures(surveyImageView.height,
                    arrayOf(surveyImageView.paddingTop, surveyImageView.paddingBottom)).toFloat()

                val drawableWidth = drawable.intrinsicWidth
                val drawableHeight = drawable.intrinsicHeight

                val widthScale = imageWidth / drawableWidth
                val heightScale = imageHeight / drawableHeight
                val scale = widthScale.coerceAtLeast(heightScale)

                val baseMatrix = Matrix()
                baseMatrix.reset()
                baseMatrix.postScale(scale, scale)
                surveyImageView.imageMatrix = baseMatrix

                true
            }
            //TODO Needs to holder.surveyImageView.viewTreeObserver.removeOnPreDrawListener after it triggered

            val questionText = if (item.questions.size <= 1) "Question" else "Questions"
            surveyQuestionsTextView.text = "${item.questions.size} $questionText"

            itemView.setOnClickListener{
                clickListener.onClick(item)
            }
        }

        private fun calculateMeasures (measure: Int, valuesToSubtract : Array<Int>) : Int {
            valuesToSubtract.forEach { measure - it }
            return measure
        }

        companion object {
            fun from(parent: ViewGroup): SurveyViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)
                val view = layoutInflater.inflate(R.layout.survey_item_view, parent, false)
                return SurveyViewHolder(view)
            }
        }
    }

    override fun onBindViewHolder(holder: SurveyViewHolder, position: Int) {
        val item = getItem(position)
        holder.bin(clickListener, item)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SurveyViewHolder {
        return SurveyViewHolder.from(parent)
    }

}

class SurveyDiffCallback : DiffUtil.ItemCallback<Survey>() {
    override fun areItemsTheSame(oldItem: Survey, newItem: Survey): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: Survey, newItem: Survey): Boolean {
        return oldItem == newItem
    }

}

class SurveyClickListener(val clickListener: (surveyId: Int) -> Unit) {
    fun onClick(survey: Survey) = clickListener(survey.id)
}