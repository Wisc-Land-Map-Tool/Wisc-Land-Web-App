FactoryGirl.define do
	factory :user do
		email "user@example.com"
		password "example123"
		password_confirmation { "example123" }
	end
end