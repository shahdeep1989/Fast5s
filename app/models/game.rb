class Game < ActiveRecord::Base

	# game_type : 1 for characters and game_type : 2 for numbers 

	has_many :rooms ,:dependent => :destroy
	has_many :winning_parts ,:dependent => :destroy

	has_attached_file :game_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  	validates_attachment_content_type :game_image, content_type: /\Aimage\/.*\Z/

  	accepts_nested_attributes_for :winning_parts ,:allow_destroy => true 

end
