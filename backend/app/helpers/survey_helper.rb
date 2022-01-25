module SurveyHelper
  def question_type_translation_key(array)
    array.map do |type|
      t("surveys.index.question_type.#{type.downcase.split.join('_')}")
    end
  end

  def question_types(survey)
    array_of_question_types = []
    survey[:questions].each do |question|
      array_of_question_types << question[:question_type][:name]
    end

    question_type_translation_key(array_of_question_types.uniq.sort!)
  end
end
