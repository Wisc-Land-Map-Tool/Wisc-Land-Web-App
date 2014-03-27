# Wisconsin Land Cover Mapping Field Validation Tool dashboard application

This is the application to be used by the Wisconsin DNR to assign site tasks to field staff to survey.

# Set up for local use

Ruby 2.1 and Rails 4.0 is required for use of this application. Please see the Gemfile for other dependencies.

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


