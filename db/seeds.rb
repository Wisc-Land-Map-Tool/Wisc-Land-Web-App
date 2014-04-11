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

end