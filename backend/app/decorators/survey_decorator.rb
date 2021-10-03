class SurveyDecorator < Draper::Decorator
  delegate_all

  def title
    questions_count = object.questions.count
    questions_translated = I18n.t('activerecord.models.question', count: questions_count)
    "#{object.name} (#{questions_count} #{questions_translated})"
  end
end
