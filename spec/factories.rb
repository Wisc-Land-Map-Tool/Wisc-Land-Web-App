FactoryGirl.define do
	factory :user do |u|
		u.sequence(:email) { |n| "user#{n}@example.com"}
		u.sequence(:password) { |n| "example123#{n}"}
		u.sequence(:password_confirmation) { |n| "example123#{n}"}
		approved "true"
	end
end