module HashHelperMethods
  module_function

  def question_type(question_type)
    {
      'id' => question_type.id,
      'name' => question_type.name
    }
  end

  def options_sym(options)
    options.map do |option|
      {
        'id' => option.id,
        'name' => option.name
      }.transform_keys(&:to_sym)
    end
  end

  def options_hash(options)
    options.map do |option|
      {
        'id' => option.id,
        'name' => option.name
      }
    end
  end

  def answers_survey_questions_attributes_sym(survey_question, question_type, options)
    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => question_type(question_type).transform_keys(&:to_sym),
      'options' => options_sym(options),
      'image_url' => survey_question.image_url
    }.transform_keys(&:to_sym)
  end

  def answers_survey_questions_attributes_hash(survey_question, question_type, options)
    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => question_type(question_type),
      'options' => options_hash(options),
      'image_url' => survey_question.image_url
    }
  end

  def answers_survey_returned_params(params = {})
    answers_survey = params[:answers_survey]

    {
      'id' => answers_survey.id,
      'user_id' => answers_survey.user_id,
      'status' => answers_survey.status,
      'questions' => params[:question_attributes],
      'answered_questions' => [params[:answered_question_attributes]],
      'not_answered_questions' => [params[:unanswered_question_attributes]],
      'current_question_index' => 1
    }
  end

  def survey_helper
    {
      id: survey.id,
      name: survey.name,
      description: survey.description,
      survey_subject_id: survey.survey_subject.id,
      answered_questions_quantity: 1,
      total_questions_quantity: 2,
      icon_url: survey.icon_url,
      image_url: survey.image_url
    }
  end
end
