module HashHelper
  def answers_survey_sym(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option = survey_question.options.first
    option3 = survey_question.options.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type
    answered_question_attributes = {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      }.transform_keys(&:to_sym),
      'options' => [{
        'id' => option.id,
        'name' => option.name,
        'correct' => option.correct
      }.transform_keys(&:to_sym),
                    {
                      'id' => option3.id,
                      'name' => option3.name,
                      'correct' => option3.correct
                    }.transform_keys(&:to_sym)]
    }.transform_keys(&:to_sym)
    unanswered_question_attributes = {
      'id' => survey_question2.id,
      'name' => survey_question2.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      }.transform_keys(&:to_sym),
      'options' => [{
        'id' => option2.id,
        'name' => option2.name,
        'correct' => option2.correct
      }.transform_keys(&:to_sym)]
    }.transform_keys(&:to_sym)

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    {
      id: answers_survey.id,
      user_id: answers_survey.user_id,
      status: answers_survey.status,
      questions: question_attributes,
      answered_questions: [answered_question_attributes],
      not_answered_questions: [unanswered_question_attributes],
      current_question_index: 1
    }.transform_keys(&:to_sym)
  end

  def answers_survey_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option = survey_question.options.first
    option3 = survey_question.options.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type
    answered_question_attributes = {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      },
      'options' => [{
        'id' => option.id,
        'name' => option.name,
        'correct' => option.correct
      },
                    {
                      'id' => option3.id,
                      'name' => option3.name,
                      'correct' => option3.correct
                    }]
    }
    unanswered_question_attributes = {
      'id' => survey_question2.id,
      'name' => survey_question2.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      },
      'options' => [{
        'id' => option2.id,
        'name' => option2.name,
        'correct' => option2.correct
      }]
    }

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    {
      'id' => answers_survey.id,
      'user_id' => answers_survey.user_id,
      'status' => answers_survey.status,
      'questions' => question_attributes,
      'answered_questions' => [answered_question_attributes],
      'not_answered_questions' => [unanswered_question_attributes],
      'current_question_index' => 1
    }
  end

  def answered_question_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    option = survey_question.options.first
    option3 = survey_question.options.second
    question_type = survey_question.question_type
    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      },
      'options' => [{
        'id' => option.id,
        'name' => option.name,
        'correct' => option.correct
      }, {
        'id' => option3.id,
        'name' => option3.name,
        'correct' => option3.correct
      }],
      'answered_options' => [{
        'id' => option3.id,
        'name' => option3.name,
        'correct' => option3.correct
      }],
      'correct' => false
    }
  end

  def answers_survey_with_questions_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type
    answered_question_attributes = answered_question_hash(answers_survey)

    unanswered_question_attributes = {
      'id' => survey_question2.id,
      'name' => survey_question2.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      },
      'options' => [{
        'id' => option2.id,
        'name' => option2.name,
        'correct' => option2.correct
      }],
      'answered_options' => [],
      'correct' => false
    }

    questions_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    {
      'id' => answers_survey.id,
      'user_id' => answers_survey.user.id,
      'status' => answers_survey.status,
      'questions' => questions_attributes,
      'answered_questions' => [answered_question_attributes],
      'not_answered_questions' => [unanswered_question_attributes],
      'current_question_index' => 1
    }
  end

  def survey_hash(survey, answers_survey)
    answers_survey_attributes = answers_survey_hash(answers_survey)

    {
      'id' => survey.id,
      'name' => survey.name,
      'description' => survey.description,
      'survey_subject_id' => survey.survey_subject.id,
      'answered_questions_quantity' => 1,
      'total_questions_quantity' => 2,
      'questions' => answers_survey_attributes['questions'],
      'answers_surveys' => [answers_survey_attributes],
      'current_answers_survey' => answers_survey_attributes
    }
  end

  def survey_sym(survey, answers_survey)
    answers_survey_attributes = answers_survey_sym(answers_survey)

    {
      id: survey.id,
      name: survey.name,
      description: survey.description,
      survey_subject_id: survey.survey_subject.id,
      answered_questions_quantity: 1,
      total_questions_quantity: 2,
      questions: answers_survey_attributes[:questions],
      answers_surveys: [answers_survey_attributes],
      current_answers_survey: answers_survey_attributes
    }
  end
end
