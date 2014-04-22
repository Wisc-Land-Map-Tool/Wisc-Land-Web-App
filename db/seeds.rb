# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
[:admin, :field_manager, :field_staff].each do |role|
  Role.find_or_create_by_name({ name: role })
User.new({:first_name => "system", :last_name => "admin", :email => "test_admin@example.com", :approved => 1, :password => "wisc_admin", :password_confirmation => "wisc_admin" }).save(:validate => false)

Classification.create({:class_id => "1", :class_name => "Urban Developed"})
Classification.create({:class_id => "2", :class_name => "Agriculture"})
Classification.create({:class_id => "3", :class_name => "Forest"})
Classification.create({:class_id => "4", :class_name => "Shrubland"})
Classification.create({:class_id => "5", :class_name => "Grassland"})
Classification.create({:class_id => "6", :class_name => "Open Water"})
Classification.create({:class_id => "7", :class_name => "Barren"})
Classification.create({:class_id => "8", :class_name => "Wetland"})

Classification.create({:class_id => "11", :class_name => "High Intensity Urban"})
Classification.create({:class_id => "12", :class_name => "Low Intensity Urban"})
Classification.create({:class_id => "21", :class_name => "Row Crops"})
Classification.create({:class_id => "22", :class_name => "Forage Crops"})
Classification.create({:class_id => "31", :class_name => "Coniferous"})
Classification.create({:class_id => "32", :class_name => "Broad-leaved Deciduous"})
Classification.create({:class_id => "33", :class_name => "Mixed Coniferous/Broad-leaved Deciduous"})
Classification.create({:class_id => "34", :class_name => "Clearcut/Young Plantation"})
Classification.create({:class_id => "41", :class_name => "Upland Shrub"})
Classification.create({:class_id => "51", :class_name => "Grassland"})
Classification.create({:class_id => "61", :class_name => "Open Water"})
Classification.create({:class_id => "71", :class_name => "Sand"})
Classification.create({:class_id => "72", :class_name => "Bare Soil"})
Classification.create({:class_id => "73", :class_name => "Exposed Rock"})
Classification.create({:class_id => "74", :class_name => "Mixed"})
Classification.create({:class_id => "81", :class_name => "Emergent/Wet Meadow"})
Classification.create({:class_id => "82", :class_name => "Lowland Shrub"})
Classification.create({:class_id => "83", :class_name => "Broad-leaved Evergreen"})
Classification.create({:class_id => "84", :class_name => "Forested Wetland"})

Classification.create({:class_id => "821", :class_name => "Coniferous"})
Classification.create({:class_id => "822", :class_name => "Broad-leaved Deciduous"})
Classification.create({:class_id => "841", :class_name => "Coniferous"})
Classification.create({:class_id => "842", :class_name => "Broad-leaved Deciduous"})
Classification.create({:class_id => "843", :class_name => "Mixed Coniferous/Broad-leaved Deciduous"})





end