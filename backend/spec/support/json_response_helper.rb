require 'devise/jwt/test_helpers'

module JsonResponseHelper
  def auth_headers(user: create(:user))
    headers = {
      'Accept' => 'application/json'
    }
    Devise::JWT::TestHelpers.auth_headers(headers, user)
  end

  def response_body
    JSON.parse(response.body)
  end
end
