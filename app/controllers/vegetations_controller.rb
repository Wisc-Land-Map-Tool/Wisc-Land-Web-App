class VegetationsController < ApplicationController

def index
    render :json => (@vegetations = Vegetation.all)
end
end
