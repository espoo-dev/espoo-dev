require 'administrate/field/base'

class BelongsToByUser < Administrate::Field::BelongsTo
  def candidate_resources
    scope = options_scope ? options_scope.call : associated_class.by_user(resource.user)

    order = options.delete(:order)
    order ? scope.reorder(order) : scope
  end

  def options_scope
    options[:scope]
  end

  def to_partial_path
    "/fields/belongs_to/#{page}"
  end

  def self.html_class
    'belongs-to'
  end
end
