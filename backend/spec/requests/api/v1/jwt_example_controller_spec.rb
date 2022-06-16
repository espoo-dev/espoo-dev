require 'rails_helper'
require 'devise/jwt/test_helpers'

describe JwtExampleController do
  let(:headers) do
    { 'Accept' => 'application/json' }
  end

  it 'returns 200 when token is valid' do
    user = create(:user)
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    get '/jwt_example', headers: auth_headers
    expect(response).to have_http_status :ok
  end

  it 'returns 401 when token is not valid' do
    user = build(:user)
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    get '/jwt_example', headers: auth_headers
    expect(response).to have_http_status :unauthorized
  end

  describe '.sign_in' do
    let(:user) { create(:user) }

    context 'when data is valid' do
      context 'when has no token' do
        let(:params) do
          { user: { 'email' => user.email, 'password' => user.password } }
        end

        before do
          post '/users/sign_in', params: params, headers: headers
        end

        it { expect(response).to have_http_status :ok }

        it { expect(response.header['Authorization']).to start_with('Bearer') }

        it 'return user data' do
          expect(response_body).to include(
            'id' => user.id,
            'email' => user.email,
            'role' => {
              'id' => user.role.id,
              'role_type' => user.role.role_type
            }
          )
        end
      end

      context 'when has token from another already user' do
        let(:logged_user) { create(:user) }

        let(:params) do
          { user: { 'email' => user.email, 'password' => user.password } }
        end

        before do
          post '/users/sign_in', params: params, headers: auth_headers(user: logged_user)
        end

        it 'return user data' do
          expect(response_body).to include(
            'id' => user.id,
            'email' => user.email,
            'role' => {
              'id' => user.role.id,
              'role_type' => user.role.role_type
            }
          )
        end
      end
    end
  end
end
