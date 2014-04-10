# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :forest_specy, :class => 'ForestSpecies' do
    species_name "MyString"
  end
end
