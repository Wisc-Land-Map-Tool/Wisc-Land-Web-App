class Mobile::SessionsController < Devise::SessionsController  
  def create  
    respond_to do |format|  
    	format.json {  
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")  
        render :status => 200, :json => { :error => "Success" }  
      }  	
      format.html { super }  
    end  
  end  
  def destroy  
    super  
  end  
end  