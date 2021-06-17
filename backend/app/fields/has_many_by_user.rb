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
    associated_class.by_user(resource.user)
    # this is the implementation using administrate default approach
    # if options.key?(:includes)
    #   includes = options.fetch(:includes)
    #   scope.includes(*includes)
    # else
    #   scope
    # end
  end
end
