class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  # user type = 1 for admin , user type = 2 for player 
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :tickets ,:dependent => :destroy
  has_many :winners , :dependent => :destroy
  has_many :authentication_tokens, :dependent => :destroy

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "male.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  ## Class Methods ##
  class << self
    def authenticate_user_with_auth(email, password)
      return nil unless email.present? or password.present?
      u = User.find_by_email(email)
      (u.present? && u.valid_password?(password))? u : nil
    end

    def invalid_credentials
      "Email or password is not valid"
    end

    def success_message
      {:message=> "ok", errorcode: "", rstatus: 1}
    end
  end

  def decode_image_to_image_data(image)
    cid           = URI.unescape(image)
    filename      = "image#{Time.now.to_i}"
    file          = File.open("#{Rails.root.to_s}/public/tmp/#{filename}.png","wb")
    temp2         = Base64.decode64(cid)
    file.write(temp2)
    file.close
    f             = File.open("#{Rails.root.to_s}/public/tmp/#{filename}.png")
    self.avatar   = f
    f.close
    File.delete("#{Rails.root.to_s}/public/tmp/#{filename}.png")
  end
end
