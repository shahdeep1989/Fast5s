class Game < ActiveRecord::Base
	has_many :rooms ,:dependent => :destroy
	has_many :winning_parts ,:dependent => :destroy
end
