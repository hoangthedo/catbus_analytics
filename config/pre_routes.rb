CanvasRails::Application.routes.draw  do
    scope(controller: :catbus_analytics) do
        get "/accounts/:account_id/analytics", action: :index, as: :analytics
        get "/accounts/:account_id/analytics/root_accounts", action: :accounts
        get "/accounts/:account_id/analytics/root_accounts/:root_account_id", action: :show
    end
    
    ApiRouteSet::V1.draw(self) do
        scope(controller: :catbus_analytics) do
            get "/accounts/:account_id/analytics", action: :index, as: :analytics
            get "/accounts/:account_id/analytics/root_accounts", action: :accounts
            get "/accounts/:account_id/analytics/root_accounts/:root_account_id", action: :show
        end
    end
end