class Seeds < Base
  def call
    clean_database
    create_users
    create_question_types
    create_surveys
    create_questions_and_options
    create_answers
    set_survey_ready
  end

  private

  def clean_database
    User.destroy_all
    Role.destroy_all
    QuestionType.destroy_all
    Question.destroy_all
    Survey.destroy_all
    Option.destroy_all
    SurveySubject.destroy_all
    Answer.destroy_all
  end

  # Users and Roles

  def create_roles
    @role_admin = Role.create!(role_type: 'admin')
    @role_teacher = Role.create!(role_type: 'teacher')
    @role_student = Role.create!(role_type: 'student')
  end

  def create_users
    create_roles
    @user_admin = User.create!(email: 'admin@gmail.com', password: '123456', role: @role_admin)
    @user_teacher = User.create!(email: 'teacher@gmail.com', password: '123456', role: @role_teacher)
    @user_student = User.create!(email: 'student@gmail.com', password: '123456', role: @role_student)
  end

  # Questions, Question Types and Options

  def create_question_types
    @question_type_single_choice = QuestionType.create!(name: 'Single Choice')
    @question_type_multiple_choice = QuestionType.create!(name: 'Multiple Choice')
    @question_type_free_text = QuestionType.create!(name: 'Free Text')
  end

  def create_questions_and_options
    options_for_question_one_admin
    options_for_question_two_admin
    options_for_question_one_teacher
    option_incorrect_question_2_survey_teacher
    options_for_question_one_color
    options_for_question_two_color
    create_question_one_to_be_survey_ready
    create_question_two_to_be_survey_ready
    create_question_three_to_be_survey_ready
  end

  def create_question_one_to_be_survey_ready
    question = Question.create!(
      name: 'She _____ happy!',
      user: @user_teacher,
      survey: @to_be_ready_survey,
      question_type: @question_type_single_choice
    )
    Option.create!(name: 'is', question: question, user: @user_admin, correct: true)
    Option.create!(name: 'am', question: question, user: @user_admin, correct: false)
    Option.create!(name: 'are', question: question, user: @user_admin, correct: false)
    question.update!(ready_to_be_answered: true)
  end

  def create_question_two_to_be_survey_ready
    question = Question.create!(
      name: 'I _____ happy!',
      user: @user_teacher,
      survey: @to_be_ready_survey,
      question_type: @question_type_single_choice
    )
    Option.create!(name: 'is', question: question, user: @user_admin, correct: false)
    Option.create!(name: 'am', question: question, user: @user_admin, correct: true)
    Option.create!(name: 'are', question: question, user: @user_admin, correct: false)
    question.update!(ready_to_be_answered: true)
  end

  def create_question_three_to_be_survey_ready
    question = Question.create!(
      name: 'You _____ happy!',
      user: @user_teacher,
      survey: @to_be_ready_survey,
      question_type: @question_type_single_choice
    )
    Option.create!(name: 'is', question: question, user: @user_admin, correct: false)
    Option.create!(name: 'am', question: question, user: @user_admin, correct: false)
    Option.create!(name: 'are', question: question, user: @user_admin, correct: true)
    question.update!(ready_to_be_answered: true)
  end

  def question_one_admin
    @question_one_admin ||= Question.find_or_create_by!(
      name: 'What is your favorit color?',
      user: @user_admin,
      survey: @survey_admin,
      question_type: @question_type_single_choice
    )
  end

  def options_for_question_one_admin
    Option.create!(name: 'Red', question: question_one_admin, user: @user_admin)
    Option.create!(name: 'Blue', question: question_one_admin, user: @user_admin)
  end

  def question_two_admin
    @question_two_admin ||= Question.find_or_create_by!(
      name: 'What is the RGB for color white?',
      user: @user_admin,
      survey: @survey_admin,
      question_type: @question_type_single_choice
    )
  end

  def options_for_question_two_admin
    Option.create!(name: '255,255,255', question: question_two_admin, user: @user_admin)
    Option.create!(name: '0,0,0', question: question_two_admin, user: @user_admin)
  end

  def question_one_teacher
    @question_one_teacher ||= Question.find_or_create_by!(
      name: 'What is your favorite animal?',
      user: @user_teacher,
      survey: @teacher_ready_survey,
      question_type: @question_type_single_choice
    )
  end

  def options_for_question_one_teacher
    Option.create!(name: 'Dog', question: question_one_teacher, user: @user_teacher)
    option_correct_question_1_survey_teacher
    question_one_teacher.update!(ready_to_be_answered: true)
  end

  def question_two_teacher_ready
    @question_two_teacher_ready ||= Question.find_or_create_by!(
      name: 'What is the bigger animal?',
      user: @user_teacher,
      survey: @teacher_ready_survey,
      question_type: @question_type_single_choice
    )
  end

  def option_incorrect_question_2_survey_teacher
    @option_incorrect_question_2_survey_teacher ||= Option.find_or_create_by!(
      name: 'Horse',
      question: question_two_teacher_ready,
      correct: false,
      user: @user_teacher
    )
    Option.create!(name: 'Cat', question: question_two_teacher_ready, correct: true, user: @user_teacher)
    question_two_teacher_ready.update!(ready_to_be_answered: true)
  end

  def question_one_color_survey
    @question_one_color_survey ||= Question.find_or_create_by!(
      name: 'Translate blue',
      user: @user_admin,
      survey: @colors_survey_ready,
      question_type: @question_type_single_choice
    )
  end

  def options_for_question_one_color
    Option.create!(name: 'branco', question: question_one_color_survey, correct: false, user: @user_admin)
    correct_option_question_1_colors_survey
    question_one_color_survey.update!(ready_to_be_answered: true)
  end

  def question_two_color_survey_ready
    @question_two_color_survey_ready ||= Question.find_or_create_by!(
      name: 'Translate red',
      user: @user_admin,
      survey: @colors_survey_ready,
      question_type: @question_type_free_text
    )
  end

  def options_for_question_two_color
    Option.create!(name: 'vermelho', question: question_two_color_survey_ready, correct: true, user: @user_admin)
    question_two_color_survey_ready.update!(ready_to_be_answered: true)
  end

  # correct options

  def option_correct_question_1_survey_teacher
    @option_correct_question_1_survey_teacher ||= Option.find_or_create_by!(
      name: 'Eagle',
      question: question_one_teacher,
      correct: true,
      user: @user_teacher
    )
  end

  def correct_option_question_1_colors_survey
    @correct_option_question_1_colors_survey ||= Option.find_or_create_by!(
      name: 'azul',
      question: question_one_color_survey,
      correct: true,
      user: @user_admin
    )
  end

  # Surveys and Survey subject

  def create_survey_subjects
    @animal_subject = SurveySubject.create!(name: 'Animal', description: 'All the surveys contain questions related to animals.')
    @color_subject = SurveySubject.create!(name: 'Color', description: 'All the surveys contain questions related to colors.')
    @english_subject = SurveySubject.create!(name: 'English', description: "Let's learn English together :)")
  end

  def create_surveys
    create_survey_subjects
    animal_subject_id = @animal_subject.id
    color_subject_id = @color_subject.id
    english_subject_id = @english_subject.id

    @survey_admin = Survey.create!(name: 'Colors survey - Admin', user: @user_admin, survey_subject_id: color_subject_id)
    @colors_survey_ready = Survey.create!(name: 'Colors survey - for Children', description: 'Favorite colors', user: @user_admin, survey_subject_id: color_subject_id)
    @teacher_ready_survey = Survey.create!(name: 'Animals survey - Teacher', description: 'Nice animals', user: @user_teacher, survey_subject_id: animal_subject_id)
    @to_be_ready_survey = Survey.create!(name: 'To Be Verb', description: 'Select one option to fill the gap on the sentence', user: @user_teacher, survey_subject_id: english_subject_id)

    Survey.create!(name: 'Dog survey - Teacher', user: @user_teacher, survey_subject_id: animal_subject_id)
    Survey.create!(name: 'Bunny survey - Teacher', user: @user_teacher, survey_subject_id: animal_subject_id)
  end

  def set_survey_ready
    @teacher_ready_survey.update!(ready: true)
    @colors_survey_ready.update!(ready: true)
    @to_be_ready_survey.update!(ready: true)
  end

  # Answer Surveys and Answers

  def answers_survey_colors
    AnswersSurvey.find_or_create_by!(survey: @colors_survey_ready, user: @user_student)
  end

  def answers_survey_teacher
    @answers_survey_teacher ||= AnswersSurvey.find_or_create_by!(survey: @teacher_ready_survey, user: @user_student)
  end

  def create_answers
    Answer.create!(answers_survey: answers_survey_colors, question: question_one_color_survey, options: [correct_option_question_1_colors_survey])
    Answer.create!(answers_survey: answers_survey_teacher, question: question_one_teacher, options: [option_correct_question_1_survey_teacher])
    Answer.create!(answers_survey: answers_survey_teacher, question: question_two_teacher_ready, options: [@option_incorrect_question_2_survey_teacher])
  end
end
