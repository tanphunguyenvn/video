require "rails_helper"

RSpec.describe UsersController, type: :routing do
  context 'routing' do
    it 'routes to #create' do
      expect(post: '/sign-up').to route_to('users#create')
    end

    it 'routes to #show' do
      expect(post: '/sign-in').to route_to('users#login')
    end
  end
end
