# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :field_datum, :class => 'FieldData' do
    covertype1_id 1
    covertype2_id 1
    covertype3_id 1
    confidence_level 1
    canopy_perc 1
    cover_comment "MyText"
    canopy_comment "MyText"
    general_comment "MyText"
    identification_method 1
    assignment_id 1
  end
end
