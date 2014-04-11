require 'spec_helper'

describe LoginController do
	include Devise::TestHelpers

	describe "GET index" do

		it "if logged in, directs user to dashboard" do

			@request.env["devise.mapping"] = Devise.mappings[:user]
			user = FactoryGirl.create(:user)
			sign_in user
			get 'index'
			response.should redirect_to '/dashboard'

        end

        it "if not logged in, directs user to index page" do

        	get 'index'
			response.should render_template(:index)

        end

	end

end
