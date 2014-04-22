class ClassificationController < ApplicationController

def index
    render :json => (@classifications = Classification.all)
end


end
