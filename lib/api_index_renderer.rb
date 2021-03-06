class ApiIndexRenderer
  attr_reader :name, :link_ref, :method_type
  
  def initialize(name, link_ref, method_type)
    @name        = name
    @link_ref    = link_ref
    @method_type = method_type
  end
  
  class << self
    
    def user_api_index
    	index_arr = []
      index_arr << ApiIndexRenderer.new("Sign Up", "sign_up", "POST")
      index_arr << ApiIndexRenderer.new("Login", "login", "POST")
      index_arr << ApiIndexRenderer.new("Update Profile", "update_profile", "POST")
      index_arr << ApiIndexRenderer.new("Change Password", "change_password", "POST")
      index_arr << ApiIndexRenderer.new("Logout", "logout", "GET")
      index_arr << ApiIndexRenderer.new("Forgot Password Api", "forgot_password", "POST")
      index_arr << ApiIndexRenderer.new("Get Game List", "get_game_list", "GET")
      index_arr << ApiIndexRenderer.new("Search Game", "search_game", "GET")
      index_arr << ApiIndexRenderer.new("Get Next Game Number", "get_next_game_number", "POST")
      index_arr << ApiIndexRenderer.new("Get Room User list", "get_room_user_list", "POST") 
      index_arr << ApiIndexRenderer.new("Check Winning Part", "checking_winning_part", "POST")
    
      index_arr
    end
  end
end