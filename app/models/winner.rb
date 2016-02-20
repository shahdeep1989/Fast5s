class Winner < ActiveRecord::Base
  belongs_to :user
  belongs_to :winning_part
  belongs_to :room
end
