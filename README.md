# Wisconsin Land Cover Mapping Field Validation Tool dashboard application

The Wisconsin State Cartographer's office at the University of Wisconsin-Madison is leading a statewide land cover mapping project beginning in the spring of 2014. The land cover project will utilize satellite imagery from 2012-2014 to map the distribution of 30+ broad land cover classes found in the state.  Examples include deciduous forests, evergreen forests, wetlands, barren lands, shrubland, urban, agriculture, and so on.
To assess the accuracy of the mapping, field agents must physically visit several thousand field sites scattered across the state. The Wisconsin Land Cover Mapping Field Validation Tool will be a device agnostic application that will display on an interactive map the locations that field staff are assigned to validate. There will be two major components to our project, a web application and a mobile application.  This repository holds the initial version of the web application. This application will be used in an office setting to manage assignments and view collected data. Based on the assignments, staff will travel to locations and collect data using the mobile application. The mobile application can be found at:

https://github.com/Wisc-Land-Map-Tool/Wisc-Land-Mobile-App

# Set up for local use

Ruby 2.1 and Rails 4.0 is required for use of this application. 

The following gems are required.  They can be found at https://rubygems.org using the ruby gem package or by using bundle install as listed below.
(versions are listed after package name)

gem "pg", "~> 0.17.1"

gem 'bootstrap-sass', '~> 3.1.1'

gem 'devise'

gem 'bcrypt-ruby'

gem "cancan"

gem 'rolify'

gem 'sprockets', '2.11.0'

gem 'simplecov', :require=> false, :group => :test

gem 'rspec-rails', '2.13.1'

gem 'factory_girl_rails'

gem 'selenium-webdriver', '2.35.1'

gem 'capybara', '2.1.0'

gem 'sass-rails', '4.0.1'

gem 'uglifier', '2.1.1'

gem 'coffee-rails', '4.0.1'

gem 'jquery-rails', '3.0.4'

gem 'turbolinks', '1.1.1'

gem 'jbuilder', '1.0.2'

gem 'sdoc', '0.3.20', require: false

gem 'rails_12factor'

For tutorials on how to set up Rails and Ruby on your machine, see the following:

http://guides.rubyonrails.org/getting_started.html

Clone the repository to your local machine with the following command:

git clone https://github.com/Wisc-Land-Map-Tool/Wisc-Land-Web-App

Navigate into directory and ensure the gems are installed and up to date using bundle install:

bundle install

bundle update

Run the local server using the command:

rails server

# Running tests

The automatic testing suite is located in the following directories:

/spec
/test/selenium

The spec folder contains RSpec unit tests for the dashboard and login controllers.
This suite can be run using the following command from the terminal:

spec

The test/selenium folder contains browser automation tests to be used by the selenium IDE for firefox.

# Using production server 

You can view the production version of the application at:

http://safe-headland-3339.herokuapp.com/

To use the application, sign up for an account to enter the dashboard and utilize its current functionality

# Using the map

The map is currently only partially featured as we fix a few bugs.  To view polygons, zoom in by double clicking on Wisconsin.  Polygons will show up once you get to the county level.  You can assign polygons to a user, click "Draw Region", then click points to construct a polygon around one or more sites to be surveyed.  Double-click to end drawing.  Then you can select a user on in the drop down menu in the top right and click assign points to create new tasks for them.  The page should reload and the Number of Tasks Remaining for that user should be incremented.

A Polygon on the map corresponds to a survey site.


The color code is as follows:

Red - Unassigned

Yellow - Assigned

Green - Completed

Grey - Revisit Needed


