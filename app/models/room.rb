class Room < ActiveRecord::Base
  belongs_to :game
  has_many :tickets ,:dependent => :destroy
  has_many :winners , :dependent => :destroy
end
