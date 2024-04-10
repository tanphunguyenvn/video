require 'rails_helper'
require 'jwt'

RSpec.describe '/shares', type: :request do
  # create user and shares
  let!(:me) { create(:user) }
  let!(:share_1) { create(:share, user: me) }
  let!(:share_2) { create(:share, user: me) }
  let!(:share_3) { create(:share, user: me) }

  # valid token
  let(:token_payload) do
    {
      user_email: me.email,
      ttl: (Time.now + (ENV['TOKEN_TTL_IN_MINUTES'] || TOKEN_TTL_IN_MINUTES).to_i.minutes).to_i
    }
  end

  let(:token) { JWT.encode(token_payload, ENV['TOKEN_SECRET'] || TOKEN_SECRET, TOKEN_ALGORITHM) }

  let(:valid_headers) {
    {
      'Authorization': "Bearer #{token}"
    }
  }

  # expired token
  let(:token_expire_payload) do
    {
      user_email: me.email,
      ttl: (Time.now - (ENV['TOKEN_TTL_IN_MINUTES'] || TOKEN_TTL_IN_MINUTES).to_i.minutes).to_i
    }
  end

  let(:token_expire) { JWT.encode(token_expire_payload, ENV['TOKEN_SECRET'] || TOKEN_SECRET, TOKEN_ALGORITHM) }

  let(:expire_headers) {
    {
      'Authorization': "Bearer #{token_expire}"
    }
  }

  # params
  let(:valid_params) do
    {
      share: {
        title: Faker::Name.name,
        url: Faker::Internet.url
      }
    }
  end

  let(:invalid_params_1) {
    {
      share: {
        title: nil,
        url: Faker::Internet.url
      }
    }
  }

  let(:invalid_params_2) {
    {
      share: {
        title: Faker::Name.name,
        url: nil
      }
    }
  }

  describe 'GET /index' do
    it 'render a successful response' do
      get shares_url, headers: valid_headers

      body = JSON.parse(response.body)
      expect(body.length).to eq(Share.count)
      expect(body.last['title']).to eq(Share.last.title)
      expect(response).to have_http_status(:ok)
    end

    it 'require bearer token' do
      get shares_url, headers: nil

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_REQUIRE)
      expect(response).to have_http_status(:bad_request)
    end

    it 'token expired' do
      get shares_url, headers: expire_headers

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_EXPIRED)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET /show' do
    it 'render a successful response' do
      get share_url(share_1), headers: valid_headers

      body = JSON.parse(response.body)
      expect(body['title']).to eq(share_1.title)
      expect(response).to have_http_status(:ok)
    end

    it 'require bearer token' do
      get share_url(share_2), headers: nil

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_REQUIRE)
      expect(response).to have_http_status(:bad_request)
    end

    it 'token expired' do
      get share_url(share_3), headers: expire_headers

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_EXPIRED)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST /create' do
    it 'valid params' do
      post shares_url, params: valid_params, headers: valid_headers

      expect(response).to have_http_status(:created)
    end

    it 'invalid params title nil' do
      post shares_url, params: invalid_params_1, headers: valid_headers

      body = JSON.parse(response.body)
      expect(body['title'].join).to match("can't be blank")
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'invalid params url nil' do
      post shares_url, params: invalid_params_2, headers: valid_headers

      body = JSON.parse(response.body)
      expect(body['url'].join).to match("can't be blank")
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'require bearer token' do
      post shares_url, headers: nil

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_REQUIRE)
      expect(response).to have_http_status(:bad_request)
    end

    it 'token expired' do
      post shares_url, headers: expire_headers

      body = JSON.parse(response.body)
      expect(body['message']).to match(MESSAGE_TOKEN_EXPIRED)
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
