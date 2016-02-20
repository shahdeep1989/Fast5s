class Api::V1::UsersController < Api::V1::BaseController
	before_filter :authentication_user_with_authentication_token, :only => [:logout, :change_password, :update_profile]

	def sign_up
  	@user = User.new(user_create_params)
    if @user.save
  		@authentication_token = @user.authentication_tokens.create(:auth_token => AuthenticationToken.generate_unique_token)
      @user.check_duplicate_device_ids(params[:user][:device_token],@user,params[:user][:device_type]) 
    else
  		render_json({:result=>{:messages => @user.display_errors, :rstatus=>0, :errorcode => 404}}.to_json)
  	end
  end

  def login
    @user = User.authenticate_user_with_auth(params[:email], params[:password])
    if @user.present?
      @authentication_token = @user.authentication_tokens.create(:auth_token => AuthenticationToken.generate_unique_token)
      @user.check_duplicate_device_ids(params[:device_token],@user,params[:device_type])
      render :file => "api/v1/users/sign_up"
    else
      render_json({:result=>{:messages => User.invalid_credentials,:rstatus=>0, :errorcode => 404}}.to_json)
    end
  end

  def logout
    @token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
    if @token.present?
      @token.destroy
      @current_user.device_token = nil
      render_json({:result=>{:messages =>"ok",:rstatus=>1, :errorcode =>""},:data=>{:messages =>"Logout Successfully!"}}.to_json)
    else
      render_json({:errors => "No user found with authentication_token = #{params[:authentication_token]}"}.to_json)
    end
  end

  def update_profile
    if params[:user].present?
      
      unless @current_user.update_attributes(user_edit_params)
        render_json({:result=>{:messages => @current_user.display_errors, :rstatus=>0, :errorcode => 404}}.to_json)
      end
    else
      render_json({:result=>{:messages =>"User param missing",:rstatus=>0, :errorcode => 404}}.to_json)
    end
  end

  def change_password
    if params[:user][:current_password].present? && params[:user][:password].present?
      @current_user.inspect
      @user = @current_user.update_with_password(change_password_params)

      if @user
        render_json({:result=>{:messages =>"ok",:rstatus=>1, :errorcode =>""},:data=>{:messages =>"Your Password Successfully updated"}}.to_json)
      else
        render_json({:result=>{:messages =>@current_user.display_errors,:rstatus=>0, :errorcode => 404}}.to_json)
      end
    else
      render_json({:result=>{:messages =>"Current Password and Password required",:rstatus=>0, :errorcode => 404}}.to_json)
    end
  end

  def forgot_password
    if params[:email].present?
      @user = User.find_by_email(params[:email])
      if @user.present?
        @user.send_reset_password_instructions
         render_json({:result=>{:messages =>"ok",:rstatus=>1, :errorcode =>""},:data=>{:messages =>"You will receive an email with instructions about how to reset your password in a few minutes."}}.to_json)    
      else
        render_json({:result=>{:messages => "No user found with email #{params[:email]}",:rstatus=>0, :errorcode => 404}}.to_json)
      end
    else
      render_json({:result=>{:messages => "Email Address is required",:rstatus=>0, :errorcode => 404}}.to_json)
    end
  end
  
  private
    def user_create_params
      params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
    end

    def user_edit_params
      params.require(:user).permit(:first_name, :last_name)
    end

    def change_password_params
      params.require(:user).permit(:current_password, :password)
    end
end