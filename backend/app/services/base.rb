class Base
  def initialize; end

  def self.call
    new.call
  end

  def call
    raise NotImplementedError
  end
end
