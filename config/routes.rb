Rails.application.routes.draw do
  
    devise_for :users, controllers: {
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      registrations: 'users/registrations'
      
    }
 
	  namespace :admin do
      root 'games#index'

      resources :players
      resources :games do
        member do
          get 'assemble_game'
        end  
      end  
      #get 'games/:id/assemble_game' => "games#assemble_game"
      resources :winning_parts do 
        collection do
          post 'store_winning_part_cord'
        end  
      end  
      resources :winners ,only: [:index] 
    end

    root 'dashboard#index'

  get "api_help/index", :as => :api_help
  namespace :api, :defaults => {:format => 'json'} do
    scope :module => :v1 do
      post 'sign_up' => "users#sign_up",:as => :signup
      post 'login'  => 'users#login', :as => :login
      post 'update_profile' => 'users#update_profile', :as => :update_profile
      get  'logout' => 'users#logout', :as => :logout
      post 'change_password' => 'users#change_password'
      post 'forgot_password'   => 'users#forgot_password'
      get 'get_game_list' => 'games#get_list', :as => :get_game_list
      get 'search_game' => 'games#search_game', :as => :search_game
      post 'get_next_game_number' => 'games#get_next_game_number' , :as => :get_next_game_number  
      post 'get_room_user_list' => 'games#get_room_user_list' , :as => :get_room_user_list 
      post 'checking_winning_part' => 'games#checking_winning_part' , :as => :checking_winning_part
    end
  end
end
