# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :classification do
    class_id 1
    class_name "MyString"
    level 1
    parent 1
  end
end
