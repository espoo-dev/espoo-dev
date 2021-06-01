require 'administrate/field/base'

class HasManyByUser < Administrate::Field::HasMany
  def to_partial_path
    "/fields/has_many/#{page}"
  end

  def self.html_class
    'has-many'
  end

  private

  def candidate_resources
    scope = associated_class.by_user(resource.user)
    if options.key?(:includes)
      includes = options.fetch(:includes)
      scope.includes(*includes)
    else
      scope
    end
  end
end
