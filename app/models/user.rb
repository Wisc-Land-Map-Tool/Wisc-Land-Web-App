class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :assignments

  def active_for_authentication? 
    super && approved? 
  end 

def inactive_message 
  if !approved? 
    :not_approved 
  else 
    super # Use whatever other message 
  end 
end

  # protected
  # 	def confirmation_required?
  # 		false
  # 	end

end


