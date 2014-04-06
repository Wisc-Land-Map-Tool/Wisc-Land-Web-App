WiscLandWebApp::Application.routes.draw do
  devise_for :users, :controllers => { :sessions => "mobile/sessions" }
  
  devise_scope :user do
    namespace :mobile do
        resources :sessions, :only => [:create, :destroy]
    end
  end

  resources :users do
    member do
      post 'assignments'
    end
  end
  

  
  get '/dashboard/roles' => 'dashboard#roles', :as => 'roles'
  get '/dashboard/classifications' => 'dashboard#classifications', :as => 'classifications'
  get '/dashboard/tasks' => 'dashboard#tasks', :as => 'tasks'
  # post '/get_roles' => 'dashboard#roleCheck', :as => 'check_roles'

  #no validation ATM
  post '/assignments/assignTasks' => 'assignments#assignTasks'
  post '/assignments' => 'assignments#index'
  post '/dashboard/roleCheck' => 'dashboard#roleCheck'
  post '/dashboard/roleAdd' => 'dashboard#addRole'

  resources :assignments


  # namespace :api do
  #   resources :users, :defaults => { :format => 'xml' }
  # end

  resources :dashboard do
    collection do
      post 'roleCheck'
      post 'roleAdd'
    end
  end
  
  root to: "login#index"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
