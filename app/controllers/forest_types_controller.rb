class ForestTypesController < ApplicationController

def index
    render :json => (@forest_types = ForestType.all)
end

end
