CanvasRails::Application.routes.draw  do
    scope(controller: :catbus_analytics) do
        get "/accounts/:account_id/analytics-v2", action: :index, as: :catbus_analytics
        get "/accounts/:account_id/analytics-v2/root_accounts", action: :accounts
        get "/accounts/:account_id/analytics-v2/root_accounts/:root_account_id", action: :show
    end
    
    ApiRouteSet::V1.draw(self) do
        scope(controller: :catbus_analytics) do
            get "/accounts/:account_id/analytics-v2", action: :index, as: :catbus_analytics
            get "/accounts/:account_id/analytics-v2/root_accounts", action: :accounts
            get "/accounts/:account_id/analytics-v2/root_accounts/:root_account_id", action: :show
        end
    end
end