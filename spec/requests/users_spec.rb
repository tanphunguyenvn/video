require 'rails_helper'

RSpec.describe "/users", type: :request do
  let(:valid_params) do
    {
      user: {
        email: Faker::Internet.email,
        password: Faker::Internet.password(min_length: 10)
      }
    }
  end

  let(:invalid_params) {
    {
      user: {
        email: Faker::Internet.email,
        password: Faker::Internet.password(max_length: 8)
      }
    }
  }

  describe 'post /sign-up' do
    it 'success with valid params' do
      post '/sign-up', params: valid_params

      body = JSON.parse(response.body)
      expect(body).to have_key('token')
      expect(response).to have_http_status(:created)
    end

    it 'failed with valid params' do
      post '/sign-up', params: invalid_params

      body = JSON.parse(response.body)
      expect(body['error']['password'].length).to be > 0
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe 'post /sign-in' do
    it 'success return a token' do
      user = create(:user)
      post '/sign-in', params: { user: { email: user.email, password: 'Asdfg12345'}}

      body = JSON.parse(response.body)
      expect(body).to have_key('token')
      expect(response).to have_http_status(:ok)
    end

    it 'failed with valid params' do
      user = create(:user)
      post '/sign-in', params: { user: { email: user.email, password: '12345'}}

      body = JSON.parse(response.body)
      expect(body['error']).to match('Invalid email or password')
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
