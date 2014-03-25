require 'spec_helper'

describe DashboardController do
	include Devise::TestHelpers

	describe "GET roles" do

		
		it 'if logged in and selected roles, navigate to roles page' do

			@request.env["devise.mapping"] = Devise.mappings[:user]
			user = FactoryGirl.create(:user)
			user.confirm!
			sign_in user
			get 'roles'
				
			expect(response).to render_template("roles")


		end



		it 'if logged in and navigating to roles page, list all current users' do

			@request.env["devise.mapping"] = Devise.mappings[:user]
			user = FactoryGirl.create(:user)
			user2 = FactoryGirl.create(:user)
			user3 = FactoryGirl.create(:user)
			user4 = FactoryGirl.create(:user)

			user.confirm!
			sign_in user
			get 'roles'

			@users = User.all
			expect(assigns(:users)).to eq(@users)

		end
		

	end


	describe "GET index" do

	it 'if logged in, dashboard should list all users and their number of tasks remaining' do

			@request.env["devise.mapping"] = Devise.mappings[:user]
			user = FactoryGirl.create(:user)
			user2 = FactoryGirl.create(:user)
			user3 = FactoryGirl.create(:user)
			user4 = FactoryGirl.create(:user)

			user.confirm!
			sign_in user
			get 'index'

			@users = User.all
			expect(assigns(:users)).to eq(@users)

		end
	end

end
