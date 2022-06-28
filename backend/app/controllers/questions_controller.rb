class QuestionsController < ApplicationController
  def show
    @question = Question.find(params[:id])
    @translation_key = translation_key(@question)
  end

  private

  def translation_key(question)
    question.question_type.snack_case_name_question_type
  end
end
